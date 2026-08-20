<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 py-12">
    <div class="mb-10">
      <h1 class="text-3xl font-bold mb-2">商店</h1>
      <p class="text-muted">数字内容、签名实体与加急服务</p>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="item in shopItems"
        :key="item.id"
        class="rounded-2xl overflow-hidden bg-card border border-white/5 card-hover"
      >
        <div class="aspect-[4/5]">
          <img loading="lazy" :src="item.cover" :alt="item.name" class="w-full h-full object-cover" />
        </div>
        <div class="p-5">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs px-2 py-0.5 rounded bg-white/10 text-muted">{{ item.type }}</span>
            <span class="text-xl font-bold text-gradient">¥{{ item.price }}</span>
          </div>
          <h3 class="font-semibold mb-2">{{ item.name }}</h3>
          <p class="text-sm text-muted mb-4">{{ item.description }}</p>
          <button class="btn-primary w-full py-2.5" @click="buy(item)">
            立即购买
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { shopItems } from '../data/mock'

function buy(item) {
  alert(`已加入购买「${item.name}」（演示模式）。实际项目中接入支付。`)
}
</script>
