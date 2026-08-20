<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-12">
    <h1 class="text-3xl font-bold mb-2">{{ t('compliance.titleDmca') }}</h1>
    <p class="text-sm text-muted mb-8">{{ t('legal.lastUpdate') }}</p>
    <div class="space-y-6 text-muted leading-relaxed text-sm sm:text-base">
      <section>
        <h2 class="text-lg font-semibold text-[var(--color-text)] mb-2">1. Policy</h2>
        <p>
          Luna Exclusive respects intellectual property rights. We respond to notices of alleged copyright
          infringement that comply with the Digital Millennium Copyright Act (17 U.S.C. § 512) and similar laws.
        </p>
      </section>
      <section>
        <h2 class="text-lg font-semibold text-[var(--color-text)] mb-2">2. Filing a Takedown Notice</h2>
        <p>Your written notice should include:</p>
        <ul class="list-disc pl-5 mt-2 space-y-1">
          <li>Identification of the copyrighted work claimed to be infringed</li>
          <li>Identification of the material claimed to be infringing and information reasonably sufficient to locate it (URL)</li>
          <li>Your contact information (address, telephone, email)</li>
          <li>A statement that you have a good-faith belief that use of the material is not authorized</li>
          <li>A statement under penalty of perjury that the information is accurate and that you are the owner or authorized to act</li>
          <li>Your physical or electronic signature</li>
        </ul>
      </section>
      <section>
        <h2 class="text-lg font-semibold text-[var(--color-text)] mb-2">3. Designated Agent</h2>
        <div class="p-4 rounded-xl border text-sm" style="border-color: var(--color-border); background: var(--color-card);">
          <p class="font-medium text-[var(--color-text)]">DMCA Agent</p>
          <p class="mt-1">Luna Exclusive</p>
          <p>Email: dmca@[your-domain]</p>
          <p>[Postal address to be completed by operator]</p>
        </div>
      </section>
      <section>
        <h2 class="text-lg font-semibold text-[var(--color-text)] mb-2">4. Counter-Notice</h2>
        <p>
          If material was removed due to a mistake or misidentification, you may submit a counter-notification
          under 17 U.S.C. § 512(g). We may restore content unless the complainant files a court action.
        </p>
      </section>
      <section>
        <h2 class="text-lg font-semibold text-[var(--color-text)] mb-2">5. Repeat Infringers</h2>
        <p>We may terminate accounts of users who are repeat infringers in appropriate circumstances.</p>
      </section>
    </div>
  </div>
</template>
<script setup>
import { useI18n } from '../composables/useI18n'
const { t } = useI18n()
</script>
