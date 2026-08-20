import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
  const language = ref(localStorage.getItem('lang') || 'zh')
  const theme = ref(localStorage.getItem('theme') || 'dark')

  const themes = [
    { id: 'dark', nameKey: 'theme.dark' },
    { id: 'elegant', nameKey: 'theme.elegant' },
    { id: 'midnight', nameKey: 'theme.midnight' },
    { id: 'light', nameKey: 'theme.light' }
  ]

  // 语言：旗帜 + 本地名称（不用英文写死）
  const languages = [
    { id: 'zh', flag: '🇨🇳', native: '简体中文' },
    { id: 'zh-TW', flag: '🇹🇼', native: '繁體中文' },
    { id: 'en', flag: '🇺🇸', native: 'English' },
    { id: 'de', flag: '🇩🇪', native: 'Deutsch' },
    { id: 'fr', flag: '🇫🇷', native: 'Français' },
    { id: 'ja', flag: '🇯🇵', native: '日本語' }
  ]

  function setLanguage(lang) {
    language.value = lang
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang === 'zh-TW' ? 'zh-Hant' : lang
  }

  function setTheme(t) {
    theme.value = t
    localStorage.setItem('theme', t)
    applyTheme(t)
  }

  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t)
  }

  applyTheme(theme.value)
  document.documentElement.lang = language.value === 'zh-TW' ? 'zh-Hant' : language.value

  watch(theme, (val) => applyTheme(val))

  return {
    language,
    theme,
    themes,
    languages,
    setLanguage,
    setTheme
  }
})
