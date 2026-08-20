import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { api } from '../lib/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const profile = ref(null)
  const isMember = ref(false)
  const memberships = ref([])
  const loading = ref(false)
  const configured = isSupabaseConfigured

  const isLoggedIn = computed(() => !!user.value)

  async function init() {
    if (!supabase) return
    loading.value = true
    try {
      const { data } = await supabase.auth.getSession()
      user.value = data.session?.user || null
      if (user.value) await refreshMe()
      supabase.auth.onAuthStateChange(async (_event, session) => {
        user.value = session?.user || null
        if (user.value) await refreshMe()
        else {
          profile.value = null
          isMember.value = false
          memberships.value = []
        }
      })
    } finally {
      loading.value = false
    }
  }

  async function refreshMe() {
    try {
      const me = await api('me')
      profile.value = me.profile
      isMember.value = !!me.isMember
      memberships.value = me.memberships || []
    } catch {
      isMember.value = false
    }
  }

  async function signUp(email, password, displayName) {
    if (!supabase) throw new Error('Supabase not configured')
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: displayName || '' } }
    })
    if (error) throw error
    user.value = data.user
    return data
  }

  async function signIn(email, password) {
    if (!supabase) throw new Error('Supabase not configured')
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    user.value = data.user
    await refreshMe()
    return data
  }

  async function signOut() {
    if (supabase) await supabase.auth.signOut()
    user.value = null
    profile.value = null
    isMember.value = false
    memberships.value = []
  }

  async function activatePlan(planId) {
    const res = await api('membership/activate', {
      method: 'POST',
      body: JSON.stringify({ planId })
    })
    await refreshMe()
    return res
  }

  return {
    user,
    profile,
    isMember,
    memberships,
    loading,
    configured,
    isLoggedIn,
    init,
    refreshMe,
    signUp,
    signIn,
    signOut,
    activatePlan
  }
})
