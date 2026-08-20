import { computed } from 'vue'
import { useSettingsStore } from '../stores/settings'
import zh from '../i18n/locales/zh'
import zhTW from '../i18n/locales/zh-TW'
import en from '../i18n/locales/en'
import de from '../i18n/locales/de'
import fr from '../i18n/locales/fr'
import ja from '../i18n/locales/ja'

const messages = {
  zh,
  'zh-TW': zhTW,
  en,
  de,
  fr,
  ja
}

export function useI18n() {
  const settings = useSettingsStore()

  const t = (key, params = {}) => {
    const lang = settings.language
    const dict = messages[lang] || messages.zh
    const keys = key.split('.')
    let val = dict
    for (const k of keys) {
      if (val && typeof val === 'object' && k in val) {
        val = val[k]
      } else {
        // fallback to English then zh
        val = messages.en
        for (const k2 of keys) {
          if (val && typeof val === 'object' && k2 in val) val = val[k2]
          else {
            val = key
            break
          }
        }
        break
      }
    }
    if (typeof val === 'string' && params && Object.keys(params).length) {
      return val.replace(/\{(\w+)\}/g, (_, name) => params[name] ?? `{${name}}`)
    }
    return val
  }

  const locale = computed(() => settings.language)

  return { t, locale }
}
