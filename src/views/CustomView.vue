<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-12">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold mb-2">{{ t('custom.title') }}</h1>
      <p class="text-muted">{{ t('custom.desc') }}</p>
    </div>

    <!-- Tabs -->
    <div class="flex gap-2 mb-8 justify-center">
      <button
        @click="tab = 'fan'"
        class="px-5 py-2 rounded-full text-sm font-medium transition"
        :class="tab === 'fan' ? 'btn-primary' : 'btn-outline'"
      >
        {{ t('custom.tabFan') }}
      </button>
      <button
        @click="tab = 'biz'"
        class="px-5 py-2 rounded-full text-sm font-medium transition"
        :class="tab === 'biz' ? 'btn-primary' : 'btn-outline'"
      >
        {{ t('custom.tabBiz') }}
      </button>
    </div>

    <!-- Fan form -->
    <div v-if="tab === 'fan'" class="bg-card rounded-2xl p-6 sm:p-8 border" style="border-color: var(--color-border);">
      <form @submit.prevent="submitFan" class="space-y-5">
        <div>
          <label class="block text-sm font-medium mb-2">{{ t('custom.name') }}</label>
          <input v-model="fan.name" required type="text" class="input-field" :placeholder="t('custom.namePlaceholder')" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">{{ t('custom.email') }}</label>
          <input v-model="fan.email" required type="email" class="input-field" :placeholder="t('custom.emailPlaceholder')" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">{{ t('custom.level') }}</label>
          <select v-model="fan.level" class="input-field">
            <option value="">{{ t('custom.levelNone') }}</option>
            <option value="basic">{{ t('custom.levelBasic') }}</option>
            <option value="premium">{{ t('custom.levelPremium') }}</option>
            <option value="vip">{{ t('custom.levelVip') }}</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">{{ t('custom.type') }}</label>
          <div class="grid grid-cols-2 gap-2">
            <label
              v-for="(type, i) in typeList"
              :key="i"
              class="flex items-center gap-2 p-3 rounded-xl border cursor-pointer text-sm"
              :style="{ borderColor: fan.types.includes(type) ? 'var(--color-primary)' : 'var(--color-border)' }"
            >
              <input type="checkbox" :value="type" v-model="fan.types" class="accent-primary" />
              {{ type }}
            </label>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">{{ t('custom.detail') }}</label>
          <textarea v-model="fan.description" required rows="5" class="input-field resize-none" :placeholder="t('custom.detailPlaceholder')"></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">{{ t('custom.budget') }}</label>
          <select v-model="fan.budget" class="input-field">
            <option value="">{{ t('custom.budgetSelect') }}</option>
            <option value="100-300">¥100 - 300</option>
            <option value="300-500">¥300 - 500</option>
            <option value="500-1000">¥500 - 1000</option>
            <option value="1000+">¥1000+</option>
          </select>
        </div>
        <button type="submit" class="btn-primary w-full py-3">{{ t('custom.submitBtn') }}</button>
      </form>
      <p v-if="formMsg" class="text-sm text-primary text-center mt-4">{{ formMsg }}</p>
      <p class="text-xs text-muted text-center mt-5">{{ t('custom.note') }}</p>
    </div>

    <!-- Business form -->
    <div v-else class="bg-card rounded-2xl p-6 sm:p-8 border" style="border-color: var(--color-border);">
      <h2 class="text-lg font-semibold mb-5 text-primary">{{ t('custom.bizTitle') }}</h2>
      <form @submit.prevent="submitBiz" class="space-y-5">
        <div>
          <label class="block text-sm font-medium mb-2">{{ t('custom.bizCompany') }}</label>
          <input v-model="biz.company" required type="text" class="input-field" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">{{ t('custom.bizContact') }}</label>
          <input v-model="biz.contact" required type="text" class="input-field" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">{{ t('custom.bizEmail') }}</label>
          <input v-model="biz.email" required type="email" class="input-field" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">{{ t('custom.bizType') }}</label>
          <select v-model="biz.type" required class="input-field">
            <option value="">{{ t('custom.budgetSelect') }}</option>
            <option v-for="(bt, i) in bizTypeList" :key="i" :value="bt">{{ bt }}</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">{{ t('custom.bizDesc') }}</label>
          <textarea v-model="biz.desc" required rows="5" class="input-field resize-none" :placeholder="t('custom.bizDescPlaceholder')"></textarea>
        </div>
        <button type="submit" class="btn-primary w-full py-3">{{ t('custom.bizSubmit') }}</button>
      </form>
      <p class="text-xs text-muted text-center mt-5">{{ t('custom.bizNote') }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()
const tab = ref('fan')

const typeList = computed(() => t('custom.types') || [])
const bizTypeList = computed(() => t('custom.bizTypes') || [])

const fan = reactive({ name: '', email: '', level: '', types: [], description: '', budget: '' })
const biz = reactive({ company: '', contact: '', email: '', type: '', desc: '' })

const submitting = ref(false)
const formMsg = ref('')

async function submitFan() {
  if (submitting.value) return
  submitting.value = true
  formMsg.value = ''
  try {
    const { api } = await import('../lib/api')
    await api('custom', {
      method: 'POST',
      body: JSON.stringify({
        name: fan.name,
        email: fan.email,
        level: fan.level,
        types: fan.types,
        description: fan.description,
        budget: fan.budget
      })
    })
    formMsg.value = 'OK — saved to database'
    Object.assign(fan, { name: '', email: '', level: '', types: [], description: '', budget: '' })
  } catch (e) {
    if (e.status === 503) {
      formMsg.value = 'Database not configured — demo only. See DEPLOY.md'
    } else {
      formMsg.value = e.message || String(e)
    }
  } finally {
    submitting.value = false
  }
}
async function submitBiz() {
  if (submitting.value) return
  submitting.value = true
  formMsg.value = ''
  try {
    const { api } = await import('../lib/api')
    await api('business', {
      method: 'POST',
      body: JSON.stringify({
        company: biz.company,
        contact: biz.contact,
        email: biz.email,
        type: biz.type,
        description: biz.desc
      })
    })
    formMsg.value = 'OK — saved to database'
    Object.assign(biz, { company: '', contact: '', email: '', type: '', desc: '' })
  } catch (e) {
    if (e.status === 503) {
      formMsg.value = 'Database not configured — demo only. See DEPLOY.md'
    } else {
      formMsg.value = e.message || String(e)
    }
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.input-field {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  background: color-mix(in srgb, var(--color-bg) 80%, transparent);
  border: 1px solid var(--color-border);
  outline: none;
  color: var(--color-text);
}
.input-field:focus {
  border-color: var(--color-primary);
}
</style>
