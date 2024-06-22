import { createRouter, createWebHistory } from 'vue-router'
import ReportingView from '../views/ReportingView.vue'
import HomeView from '../views/HomeView.vue'
import NotFound from '../views/NotFound.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/reporting',
      name: 'Reporting',
      component: ReportingView
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

export default router
