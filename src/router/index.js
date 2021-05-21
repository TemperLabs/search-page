import Vue from 'vue'
import VueRouter from 'vue-router'
import SearchPage from '../components/SearchPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: SearchPage
  },
  {
    path: '/search',
    children: [
      { path: '', component: () => import(/* webpackChunkName: "about" */ '../components/SearchPage.vue') }
    ],
    component: () => import(/* webpackChunkName: "about" */ '../components/SearchPage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
