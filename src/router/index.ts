import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home'
import Columns from '@/components/Columns'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '',
        component: Columns
      }
    ]
  },
  {
    path: '/signin',
    name: 'SignIn',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "signin" */ '../views/SignIn')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
