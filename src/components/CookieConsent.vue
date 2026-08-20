<template>
  <div
    v-if="visible"
    class="fixed bottom-0 inset-x-0 z-[90] p-4"
  >
    <div
      class="max-w-3xl mx-auto rounded-2xl border p-4 sm:p-5 shadow-2xl flex flex-col sm:flex-row gap-4 items-start sm:items-center"
      style="background: var(--color-card); border-color: var(--color-border);"
    >
      <p class="text-sm text-muted flex-1 leading-relaxed">
        {{ t('cookie.text') }}
        <RouterLink to="/privacy" class="text-primary underline">{{ t('footer.privacy') }}</RouterLink>
      </p>
      <div class="flex gap-2 shrink-0">
        <button type="button" class="btn-outline text-sm py-2 px-4" @click="decline">{{ t('cookie.decline') }}</button>
        <button type="button" class="btn-primary text-sm py-2 px-4" @click="accept">{{ t('cookie.accept') }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()
const visible = ref(false)

onMounted(() => {
  if (!localStorage.getItem('cookieConsent')) {
    visible.value = true
  }
})

function accept() {
  localStorage.setItem('cookieConsent', 'accepted')
  visible.value = false
}
function decline() {
  // Essential only: clear non-essential prefs still allowed for age gate language
  localStorage.setItem('cookieConsent', 'essential')
  visible.value = false
}
</script>
