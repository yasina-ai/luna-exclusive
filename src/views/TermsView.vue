<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-12">
    <h1 class="text-3xl font-bold mb-2">{{ t('legal.termsTitle') }}</h1>
    <p class="text-sm text-muted mb-8">{{ t('legal.lastUpdate') }}</p>
    <div class="space-y-6 text-muted leading-relaxed text-sm sm:text-base">
      <section>
        <h2 class="text-lg font-semibold text-[var(--color-text)] mb-2">1. Acceptance</h2>
        <p>By accessing Luna Exclusive you agree to these Terms of Service, the Privacy Policy, Refund Policy and Age Statement. If you do not agree, do not use the Site.</p>
      </section>
      <section>
        <h2 class="text-lg font-semibold text-[var(--color-text)] mb-2">2. Eligibility</h2>
        <p>You must be at least 18 years old (or the age of majority where you live). You represent that you have legal capacity to enter this agreement and that accessing adult content is legal in your jurisdiction.</p>
      </section>
      <section>
        <h2 class="text-lg font-semibold text-[var(--color-text)] mb-2">3. Account & Membership</h2>
        <p>You are responsible for safeguarding login credentials. Membership grants a limited, non-exclusive, non-transferable license to view content for personal use only during the paid period. Sharing accounts is prohibited.</p>
      </section>
      <section>
        <h2 class="text-lg font-semibold text-[var(--color-text)] mb-2">4. Content License & Restrictions</h2>
        <p>All photos, videos, text and audio are protected by copyright. You may not download, copy, redistribute, re-upload, screen-record, scrape, train AI models on, or commercially exploit any content without written permission. Watermarks and technical protections must not be removed.</p>
      </section>
      <section>
        <h2 class="text-lg font-semibold text-[var(--color-text)] mb-2">5. User Conduct</h2>
        <p>No harassment, threats, illegal requests, or attempts to bypass paywalls or security. Custom requests must comply with applicable law; we may refuse any request at our discretion.</p>
      </section>
      <section>
        <h2 class="text-lg font-semibold text-[var(--color-text)] mb-2">6. Payments</h2>
        <p>Prices are as displayed at checkout. Taxes may apply. Subscriptions may auto-renew unless cancelled before the renewal date. See Refund Policy for refunds.</p>
      </section>
      <section>
        <h2 class="text-lg font-semibold text-[var(--color-text)] mb-2">7. Disclaimers</h2>
        <p>Content is fictional adult entertainment. The Site is provided “as is”. We do not guarantee uninterrupted access. To the fullest extent permitted by law, liability is limited to the amount you paid us in the 12 months preceding a claim.</p>
      </section>
      <section>
        <h2 class="text-lg font-semibold text-[var(--color-text)] mb-2">8. Termination</h2>
        <p>We may suspend or terminate access for violations. You may stop using the Site at any time. Provisions on IP, liability and disputes survive termination.</p>
      </section>
      <section>
        <h2 class="text-lg font-semibold text-[var(--color-text)] mb-2">9. Governing Law</h2>
        <p>These Terms are governed by the laws applicable to the operator’s place of establishment, without regard to conflict-of-law rules, except where mandatory consumer protections in your country apply.</p>
      </section>
      <section>
        <h2 class="text-lg font-semibold text-[var(--color-text)] mb-2">10. Contact</h2>
        <p>Questions about these Terms: use the contact methods published on the Site.</p>
      </section>
    </div>
  </div>
</template>
<script setup>
import { useI18n } from '../composables/useI18n'
const { t } = useI18n()
</script>
