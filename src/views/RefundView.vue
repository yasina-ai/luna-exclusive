<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-12">
    <h1 class="text-3xl font-bold mb-2">{{ t('legal.refundTitle') }}</h1>
    <p class="text-sm text-muted mb-8">{{ t('legal.lastUpdate') }}</p>
    <div class="space-y-6 text-muted leading-relaxed text-sm sm:text-base">
      <section>
        <h2 class="text-lg font-semibold text-[var(--color-text)] mb-2">1. Digital Goods Nature</h2>
        <p>Memberships, video unlocks, photo packs and most digital items are intangible goods delivered immediately or on a continuing basis. Once access is granted, the product is considered consumed.</p>
      </section>
      <section>
        <h2 class="text-lg font-semibold text-[var(--color-text)] mb-2">2. General Rule — No Refund</h2>
        <p>Except as required by mandatory law or as expressly stated below, payments for digital memberships and content are non-refundable. Chargebacks without first contacting us may result in account suspension.</p>
      </section>
      <section>
        <h2 class="text-lg font-semibold text-[var(--color-text)] mb-2">3. Exceptions</h2>
        <p><strong>Technical failure:</strong> If a verified platform error prevents access to paid content and we cannot restore access within a reasonable time, we may offer a proportional refund, credit, or extension at our discretion.</p>
        <p class="mt-2"><strong>Duplicate charge:</strong> Proven duplicate payments will be refunded for the extra amount.</p>
        <p class="mt-2"><strong>Legal cooling-off:</strong> Where consumer law grants a non-waivable withdrawal right for distance contracts, that right applies under the conditions and time limits of that law (often excluded for digital content once performance has begun with your prior consent).</p>
      </section>
      <section>
        <h2 class="text-lg font-semibold text-[var(--color-text)] mb-2">4. Custom Content</h2>
        <p>Custom work started after you approve the brief and pay is generally non-refundable. If we cancel before delivery, you receive a full refund of the custom fee. Revisions follow the scope agreed at purchase.</p>
      </section>
      <section>
        <h2 class="text-lg font-semibold text-[var(--color-text)] mb-2">5. How to Request</h2>
        <p>Contact support with order ID, date, and reason within 14 days of the charge (or the period required by local law). We respond within a few business days. Approved refunds are returned to the original payment method when possible.</p>
      </section>
      <section>
        <h2 class="text-lg font-semibold text-[var(--color-text)] mb-2">6. Subscriptions</h2>
        <p>Cancel auto-renew at any time to avoid future charges. Cancellation does not refund the current paid period; access continues until that period ends.</p>
      </section>
    </div>
  </div>
</template>
<script setup>
import { useI18n } from '../composables/useI18n'
const { t } = useI18n()
</script>
