import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('../views/HomeView.vue'), meta: { titleKey: 'nav.home' } },
  { path: '/about', name: 'About', component: () => import('../views/AboutView.vue'), meta: { titleKey: 'nav.about' } },
  { path: '/gallery', name: 'Gallery', component: () => import('../views/GalleryView.vue'), meta: { titleKey: 'nav.gallery' } },
  { path: '/videos', name: 'Videos', component: () => import('../views/VideosView.vue'), meta: { titleKey: 'nav.videos' } },
  { path: '/membership', name: 'Membership', component: () => import('../views/MembershipView.vue'), meta: { titleKey: 'nav.membership' } },
  { path: '/blog', name: 'Blog', component: () => import('../views/BlogView.vue'), meta: { titleKey: 'nav.blog' } },
  { path: '/custom', name: 'Custom', component: () => import('../views/CustomView.vue'), meta: { titleKey: 'nav.custom' } },
  { path: '/shop', name: 'Shop', component: () => import('../views/ShopView.vue'), meta: { titleKey: 'nav.shop' } },
  { path: '/auth', name: 'Auth', component: () => import('../views/AuthView.vue'), meta: { titleKey: 'auth.login' } },
  { path: '/faq', name: 'FAQ', component: () => import('../views/FAQView.vue'), meta: { titleKey: 'nav.faq' } },
  { path: '/search', name: 'Search', component: () => import('../views/SearchView.vue'), meta: { titleKey: 'search' } },
  { path: '/privacy', name: 'Privacy', component: () => import('../views/PrivacyView.vue'), meta: { titleKey: 'legal.privacyTitle' } },
  { path: '/terms', name: 'Terms', component: () => import('../views/TermsView.vue'), meta: { titleKey: 'legal.termsTitle' } },
  { path: '/refund', name: 'Refund', component: () => import('../views/RefundView.vue'), meta: { titleKey: 'legal.refundTitle' } },
  { path: '/age-statement', name: 'AgeStatement', component: () => import('../views/AgeStatementView.vue'), meta: { titleKey: 'legal.ageTitle' } },
  { path: '/2257', name: 'Compliance2257', component: () => import('../views/Compliance2257View.vue'), meta: { titleKey: 'compliance.title2257' } },
  { path: '/dmca', name: 'Dmca', component: () => import('../views/DmcaView.vue'), meta: { titleKey: 'compliance.titleDmca' } },
  { path: '/legal', redirect: '/terms' },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../views/NotFoundView.vue'), meta: { titleKey: 'notFound.title' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() { return { top: 0 } }
})

router.beforeEach((to) => {
  // Title updated in App/component via i18n where possible; fallback:
  document.title = to.meta.titleKey ? `Luna Exclusive` : 'Luna Exclusive'
})

export default router
