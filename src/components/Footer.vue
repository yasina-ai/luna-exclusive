<template>
  <footer class="bg-card border-t mt-auto" style="border-color: var(--color-border);">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div class="text-xl font-bold text-gradient mb-3">{{ t('siteName') }}</div>
          <p class="text-sm text-muted leading-relaxed">{{ t('footer.slogan') }}</p>
        </div>
        <div>
          <h4 class="font-semibold mb-3 text-sm uppercase tracking-wider text-primary">{{ t('footer.content') }}</h4>
          <ul class="space-y-2 text-sm text-muted">
            <li><RouterLink to="/gallery" class="hover:text-primary">{{ t('nav.gallery') }}</RouterLink></li>
            <li><RouterLink to="/videos" class="hover:text-primary">{{ t('nav.videos') }}</RouterLink></li>
            <li><RouterLink to="/blog" class="hover:text-primary">{{ t('nav.blog') }}</RouterLink></li>
            <li><RouterLink to="/custom" class="hover:text-primary">{{ t('nav.custom') }}</RouterLink></li>
            <li><RouterLink to="/faq" class="hover:text-primary">{{ t('nav.faq') }}</RouterLink></li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold mb-3 text-sm uppercase tracking-wider text-primary">{{ t('footer.member') }}</h4>
          <ul class="space-y-2 text-sm text-muted">
            <li><RouterLink to="/membership" class="hover:text-primary">{{ t('nav.membership') }}</RouterLink></li>
            <li><RouterLink to="/shop" class="hover:text-primary">{{ t('nav.shop') }}</RouterLink></li>
            <li><RouterLink to="/about" class="hover:text-primary">{{ t('nav.about') }}</RouterLink></li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold mb-3 text-sm uppercase tracking-wider text-primary">{{ t('footer.legal') }}</h4>
          <ul class="space-y-2 text-sm text-muted">
            <li><RouterLink to="/terms" class="hover:text-primary">{{ t('footer.terms') }}</RouterLink></li>
            <li><RouterLink to="/privacy" class="hover:text-primary">{{ t('footer.privacy') }}</RouterLink></li>
            <li><RouterLink to="/refund" class="hover:text-primary">{{ t('footer.refund') }}</RouterLink></li>
            <li><RouterLink to="/age-statement" class="hover:text-primary">{{ t('footer.age') }}</RouterLink></li>
            <li><RouterLink to="/2257" class="hover:text-primary">§ 2257</RouterLink></li>
            <li><RouterLink to="/dmca" class="hover:text-primary">DMCA</RouterLink></li>
          </ul>
        </div>
      </div>
      <div class="mt-10 pt-6 border-t flex flex-col sm:flex-row justify-between gap-4 text-xs text-muted" style="border-color: var(--color-border);">
        <p>{{ t('footer.copyright') }}</p>
        <p>{{ t('footer.rights') }}</p>
      </div>
    </div>
  </footer>
</template>
<script setup>
import { RouterLink } from 'vue-router'
import { useI18n } from '../composables/useI18n'
const { t } = useI18n()
</script>
