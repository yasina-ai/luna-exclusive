<template>
  <header
    class="sticky top-0 z-50 backdrop-blur-md border-b"
    style="background-color: color-mix(in srgb, var(--color-bg) 88%, transparent); border-color: var(--color-border);"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="flex items-center justify-between h-14 gap-2">
        <RouterLink to="/" class="flex items-center gap-2 shrink-0">
          <span class="text-xl font-bold text-gradient tracking-wider">LUNA</span>
        </RouterLink>

        <!-- Desktop search -->
        <div class="hidden md:flex flex-1 max-w-xs mx-4">
          <div class="relative w-full">
            <input
              v-model="searchQ"
              type="search"
              :placeholder="t('searchPlaceholder')"
              class="w-full px-3 py-1.5 pl-9 text-sm rounded-full bg-card border outline-none focus:border-primary"
              style="border-color: var(--color-border);"
              @keyup.enter="goSearch"
            />
            <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <nav class="hidden xl:flex items-center gap-0.5">
          <RouterLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="px-2.5 py-1.5 text-sm rounded-lg transition-colors hover:text-primary"
            :class="{ 'text-primary': isActive(item.path) }"
          >
            {{ item.name }}
          </RouterLink>
        </nav>

        <div class="flex items-center gap-1.5 sm:gap-2">
          <!-- Language -->
          <!-- click.stop prevents App closePopovers -->
          <div class="relative" @click.stop>
            <button
              type="button"
              @click="langOpen = !langOpen; themeOpen = false"
              class="px-2 py-1.5 text-xs rounded-lg border flex items-center gap-1.5"
              style="border-color: var(--color-border);"
            >
              <span>{{ currentLang.flag }}</span>
              <span class="hidden sm:inline">{{ currentLang.native }}</span>
              <svg class="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              v-if="langOpen"
              class="absolute right-0 mt-1 w-44 bg-card rounded-lg border shadow-xl py-1 z-50 max-h-64 overflow-y-auto"
              style="border-color: var(--color-border);"
            >
              <button
                v-for="lang in settings.languages"
                :key="lang.id"
                @click="settings.setLanguage(lang.id); langOpen = false"
                class="w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:opacity-80"
                :class="{ 'text-primary': settings.language === lang.id }"
              >
                <span class="text-base">{{ lang.flag }}</span>
                <span>{{ lang.native }}</span>
              </button>
            </div>
          </div>

          <!-- Theme -->
          <div class="relative" @click.stop>
            <button
              type="button"
              @click="themeOpen = !themeOpen; langOpen = false"
              class="p-1.5 rounded-lg border"
              style="border-color: var(--color-border);"
              :title="t('settings.theme')"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </button>
            <div
              v-if="themeOpen"
              class="absolute right-0 mt-1 w-40 bg-card rounded-lg border shadow-xl py-1 z-50"
              style="border-color: var(--color-border);"
            >
              <button
                v-for="th in settings.themes"
                :key="th.id"
                @click="settings.setTheme(th.id); themeOpen = false"
                class="w-full px-3 py-2 text-left text-sm hover:opacity-80"
                :class="{ 'text-primary': settings.theme === th.id }"
              >
                {{ t(th.nameKey) }}
              </button>
            </div>
          </div>

          <RouterLink v-if="!auth.isLoggedIn" to="/auth" class="text-xs px-2 py-1.5 hidden sm:inline text-muted hover:text-primary">
            {{ t('auth.login') }}
          </RouterLink>
          <button v-else type="button" class="text-xs px-2 py-1.5 hidden sm:inline text-muted hover:text-primary" @click="auth.signOut()">
            {{ t('auth.logout') }}
          </button>
          <RouterLink to="/membership" class="btn-primary text-xs py-1.5 px-3 hidden sm:inline-flex">
            {{ t('becomeMember') }}
          </RouterLink>

          <button @click="mobileOpen = !mobileOpen" class="xl:hidden p-2" aria-label="menu">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!mobileOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile search -->
      <div class="md:hidden pb-2">
        <div class="relative">
          <input
            v-model="searchQ"
            type="search"
            :placeholder="t('searchPlaceholder')"
            class="w-full px-3 py-2 pl-9 text-sm rounded-full bg-card border outline-none"
            style="border-color: var(--color-border);"
            @keyup.enter="goSearch"
          />
          <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div v-if="mobileOpen" class="xl:hidden pb-3 border-t pt-2" style="border-color: var(--color-border);">
        <RouterLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          @click="mobileOpen = false"
          class="block px-3 py-2 text-sm rounded-lg hover:text-primary"
        >
          {{ item.name }}
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useI18n } from '../composables/useI18n'
import { useSettingsStore } from '../stores/settings'
import { useAuthStore } from '../stores/auth'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const settings = useSettingsStore()
const auth = useAuthStore()

const mobileOpen = ref(false)
const langOpen = ref(false)
const themeOpen = ref(false)
const searchQ = ref('')

const navItems = computed(() => [
  { name: t('nav.home'), path: '/' },
  { name: t('nav.about'), path: '/about' },
  { name: t('nav.gallery'), path: '/gallery' },
  { name: t('nav.videos'), path: '/videos' },
  { name: t('nav.membership'), path: '/membership' },
  { name: t('nav.blog'), path: '/blog' },
  { name: t('nav.custom'), path: '/custom' },
  { name: t('nav.shop'), path: '/shop' },
  { name: t('nav.faq'), path: '/faq' }
])

const currentLang = computed(() => {
  return settings.languages.find(l => l.id === settings.language) || settings.languages[0]
})

function isActive(path) {
  return route.path === path
}

function goSearch() {
  const q = searchQ.value.trim()
  if (!q) return
  router.push({ path: '/search', query: { q } })
  searchQ.value = ''
  mobileOpen.value = false
}

function closeMenus() {
  langOpen.value = false
  themeOpen.value = false
  mobileOpen.value = false
}

defineExpose({ closeMenus })
</script>
