<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-12">
    <h1 class="text-3xl font-bold mb-2">{{ t('compliance.title2257') }}</h1>
    <p class="text-sm text-muted mb-8">{{ t('legal.lastUpdate') }}</p>
    <div class="space-y-6 text-muted leading-relaxed text-sm sm:text-base">
      <p>
        In compliance with the Federal Labeling and Record-Keeping Law (also known as 18 U.S.C. § 2257),
        all models, actors, actresses and other persons who appear in any visual depiction of actual or
        simulated sexually explicit conduct appearing on this website were over the age of eighteen (18)
        years at the time of the creation of such depictions.
      </p>
      <p>
        All other visual depictions displayed on this website are exempt from the provision of 18 U.S.C. § 2257
        because they do not portray conduct as specifically listed in 18 U.S.C. § 2256 (2) (A) through (D),
        but are merely depictions of non-sexually explicit nudity, or are depictions of simulated sexual
        conduct, or are otherwise exempt because the visual depictions were created prior to July 3, 1995.
      </p>
      <p>
        The original records required pursuant to 18 U.S.C. § 2257 and 28 C.F.R. 75 for materials contained
        in this website are kept by the Custodian of Records at the following location:
      </p>
      <div class="p-4 rounded-xl border text-sm" style="border-color: var(--color-border); background: var(--color-card);">
        <p class="font-medium text-[var(--color-text)]">Custodian of Records</p>
        <p class="mt-1">Luna Exclusive — Records Office</p>
        <p>[Address to be completed by operator]</p>
        <p>Email: records@[your-domain]</p>
      </div>
      <p class="text-xs">
        This page is a template for operators. Replace placeholder contact details with your real records
        custodian information before production use. Consult qualified legal counsel for jurisdiction-specific requirements.
      </p>
    </div>
  </div>
</template>
<script setup>
import { useI18n } from '../composables/useI18n'
const { t } = useI18n()
</script>
