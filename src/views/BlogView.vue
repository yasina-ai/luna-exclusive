<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-12">
    <div class="mb-10">
      <h1 class="text-3xl font-bold mb-2">动态更新</h1>
      <p class="text-muted">拍摄花絮、心情、尺度预告与粉丝互动</p>
    </div>

    <div class="space-y-8">
      <article
        v-for="post in blogPosts"
        :key="post.id"
        class="rounded-2xl overflow-hidden bg-card border border-white/5 card-hover"
      >
        <div class="md:flex">
          <div class="md:w-2/5 aspect-video md:aspect-auto">
            <img
              loading="lazy"
              :src="post.cover"
              :alt="post.title"
              class="w-full h-full object-cover"
              :class="{ 'blur-sm': post.isLocked }"
            />
          </div>
          <div class="p-6 md:w-3/5 flex flex-col justify-center">
            <p class="text-xs text-muted mb-2">{{ post.date }}</p>
            <h2 class="text-xl font-bold mb-3">{{ post.title }}</h2>
            <p class="text-muted text-sm leading-relaxed mb-4">{{ post.isLocked ? '•••' : post.excerpt }}</p>
            <div class="flex items-center gap-3">
              <span
                v-if="post.isLocked"
                class="text-xs bg-primary/20 text-primary px-2 py-1 rounded"
              >
                会员专属
              </span>
              <button class="text-sm text-primary hover:underline">
                {{ post.isLocked ? '解锁阅读 →' : '阅读全文 →' }}
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import { blogPosts } from '../data/mock'
</script>
