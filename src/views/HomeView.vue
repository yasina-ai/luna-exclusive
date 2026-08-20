<template>
  <div>
    <!-- Hero -->
    <section class="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0">
        <img
          loading="lazy"
          src="https://picsum.photos/seed/luna-hero/1920/1080"
          alt="Hero"
          class="w-full h-full object-cover opacity-40"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
      </div>

      <div class="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <p class="text-primary text-sm tracking-[0.3em] uppercase mb-4">{{ t('home.badge') }}</p>
        <h1 class="text-4xl sm:text-6xl font-bold mb-6 leading-tight">
          {{ t('home.title1') }}<br />
          <span class="text-gradient">{{ t('home.title2') }}</span>
        </h1>
        <p class="text-lg text-muted mb-8 max-w-xl mx-auto">
          {{ t('home.subtitle') }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <RouterLink to="/membership" class="btn-primary text-lg px-8 py-3">
            {{ t('home.joinMember') }}
          </RouterLink>
          <RouterLink to="/gallery" class="btn-outline text-lg px-8 py-3">
            {{ t('home.browseGallery') }}
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- 最新写真 -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div class="flex items-end justify-between mb-8">
        <div>
          <h2 class="text-2xl font-bold">{{ t('home.latestGallery') }}</h2>
          <p class="text-muted text-sm mt-1">{{ t('home.latestGalleryDesc') }}</p>
        </div>
        <RouterLink to="/gallery" class="text-primary text-sm hover:underline">{{ t('viewAll') }} →</RouterLink>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          v-for="item in featuredGallery"
          :key="item.id"
          class="group relative rounded-xl overflow-hidden card-hover cursor-pointer"
        >
          <div class="aspect-[3/4] img-overlay">
            <img
          loading="lazy"
              :src="item.cover"
              :alt="item.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div class="absolute bottom-0 left-0 right-0 p-3 z-10">
            <p class="font-medium text-sm truncate">{{ item.title }}</p>
            <div class="flex gap-1 mt-1 flex-wrap">
              <span
                v-for="tag in item.tags.slice(0, 2)"
                :key="tag"
                class="text-[10px] px-1.5 py-0.5 rounded bg-black/60 text-muted"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          <div
            v-if="item.isLocked"
            class="absolute top-3 right-3 bg-primary/90 text-white text-xs px-2 py-1 rounded-full"
          >
            {{ t('memberOnly') }}
          </div>
        </div>
      </div>
    </section>

    <!-- 视频精选 -->
    <section class="py-16" style="background-color: color-mix(in srgb, var(--color-card) 50%, transparent);">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="flex items-end justify-between mb-8">
          <div>
            <h2 class="text-2xl font-bold">{{ t('home.featuredVideos') }}</h2>
            <p class="text-muted text-sm mt-1">{{ t('home.featuredVideosDesc') }}</p>
          </div>
          <RouterLink to="/videos" class="text-primary text-sm hover:underline">{{ t('viewAll') }} →</RouterLink>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="video in featuredVideos"
            :key="video.id"
            class="group rounded-xl overflow-hidden bg-card border card-hover"
            style="border-color: var(--color-border);"
          >
            <div class="relative aspect-video">
              <img loading="lazy" :src="video.cover" :alt="video.title" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <div class="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                  <svg class="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <span class="absolute bottom-2 right-2 bg-black/80 text-xs px-2 py-1 rounded">
                {{ video.duration }}
              </span>
              <span
                v-if="video.isLocked"
                class="absolute top-2 left-2 bg-primary text-xs px-2 py-1 rounded"
              >
                {{ t('memberOnly') }}
              </span>
            </div>
            <div class="p-4">
              <h3 class="font-medium truncate">{{ video.title }}</h3>
              <p class="text-xs text-muted mt-1">{{ video.category }} · {{ video.views }} views</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 px-4">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-3xl font-bold mb-4">{{ t('home.ctaTitle') }}</h2>
        <p class="text-muted mb-8">{{ t('home.ctaText') }}</p>
        <RouterLink to="/membership" class="btn-primary text-lg px-10 py-3.5">
          {{ t('home.viewPlans') }}
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { galleryItems, videoItems } from '../data/mock'
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()
const featuredGallery = computed(() => galleryItems.slice(0, 4))
const featuredVideos = computed(() => videoItems.slice(0, 3))
</script>
