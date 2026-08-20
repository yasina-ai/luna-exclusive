<template>
  <div class="max-w-md mx-auto px-4 py-12">
    <h1 class="text-2xl font-bold mb-2 text-center">{{ mode === 'login' ? t('auth.login') : t('auth.register') }}</h1>
    <p class="text-sm text-muted text-center mb-8">{{ t('auth.hint') }}</p>

    <div v-if="!auth.configured" class="p-4 rounded-xl border text-sm text-muted mb-6" style="border-color: var(--color-border);">
      {{ t('auth.notConfigured') }}
    </div>

    <form v-else class="space-y-4" @submit.prevent="submit">
      <div v-if="mode === 'register'">
        <label class="block text-sm mb-1">{{ t('auth.displayName') }}</label>
        <input v-model="displayName" class="field" type="text" />
      </div>
      <div>
        <label class="block text-sm mb-1">Email</label>
        <input v-model="email" required type="email" class="field" autocomplete="email" />
      </div>
      <div>
        <label class="block text-sm mb-1">Password</label>
        <input v-model="password" required type="password" minlength="6" class="field" autocomplete="current-password" />
      </div>
      <p v-if="error" class="text-sm text-red-400">{{ error }}</p>
      <p v-if="msg" class="text-sm text-primary">{{ msg }}</p>
      <button type="submit" class="btn-primary w-full py-3" :disabled="loading">
        {{ loading ? '...' : (mode === 'login' ? t('auth.login') : t('auth.register')) }}
      </button>
    </form>

    <p class="text-center text-sm text-muted mt-6">
      <button type="button" class="text-primary underline" @click="mode = mode === 'login' ? 'register' : 'login'">
        {{ mode === 'login' ? t('auth.toRegister') : t('auth.toLogin') }}
      </button>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from '../composables/useI18n'
import { useAuthStore } from '../stores/auth'

const { t } = useI18n()
const auth = useAuthStore()
const router = useRouter()
const mode = ref('login')
const email = ref('')
const password = ref('')
const displayName = ref('')
const error = ref('')
const msg = ref('')
const loading = ref(false)

async function submit() {
  error.value = ''
  msg.value = ''
  loading.value = true
  try {
    if (mode.value === 'login') {
      await auth.signIn(email.value, password.value)
      router.push('/membership')
    } else {
      await auth.signUp(email.value, password.value, displayName.value)
      msg.value = t('auth.checkEmail')
    }
  } catch (e) {
    error.value = e.message || String(e)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.field {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid var(--color-border);
  background: color-mix(in srgb, var(--color-bg) 80%, transparent);
  color: var(--color-text);
  outline: none;
}
.field:focus { border-color: var(--color-primary); }
</style>
