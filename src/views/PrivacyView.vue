<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-12 prose-legal">
    <h1 class="text-3xl font-bold mb-2">{{ t('legal.privacyTitle') }}</h1>
    <p class="text-sm text-muted mb-8">{{ t('legal.lastUpdate') }}</p>
    <div class="space-y-6 text-muted leading-relaxed text-sm sm:text-base">
      <section>
        <h2 class="text-lg font-semibold text-[var(--color-text)] mb-2">1. Introduction</h2>
        <p>This Privacy Policy explains how Luna Exclusive (“we”, “the Site”) collects, uses, stores and protects information when you visit or use our services. By using the Site you agree to this Policy. This is a private adult platform; we design systems to minimize unnecessary data and to discourage public indexing.</p>
      </section>
      <section>
        <h2 class="text-lg font-semibold text-[var(--color-text)] mb-2">2. Information We Collect</h2>
        <p>Account & membership: email, nickname, membership tier, payment status (not full card numbers). Technical: IP address, browser type, device info, approximate region, access logs for security. Interaction: custom requests, messages you send, purchase history. Cookies / localStorage: language, theme, age-verification flag, session tokens. We do not require real-name ID for general browsing; stronger verification may apply where required by payment providers or law.</p>
      </section>
      <section>
        <h2 class="text-lg font-semibold text-[var(--color-text)] mb-2">3. How We Use Information</h2>
        <p>To provide membership access, process payments, fulfill customs, prevent fraud and abuse, improve the product, send transactional notices (not spam marketing without consent), and comply with legal obligations. We do not sell your personal data to third parties for advertising.</p>
      </section>
      <section>
        <h2 class="text-lg font-semibold text-[var(--color-text)] mb-2">4. Sharing</h2>
        <p>Payment processors (to complete transactions). Infrastructure / CDN / email providers under contract. Authorities when required by valid legal process. Aggregated, non-identifying statistics may be used internally.</p>
      </section>
      <section>
        <h2 class="text-lg font-semibold text-[var(--color-text)] mb-2">5. Retention & Security</h2>
        <p>We retain data only as long as needed for the purposes above or as required by law. We use encryption in transit (HTTPS), access controls, and operational safeguards. No method is 100% secure; you use the Site at your own risk regarding residual security risks.</p>
      </section>
      <section>
        <h2 class="text-lg font-semibold text-[var(--color-text)] mb-2">6. Your Choices</h2>
        <p>You may request access, correction, or deletion of your account data (subject to legal retention). You may clear localStorage / cookies in your browser. Opt out of non-essential communications where offered.</p>
      </section>
      <section>
        <h2 class="text-lg font-semibold text-[var(--color-text)] mb-2">7. Children</h2>
        <p>The Site is strictly for adults. We do not knowingly collect data from anyone under 18 (or the age of majority in your jurisdiction). If we learn such data was collected, we will delete it.</p>
      </section>
      <section>
        <h2 class="text-lg font-semibold text-[var(--color-text)] mb-2">8. International Users</h2>
        <p>Data may be processed in regions where our providers operate. By using the Site you consent to such transfers subject to appropriate safeguards.</p>
      </section>
      <section>
        <h2 class="text-lg font-semibold text-[var(--color-text)] mb-2">9. Changes & Contact</h2>
        <p>We may update this Policy; the “last updated” date will change. Continued use after changes constitutes acceptance. For privacy requests, contact us via the channels listed on the Site.</p>
      </section>
    </div>
  </div>
</template>
<script setup>
import { useI18n } from '../composables/useI18n'
const { t } = useI18n()
</script>
