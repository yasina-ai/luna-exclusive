<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-12">
    <h1 class="text-3xl font-bold mb-2">{{ t('legal.ageTitle') }}</h1>
    <p class="text-sm text-muted mb-8">{{ t('legal.lastUpdate') }}</p>
    <div class="space-y-6 text-muted leading-relaxed text-sm sm:text-base">
      <section>
        <h2 class="text-lg font-semibold text-[var(--color-text)] mb-2">1. Strict 18+ Policy</h2>
        <p>Luna Exclusive is an adult-only website. All content is intended solely for individuals who are at least eighteen (18) years of age, or the age of majority in their place of residence if higher than 18.</p>
      </section>
      <section>
        <h2 class="text-lg font-semibold text-[var(--color-text)] mb-2">2. Your Confirmation</h2>
        <p>By entering the Site and completing the age gate, you confirm that: (a) you are of legal age; (b) you are not accessing the Site from a jurisdiction where adult content is illegal; (c) you will not share access or content with minors.</p>
      </section>
      <section>
        <h2 class="text-lg font-semibold text-[var(--color-text)] mb-2">3. No Minors</h2>
        <p>We do not knowingly allow minors to create accounts, purchase memberships, or view content. If we become aware of underage use, we will terminate access and delete related data as required by law.</p>
      </section>
      <section>
        <h2 class="text-lg font-semibold text-[var(--color-text)] mb-2">4. Parental Responsibility</h2>
        <p>Parents and guardians are responsible for monitoring devices and networks used by minors. We recommend appropriate filtering software on shared devices.</p>
      </section>
      <section>
        <h2 class="text-lg font-semibold text-[var(--color-text)] mb-2">5. Content Nature</h2>
        <p>Content may include full nudity, sexual themes, fetish and roleplay material. It is fictional adult entertainment. Nothing on the Site is an offer to engage in real-world illegal activity.</p>
      </section>
      <section>
        <h2 class="text-lg font-semibold text-[var(--color-text)] mb-2">6. Enforcement</h2>
        <p>False age declarations, attempts to circumvent the age gate, or providing access to minors may result in permanent bans and, where appropriate, reports to authorities or payment providers.</p>
      </section>
    </div>
  </div>
</template>
<script setup>
import { useI18n } from '../composables/useI18n'
const { t } = useI18n()
</script>
