import { supabase, isSupabaseConfigured } from './supabase'

const API_BASE = import.meta.env.VITE_API_BASE || '/api'

async function authHeader() {
  if (!supabase) return {}
  const { data } = await supabase.auth.getSession()
  const token = data.session?.access_token
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function api(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(await authHeader()),
    ...(options.headers || {})
  }
  const res = await fetch(`${API_BASE}?path=${encodeURIComponent(path)}`, {
    ...options,
    headers
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const err = new Error(data.message || data.error || res.statusText)
    err.status = res.status
    err.data = data
    throw err
  }
  return data
}

export async function apiHealth() {
  try {
    return await api('health')
  } catch {
    return { ok: false, db: false }
  }
}

export { isSupabaseConfigured }
