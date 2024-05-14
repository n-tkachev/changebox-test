import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import i18n from '@/i18n/i18n'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/en/'
    },
    {
      path: '/:language/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/:language/cards-gallery',
      name: 'Cards List Page',
      component: () => import('../views/CardsListView.vue')
    },
    {
      path: '/:language/create-card',
      name: 'Card Create Page',
      component: () => import('../views/CardCreateView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const destinationLanguage: string = Array.isArray(to.params.language) ? to.params.language[0] : to.params.language;
  const correctLanguage: boolean = i18n.global.availableLocales.includes(destinationLanguage as "en" | "ru");

  if (correctLanguage) {
    next()
  } else {
    next({ name: 'home', params: { language: 'en' } })
  }
})

export default router
