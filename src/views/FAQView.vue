<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-12">
    <div class="mb-10">
      <h1 class="text-3xl font-bold mb-2">{{ t('faq.title') }}</h1>
      <p class="text-muted">{{ t('faq.desc') }}</p>
    </div>
    <div class="space-y-3">
      <div
        v-for="i in 8"
        :key="i"
        class="rounded-xl border overflow-hidden"
        style="border-color: var(--color-border); background: var(--color-card);"
      >
        <button
          class="w-full px-5 py-4 text-left flex justify-between items-center gap-4"
          @click="open = open === i ? 0 : i"
        >
          <span class="font-medium">{{ t('faq.q' + i) }}</span>
          <svg class="w-5 h-5 shrink-0 transition" :class="{ 'rotate-180': open === i }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div v-if="open === i" class="px-5 pb-4 text-sm text-muted leading-relaxed">
          {{ t('faq.a' + i) }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useI18n } from '../composables/useI18n'
const { t } = useI18n()
const open = ref(1)
</script>
