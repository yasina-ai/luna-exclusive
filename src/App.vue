<template>
  <div class="min-h-screen flex flex-col bg-dark" @click="closePopovers">
    <div
      v-if="!ageVerified"
      class="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      @keydown.esc="leaveSite"
    >
      <div class="max-w-lg w-full bg-card rounded-2xl p-6 sm:p-8 text-center border border-primary/30 my-8" @click.stop>
        <h2 class="text-xl font-bold text-gradient mb-2">{{ t('chooseLanguage') }}</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-8">
          <button
            v-for="lang in settings.languages"
            :key="lang.id"
            type="button"
            @click="settings.setLanguage(lang.id)"
            class="flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm transition"
            :class="settings.language === lang.id ? 'border-primary bg-primary/15 text-primary' : ''"
            style="border-color: var(--color-border);"
          >
            <span class="text-lg">{{ lang.flag }}</span>
            <span>{{ lang.native }}</span>
          </button>
        </div>

        <h2 class="text-2xl font-bold text-gradient mb-4">{{ t('ageGateTitle') }}</h2>
        <p class="text-muted mb-4 leading-relaxed text-sm sm:text-base">{{ t('ageGateText') }}</p>

        <label class="flex items-start gap-3 text-left text-sm text-muted mb-6 cursor-pointer">
          <input v-model="ageChecked" type="checkbox" class="mt-1 accent-primary shrink-0" />
          <span>{{ t('ageConfirm') }} — I understand this site contains explicit adult content and I am legally allowed to view it.</span>
        </label>

        <div class="flex gap-4 justify-center flex-wrap">
          <button
            type="button"
            class="btn-primary"
            :disabled="!ageChecked"
            :class="{ 'opacity-40 cursor-not-allowed': !ageChecked }"
            @click="verifyAge"
          >
            {{ t('ageConfirm') }}
          </button>
          <button type="button" class="btn-outline" @click="leaveSite">{{ t('leave') }}</button>
        </div>
        <p class="text-[10px] text-muted mt-6">
          Client-side gate only. Production requires server-side verification (e.g. ID / payment age checks) where required by law.
        </p>
      </div>
    </div>

    <Navbar v-if="ageVerified" ref="navRef" />
    <main class="flex-1">
      <RouterView v-if="ageVerified" />
    </main>
    <Footer v-if="ageVerified" />
    <CookieConsent v-if="ageVerified" />
  </div>
</template>

<script setup>
import { ref, onMounted, provide } from 'vue'
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import CookieConsent from './components/CookieConsent.vue'
import { useI18n } from './composables/useI18n'
import { useSettingsStore } from './stores/settings'

const { t } = useI18n()
const settings = useSettingsStore()
const ageVerified = ref(false)
const ageChecked = ref(false)
const navRef = ref(null)

provide('closePopovers', () => {
  navRef.value?.closeMenus?.()
})

function closePopovers() {
  navRef.value?.closeMenus?.()
}

onMounted(() => {
  settings.setTheme(settings.theme)
  // Slightly stronger than plain flag: require structured token (still client-only)
  try {
    const raw = localStorage.getItem('ageVerifiedToken')
    if (raw) {
      const data = JSON.parse(raw)
      if (data?.v === true && data?.ts && Date.now() - data.ts < 1000 * 60 * 60 * 24 * 30) {
        ageVerified.value = true
      }
    }
  } catch (_) {}
})

function verifyAge() {
  if (!ageChecked.value) return
  ageVerified.value = true
  localStorage.setItem('ageVerifiedToken', JSON.stringify({ v: true, ts: Date.now() }))
}

function leaveSite() {
  window.location.href = 'https://www.google.com'
}
</script>
