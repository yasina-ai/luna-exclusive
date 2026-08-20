<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 py-12">
    <div class="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold mb-2">{{ t('videos.title') }}</h1>
        <p class="text-muted">{{ t('videos.desc') }}</p>
      </div>
      <input
        v-model="q"
        type="search"
        :placeholder="t('searchPlaceholder')"
        class="px-4 py-2 rounded-full bg-card border text-sm w-full sm:w-64 outline-none focus:border-primary"
        style="border-color: var(--color-border);"
      />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="video in filtered"
        :key="video.id"
        class="group rounded-xl overflow-hidden bg-card border card-hover"
        style="border-color: var(--color-border);"
      >
        <div class="relative aspect-video">
          <img
            :src="video.cover"
            :alt="video.title"
            loading="lazy"
            decoding="async"
            class="w-full h-full object-cover"
            :class="{ 'blur-[2px]': video.isLocked && !previewing[video.id] }"
          />
          <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
            <button
              v-if="video.previewSeconds"
              type="button"
              class="px-4 py-2 rounded-full bg-primary text-white text-sm font-medium"
              @click="startPreview(video)"
            >
              {{ t('videos.tryPreview') }} · {{ video.previewSeconds }}s
            </button>
          </div>
          <span class="absolute bottom-2 right-2 bg-black/80 text-xs px-2 py-1 rounded">
            {{ video.duration }}
          </span>
          <span class="absolute bottom-2 left-2 bg-black/80 text-xs px-2 py-1 rounded">
            {{ video.resolution }}
          </span>
          <span
            v-if="video.isLocked"
            class="absolute top-2 left-2 bg-primary text-xs px-2 py-1 rounded"
          >
            {{ t('memberOnly') }}
          </span>
          <div
            v-if="previewing[video.id]"
            class="absolute inset-0 bg-black/70 flex flex-col items-center justify-center p-4"
          >
            <p class="text-sm mb-2">{{ t('previewHint', { n: video.previewSeconds }) }}</p>
            <p class="text-xs text-muted mb-3">{{ countdown[video.id] ?? video.previewSeconds }}s</p>
            <p class="text-[10px] text-muted mb-3 max-w-[200px] text-center">Demo only — real stream requires signed URL / CDN</p>
            <button type="button" class="btn-outline text-sm py-1.5" @click="stopPreview(video.id)">{{ t('close') }}</button>
          </div>
        </div>
        <div class="p-4">
          <h3 class="font-medium truncate">{{ video.title }}</h3>
          <div class="flex justify-between items-center mt-2 text-xs text-muted">
            <span>{{ video.category }}</span>
            <span>{{ video.views }}</span>
          </div>
          <RouterLink
            v-if="video.isLocked"
            to="/membership"
            class="mt-3 block text-center text-sm text-primary hover:underline"
          >
            {{ t('videos.unlockWatch') }} →
          </RouterLink>
        </div>
      </div>
    </div>
    <p v-if="!filtered.length" class="text-center text-muted py-12">{{ t('searchNoResult') }}</p>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { videoItems } from '../data/mock'
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()
const q = ref('')
const previewing = reactive({})
const countdown = reactive({})
const timers = {}

const filtered = computed(() => {
  const s = q.value.trim().toLowerCase()
  if (!s) return videoItems
  return videoItems.filter(v =>
    v.title.toLowerCase().includes(s) ||
    String(v.category).toLowerCase().includes(s) ||
    (v.resolution || '').toLowerCase().includes(s)
  )
})

function startPreview(video) {
  stopPreview(video.id)
  previewing[video.id] = true
  countdown[video.id] = video.previewSeconds
  timers[video.id] = setInterval(() => {
    countdown[video.id]--
    if (countdown[video.id] <= 0) stopPreview(video.id)
  }, 1000)
}

function stopPreview(id) {
  previewing[id] = false
  if (timers[id]) {
    clearInterval(timers[id])
    delete timers[id]
  }
}

onUnmounted(() => {
  Object.keys(timers).forEach(id => stopPreview(Number(id) || id))
})
</script>
