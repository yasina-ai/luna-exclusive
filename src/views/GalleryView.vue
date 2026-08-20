<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 py-12">
    <div class="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold mb-2">{{ t('gallery.title') }}</h1>
        <p class="text-muted">{{ t('gallery.desc') }}</p>
      </div>
      <input
        v-model="searchQ"
        type="search"
        :placeholder="t('searchPlaceholder')"
        class="px-4 py-2 rounded-full bg-card border text-sm w-full sm:w-64 outline-none focus:border-primary"
        style="border-color: var(--color-border);"
      />
    </div>

    <!-- 分类筛选 -->
    <div class="flex flex-wrap gap-2 mb-8">
      <button
        v-for="cat in categoryMap"
        :key="cat.id"
        @click="activeCategory = cat.id"
        class="px-4 py-1.5 rounded-full text-sm transition"
        :class="activeCategory === cat.id
          ? 'bg-primary text-white'
          : 'bg-card text-muted border'"
        :style="activeCategory !== cat.id ? 'border-color: var(--color-border)' : ''"
      >
        {{ t(cat.labelKey) }}
      </button>
    </div>

    <!-- 网格 -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-for="item in filteredItems"
        :key="item.id"
        class="group relative rounded-xl overflow-hidden card-hover cursor-pointer"
        @click="openItem(item)"
      >
        <div class="aspect-[3/4] img-overlay">
          <img
            :src="item.cover"
            :alt="item.title"
            loading="lazy"
            decoding="async"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            :class="{ 'blur-sm': item.isLocked }"
          />
        </div>
        <div class="absolute bottom-0 left-0 right-0 p-3 z-10">
          <p class="font-medium text-sm truncate">{{ item.title }}</p>
          <div class="flex gap-1 mt-1 flex-wrap">
            <span
              v-for="tag in item.tags.slice(0, 2)"
              :key="tag"
              class="text-[10px] px-1.5 py-0.5 rounded bg-black/60 text-muted"
            >
              {{ tag }}
            </span>
          </div>
        </div>
        <div
          v-if="item.isLocked"
          class="absolute inset-0 flex items-center justify-center bg-black/50 z-20"
        >
          <div class="text-center">
            <svg class="w-8 h-8 mx-auto mb-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
            </svg>
            <span class="text-xs text-white">会员解锁</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 简单弹窗提示 -->
    <div
      v-if="selected"
      class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      @click.self="selected = null"
    >
      <div class="bg-card rounded-2xl max-w-lg w-full p-6 border border-white/10">
        <img :src="selected.cover" class="w-full rounded-xl mb-4 aspect-[3/4] object-cover" />
        <h3 class="text-xl font-bold mb-2">{{ selected.title }}</h3>
        <div class="flex gap-2 mb-4">
          <span
            v-for="tag in selected.tags"
            :key="tag"
            class="text-xs px-2 py-1 rounded bg-white/10"
          >{{ tag }}</span>
        </div>
        <p v-if="selected.isLocked" class="text-muted text-sm mb-4">
          此内容为会员专属。加入会员即可查看完整高清无码版本。
        </p>
        <div class="flex gap-3">
          <RouterLink
            v-if="selected.isLocked"
            to="/membership"
            class="btn-primary flex-1 text-center"
          >
            解锁会员
          </RouterLink>
          <button @click="selected = null" class="btn-outline flex-1">关闭</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { galleryItems } from '../data/mock'
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()
const activeCategory = ref('all')
const categoryMap = [
  { id: 'all', labelKey: 'gallery.all' },
  { id: 'fullBody', labelKey: 'gallery.fullBody' },
  { id: 'closeup', labelKey: 'gallery.closeup' },
  { id: 'props', labelKey: 'gallery.props' },
  { id: 'scene', labelKey: 'gallery.scene' }
]
const selected = ref(null)
const searchQ = ref('')

const filteredItems = computed(() => {
  let list = galleryItems
  if (activeCategory.value !== 'all') {
    list = list.filter(i => i.category === activeCategory.value)
  }
  const s = searchQ.value.trim().toLowerCase()
  if (s) {
    list = list.filter(i =>
      i.title.toLowerCase().includes(s) ||
      (i.tags && i.tags.some(tg => tg.toLowerCase().includes(s))) ||
      i.category.toLowerCase().includes(s)
    )
  }
  return list
})

function openItem(item) {
  selected.value = item
}
function onKeydown(e) {
  if (e.key === 'Escape') selected.value = null
}
onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>
