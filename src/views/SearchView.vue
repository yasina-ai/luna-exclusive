<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 py-12">
    <h1 class="text-2xl font-bold mb-6">{{ t('search') }}: “{{ query }}”</h1>
    <input
      v-model="localQ"
      type="search"
      :placeholder="t('searchPlaceholder')"
      class="w-full max-w-md px-4 py-2 rounded-full bg-card border mb-8 outline-none focus:border-primary"
      style="border-color: var(--color-border);"
      @keyup.enter="run"
    />

    <section v-if="photos.length" class="mb-10">
      <h2 class="text-lg font-semibold mb-4">{{ t('nav.gallery') }} ({{ photos.length }})</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <RouterLink
          v-for="item in photos"
          :key="'g'+item.id"
          to="/gallery"
          class="rounded-xl overflow-hidden aspect-[3/4] relative card-hover"
        >
          <img :src="item.cover" class="w-full h-full object-cover" :class="{ 'blur-sm': item.isLocked }" />
          <span class="absolute bottom-2 left-2 text-xs bg-black/70 px-2 py-0.5 rounded">{{ item.title }}</span>
        </RouterLink>
      </div>
    </section>

    <section v-if="videos.length" class="mb-10">
      <h2 class="text-lg font-semibold mb-4">{{ t('nav.videos') }} ({{ videos.length }})</h2>
      <div class="grid sm:grid-cols-2 gap-4">
        <RouterLink
          v-for="v in videos"
          :key="'v'+v.id"
          to="/videos"
          class="flex gap-3 p-3 rounded-xl bg-card border card-hover"
          style="border-color: var(--color-border);"
        >
          <img :src="v.cover" class="w-28 h-16 object-cover rounded-lg shrink-0" />
          <div class="min-w-0">
            <p class="font-medium truncate">{{ v.title }}</p>
            <p class="text-xs text-muted mt-1">{{ v.duration }} · {{ v.resolution }}</p>
          </div>
        </RouterLink>
      </div>
    </section>

    <section v-if="posts.length">
      <h2 class="text-lg font-semibold mb-4">{{ t('nav.blog') }} ({{ posts.length }})</h2>
      <div class="space-y-3">
        <RouterLink
          v-for="p in posts"
          :key="'b'+p.id"
          to="/blog"
          class="block p-4 rounded-xl bg-card border"
          style="border-color: var(--color-border);"
        >
          <p class="font-medium">{{ p.title }}</p>
          <p class="text-sm text-muted mt-1 line-clamp-2">{{ p.excerpt }}</p>
        </RouterLink>
      </div>
    </section>

    <p v-if="!photos.length && !videos.length && !posts.length" class="text-center text-muted py-16">
      {{ t('searchNoResult') }}
    </p>
  </div>
</template>
<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { galleryItems, videoItems, blogPosts } from '../data/mock'
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const localQ = ref(route.query.q || '')
const query = computed(() => (route.query.q || '').toString())

function match(text, q) {
  return (text || '').toLowerCase().includes(q)
}

const photos = computed(() => {
  const q = query.value.toLowerCase().trim()
  if (!q) return []
  return galleryItems.filter(i => match(i.title, q) || i.tags?.some(t => match(t, q)) || match(i.category, q))
})
const videos = computed(() => {
  const q = query.value.toLowerCase().trim()
  if (!q) return []
  return videoItems.filter(v => match(v.title, q) || match(v.category, q) || match(v.resolution, q))
})
const posts = computed(() => {
  const q = query.value.toLowerCase().trim()
  if (!q) return []
  return blogPosts.filter(p => match(p.title, q) || match(p.excerpt, q))
})

function run() {
  router.replace({ path: '/search', query: { q: localQ.value.trim() } })
}
watch(() => route.query.q, (v) => { localQ.value = v || '' })
</script>
