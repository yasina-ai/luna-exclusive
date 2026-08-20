<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 py-12">
    <!-- 上半：照片 + 简介 -->
    <div class="grid md:grid-cols-2 gap-10 items-start mb-16">
      <div class="space-y-4">
        <div class="rounded-2xl overflow-hidden aspect-[3/4]">
          <img
          loading="lazy"
            src="https://picsum.photos/seed/luna-about/800/1000"
            alt="Luna"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="grid grid-cols-3 gap-3">
          <div class="rounded-xl overflow-hidden aspect-square">
            <img loading="lazy" src="https://picsum.photos/seed/luna-a1/300/300" class="w-full h-full object-cover" alt="" />
          </div>
          <div class="rounded-xl overflow-hidden aspect-square">
            <img loading="lazy" src="https://picsum.photos/seed/luna-a2/300/300" class="w-full h-full object-cover" alt="" />
          </div>
          <div class="rounded-xl overflow-hidden aspect-square">
            <img loading="lazy" src="https://picsum.photos/seed/luna-a3/300/300" class="w-full h-full object-cover" alt="" />
          </div>
        </div>
      </div>

      <div>
        <p class="text-primary text-sm tracking-widest uppercase mb-2">About Me</p>
        <h1 class="text-3xl font-bold mb-6">{{ t('about.title') }}</h1>

        <div class="space-y-4 text-muted leading-relaxed">
          <p>{{ t('about.p1') }}</p>
          <p>{{ t('about.p2') }}</p>
          <p>{{ t('about.p3') }}</p>
        </div>

        <!-- 身高三围 -->
        <div class="mt-8 grid grid-cols-2 gap-4">
          <div class="p-4 rounded-xl bg-card border" style="border-color: var(--color-border);">
            <p class="text-xs text-muted mb-1">{{ t('about.height') }}</p>
            <p class="text-xl font-semibold">{{ persona.height }}</p>
          </div>
          <div class="p-4 rounded-xl bg-card border" style="border-color: var(--color-border);">
            <p class="text-xs text-muted mb-1">{{ t('about.measurements') }}</p>
            <p class="text-xl font-semibold">{{ persona.measurements }}</p>
          </div>
        </div>

        <!-- 风格标签 -->
        <div class="mt-6">
          <h3 class="text-sm font-semibold text-primary mb-3">{{ t('about.styleTitle') }}</h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in persona.styleTags"
              :key="tag"
              class="px-3 py-1 rounded-full text-xs border"
              style="border-color: var(--color-border); background: color-mix(in srgb, var(--color-primary) 8%, transparent);"
            >
              {{ tag }}
            </span>
          </div>
        </div>

        <div class="mt-8 flex flex-wrap gap-3">
          <RouterLink to="/membership" class="btn-primary">{{ t('becomeMember') }}</RouterLink>
          <RouterLink to="/custom" class="btn-outline">{{ t('about.bookCustom') }}</RouterLink>
        </div>
      </div>
    </div>

    <!-- 个人故事 -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold mb-6">{{ t('about.storyTitle') }}</h2>
      <div class="space-y-4 text-muted leading-relaxed max-w-3xl">
        <p>{{ t('about.story1') }}</p>
        <p>{{ t('about.story2') }}</p>
      </div>
    </section>

    <!-- 拍摄偏好 + 代表性系列 -->
    <div class="grid md:grid-cols-2 gap-8 mb-16">
      <div class="p-6 rounded-2xl bg-card border" style="border-color: var(--color-border);">
        <h3 class="font-semibold text-primary mb-4">{{ t('about.prefsTitle') }}</h3>
        <ul class="space-y-2 text-sm text-muted">
          <li v-for="(pref, i) in persona.shootingPrefs" :key="i" class="flex gap-2">
            <span class="text-primary shrink-0">•</span>
            <span>{{ pref }}</span>
          </li>
        </ul>
      </div>

      <div class="p-6 rounded-2xl bg-card border" style="border-color: var(--color-border);">
        <h3 class="font-semibold text-primary mb-4">{{ t('about.worksTitle') }}</h3>
        <ul class="space-y-4">
          <li v-for="work in works" :key="work.id">
            <p class="font-medium">{{ work.title }}</p>
            <p class="text-sm text-muted mt-0.5">{{ work.desc }}</p>
          </li>
        </ul>
      </div>
    </div>

    <!-- 内容尺度 -->
    <div class="mb-16 p-6 rounded-2xl bg-card border" style="border-color: var(--color-border);">
      <h3 class="font-semibold mb-4 text-primary">{{ t('about.scaleTitle') }}</h3>
      <ul class="grid sm:grid-cols-2 gap-2 text-sm text-muted">
        <li class="flex gap-2"><span class="text-primary">•</span> {{ t('about.scale1') }}</li>
        <li class="flex gap-2"><span class="text-primary">•</span> {{ t('about.scale2') }}</li>
        <li class="flex gap-2"><span class="text-primary">•</span> {{ t('about.scale3') }}</li>
        <li class="flex gap-2"><span class="text-primary">•</span> {{ t('about.scale4') }}</li>
        <li class="flex gap-2"><span class="text-primary">•</span> {{ t('about.scale5') }}</li>
      </ul>
    </div>

    <!-- 粉丝精选评论 -->
    <section>
      <div class="mb-6">
        <h2 class="text-2xl font-bold">{{ t('about.fansTitle') }}</h2>
        <p class="text-sm text-muted mt-1">{{ t('about.fansNote') }}</p>
      </div>
      <div class="grid sm:grid-cols-2 gap-4">
        <div
          v-for="c in fanComments"
          :key="c.id"
          class="p-5 rounded-xl bg-card border"
          style="border-color: var(--color-border);"
        >
          <p class="text-sm leading-relaxed mb-3">“{{ c.content }}”</p>
          <div class="flex justify-between text-xs text-muted">
            <span>{{ c.user }}</span>
            <span>{{ c.date }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useI18n } from '../composables/useI18n'
import { persona, fanComments, works } from '../data/mock'

const { t } = useI18n()
</script>
