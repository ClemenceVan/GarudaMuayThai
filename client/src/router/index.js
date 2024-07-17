import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/views/LandingPage.vue'
import Home from '@/views/Home.vue'
import Shop from '@/views/Shop.vue'
import ShopItem from '@/views/ShopItem.vue'
import NotFound from '@/views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landingPage',
      component: LandingPage
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: "/shop",
      name: "Shop",
      component: Shop
    },
    {
      path: "/shop/:id",
      name: "ShopItem",
      component: ShopItem
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: NotFound
    }
  ]
})

export default router
