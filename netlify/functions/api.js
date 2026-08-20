/**
 * Unified API for Luna Exclusive (Netlify Functions)
 * Routes via ?path= or path segments after /api/
 *
 * Env (Netlify dashboard):
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY  (server only — never expose to frontend)
 *   SUPABASE_ANON_KEY          (optional, for validating user JWT)
 */
import { createClient } from '@supabase/supabase-js'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
}

function json(status, body) {
  return {
    statusCode: status,
    headers: { 'Content-Type': 'application/json', ...cors },
    body: JSON.stringify(body)
  }
}

function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createClient(url, key, { auth: { persistSession: false } })
}

function getBearer(event) {
  const h = event.headers.authorization || event.headers.Authorization || ''
  const m = h.match(/^Bearer\s+(.+)$/i)
  return m ? m[1] : null
}

async function getUserId(event, admin) {
  const token = getBearer(event)
  if (!token || !admin) return null
  const { data, error } = await admin.auth.getUser(token)
  if (error || !data?.user) return null
  return data.user.id
}

async function hasMembership(admin, userId) {
  if (!userId) return false
  const { data } = await admin
    .from('memberships')
    .select('id')
    .eq('user_id', userId)
    .eq('status', 'active')
    .or('ends_at.is.null,ends_at.gt.' + new Date().toISOString())
    .limit(1)
  return !!(data && data.length)
}

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: cors, body: '' }
  }

  const admin = getSupabaseAdmin()
  const url = new URL(event.rawUrl || `https://x${event.path}?${event.rawQuery || ''}`)
  let route = url.searchParams.get('path') || ''
  // Support /api/gallery style via redirect rewrite
  const pathMatch = (event.path || '').replace(/^\/\.netlify\/functions\/api\/?/, '').replace(/^\/api\/?/, '')
  if (!route && pathMatch) route = pathMatch.split('/').filter(Boolean).join('/')

  try {
    // Health
    if (!route || route === 'health') {
      return json(200, {
        ok: true,
        db: !!admin,
        message: admin ? 'API + database connected' : 'API up, database not configured (set SUPABASE_URL & SUPABASE_SERVICE_ROLE_KEY)'
      })
    }

    if (!admin) {
      return json(503, {
        error: 'database_not_configured',
        message: 'Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Netlify environment variables.'
      })
    }

    // GET gallery
    if (route === 'gallery' && event.httpMethod === 'GET') {
      const userId = await getUserId(event, admin)
      const member = await hasMembership(admin, userId)
      const { data, error } = await admin
        .from('gallery_items')
        .select('*')
        .eq('published', true)
        .order('sort_order', { ascending: true })
      if (error) return json(500, { error: error.message })
      const items = (data || []).map((row) => ({
        id: row.id,
        title: row.title,
        category: row.category,
        tags: row.tags || [],
        isLocked: row.is_locked,
        cover: member || !row.is_locked ? row.cover_url : row.cover_url, // URL still present; real prod should use signed URLs for locked
        // For true protection, store locked media privately and only return signed URL when member
        _access: member || !row.is_locked ? 'full' : 'locked'
      }))
      return json(200, { items, isMember: member })
    }

    // GET videos
    if (route === 'videos' && event.httpMethod === 'GET') {
      const userId = await getUserId(event, admin)
      const member = await hasMembership(admin, userId)
      const { data, error } = await admin
        .from('videos')
        .select('*')
        .eq('published', true)
        .order('id', { ascending: false })
      if (error) return json(500, { error: error.message })
      const items = (data || []).map((row) => ({
        id: row.id,
        title: row.title,
        category: row.category,
        duration: row.duration,
        resolution: row.resolution,
        previewSeconds: row.preview_seconds,
        isLocked: row.is_locked,
        cover: row.cover_url,
        videoUrl: member || !row.is_locked ? row.video_url : null,
        views: row.views,
        _access: member || !row.is_locked ? 'full' : 'locked'
      }))
      return json(200, { items, isMember: member })
    }

    // GET blog
    if (route === 'blog' && event.httpMethod === 'GET') {
      const userId = await getUserId(event, admin)
      const member = await hasMembership(admin, userId)
      const { data, error } = await admin
        .from('blog_posts')
        .select('id, title, excerpt, cover_url, is_locked, published_at')
        .eq('published', true)
        .order('published_at', { ascending: false })
      if (error) return json(500, { error: error.message })
      const items = (data || []).map((row) => ({
        id: row.id,
        title: row.title,
        excerpt: row.is_locked && !member ? null : row.excerpt,
        cover: row.cover_url,
        isLocked: row.is_locked,
        date: row.published_at
      }))
      return json(200, { items, isMember: member })
    }

    // GET me / membership
    if (route === 'me' && event.httpMethod === 'GET') {
      const userId = await getUserId(event, admin)
      if (!userId) return json(401, { error: 'unauthorized' })
      const { data: profile } = await admin.from('profiles').select('*').eq('id', userId).single()
      const member = await hasMembership(admin, userId)
      const { data: memberships } = await admin
        .from('memberships')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
      return json(200, { profile, isMember: member, memberships: memberships || [] })
    }

    // POST membership activate (demo / manual — replace with Stripe webhook in production)
    if (route === 'membership/activate' && event.httpMethod === 'POST') {
      const userId = await getUserId(event, admin)
      if (!userId) return json(401, { error: 'unauthorized' })
      const body = JSON.parse(event.body || '{}')
      const planId = body.planId || 'basic'
      if (!['basic', 'premium', 'vip'].includes(planId)) {
        return json(400, { error: 'invalid_plan' })
      }
      const ends = new Date()
      ends.setMonth(ends.getMonth() + 1)
      const { data, error } = await admin
        .from('memberships')
        .insert({
          user_id: userId,
          plan_id: planId,
          status: 'active',
          ends_at: ends.toISOString(),
          provider: 'demo'
        })
        .select()
        .single()
      if (error) return json(500, { error: error.message })
      return json(200, { membership: data, message: 'Demo activation only. Wire Stripe/LemonSqueezy for production.' })
    }

    // POST custom request
    if (route === 'custom' && event.httpMethod === 'POST') {
      const userId = await getUserId(event, admin)
      const body = JSON.parse(event.body || '{}')
      if (!body.name || !body.email || !body.description) {
        return json(400, { error: 'missing_fields' })
      }
      const { data, error } = await admin
        .from('custom_requests')
        .insert({
          user_id: userId,
          name: String(body.name).slice(0, 120),
          email: String(body.email).slice(0, 200),
          level: body.level || null,
          types: Array.isArray(body.types) ? body.types : [],
          description: String(body.description).slice(0, 5000),
          budget: body.budget || null
        })
        .select('id, created_at')
        .single()
      if (error) return json(500, { error: error.message })
      return json(201, { ok: true, id: data.id })
    }

    // POST business
    if (route === 'business' && event.httpMethod === 'POST') {
      const body = JSON.parse(event.body || '{}')
      if (!body.company || !body.contact || !body.email || !body.description) {
        return json(400, { error: 'missing_fields' })
      }
      const { data, error } = await admin
        .from('business_inquiries')
        .insert({
          company: String(body.company).slice(0, 200),
          contact: String(body.contact).slice(0, 120),
          email: String(body.email).slice(0, 200),
          collab_type: body.type || null,
          description: String(body.description).slice(0, 5000)
        })
        .select('id')
        .single()
      if (error) return json(500, { error: error.message })
      return json(201, { ok: true, id: data.id })
    }

    return json(404, { error: 'not_found', route })
  } catch (e) {
    return json(500, { error: 'server_error', message: e.message || String(e) })
  }
}
