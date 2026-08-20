<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 py-12">
    <div class="text-center mb-12">
      <h1 class="text-3xl sm:text-4xl font-bold mb-3">{{ t('membership.title') }}</h1>
      <p class="text-muted max-w-xl mx-auto">{{ t('membership.desc') }}</p>
      <p v-if="auth.isLoggedIn" class="text-sm text-primary mt-3">
        {{ auth.isMember ? '✓ Active membership' : 'Logged in — choose a plan to activate (demo)' }}
      </p>
      <p v-else class="text-sm text-muted mt-3">
        <RouterLink to="/auth" class="text-primary underline">{{ t('auth.login') }}</RouterLink>
      </p>
    </div>

    <div class="grid md:grid-cols-3 gap-6">
      <div
        v-for="plan in membershipPlans"
        :key="plan.id"
        class="relative rounded-2xl p-6 border transition-all"
        :class="plan.recommended ? 'scale-105 shadow-xl' : ''"
        :style="plan.recommended
          ? 'background: linear-gradient(to bottom, color-mix(in srgb, var(--color-primary) 20%, transparent), var(--color-card)); border-color: var(--color-primary);'
          : 'background: var(--color-card); border-color: var(--color-border);'"
      >
        <div
          v-if="plan.recommended"
          class="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full"
        >
          {{ t('mostPopular') }}
        </div>
        <h3 class="text-xl font-bold mb-1">{{ plan.name }}</h3>
        <div class="flex items-baseline gap-1 mb-6">
          <span class="text-4xl font-bold text-gradient">¥{{ plan.price }}</span>
          <span class="text-muted text-sm">{{ t('membership.perMonth') }}</span>
        </div>
        <ul class="space-y-3 mb-8">
          <li v-for="(feat, idx) in plan.features" :key="idx" class="flex items-start gap-2 text-sm">
            <span class="text-primary">✓</span>
            <span>{{ feat }}</span>
          </li>
        </ul>
        <button
          class="w-full py-3 rounded-full font-semibold transition"
          :class="plan.recommended ? 'btn-primary' : 'btn-outline'"
          :disabled="busy"
          @click="subscribe(plan)"
        >
          {{ t('subscribeNow') }}
        </button>
      </div>
    </div>
    <p v-if="msg" class="text-center text-sm text-primary mt-6">{{ msg }}</p>
    <p class="text-center text-xs text-muted mt-6">{{ t('membership.note') }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { membershipPlans } from '../data/mock'
import { useI18n } from '../composables/useI18n'
import { useAuthStore } from '../stores/auth'

const { t } = useI18n()
const auth = useAuthStore()
const router = useRouter()
const busy = ref(false)
const msg = ref('')

async function subscribe(plan) {
  msg.value = ''
  if (!auth.configured) {
    msg.value = 'Demo mode: configure Supabase (see DEPLOY.md) for real membership records.'
    return
  }
  if (!auth.isLoggedIn) {
    router.push('/auth')
    return
  }
  busy.value = true
  try {
    const res = await auth.activatePlan(plan.id)
    msg.value = res.message || 'Activated'
  } catch (e) {
    msg.value = e.message || String(e)
  } finally {
    busy.value = false
  }
}
</script>
