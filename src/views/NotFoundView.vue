<template>
  <div class="min-h-[60vh] flex items-center justify-center px-4">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-gradient mb-4">404</h1>
      <p class="text-xl text-muted mb-2">{{ t('notFound.title') }}</p>
      <p class="text-muted mb-8">{{ t('notFound.text') }}</p>
      <RouterLink to="/" class="btn-primary">{{ t('notFound.back') }}</RouterLink>
    </div>
  </div>
</template>
<script setup>
import { RouterLink } from 'vue-router'
import { useI18n } from '../composables/useI18n'
const { t } = useI18n()
</script>
