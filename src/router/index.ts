import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Columns from '@/components/Columns.vue'
import ColumnDetail from '@/components/ColumnDetail.vue'
import store from '@/store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '',
        component: Columns,
        name: 'Index'
      },
      {
        path: 'columnDetail/:id',
        component: ColumnDetail,
        name: 'ColumnDetail'
      },
      {
        path: 'create',
        name: 'CreatePost',
        meta: {
          requiredLogin: true
        },
        component: () =>
          import(/* webpackChunkName: "create" */ '../views/CreatePost.vue')
      }
    ]
  },
  {
    path: '/signin',
    name: 'SignIn',
    meta: {
      redirectAlreadyLogin: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "signin" */ '../views/SignIn.vue')
  },
  {
    path: '/upload',
    component: () => import('@/components/Uploader.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiredLogin && !store.state.user.isLogin) {
    next({
      name: 'SignIn'
    })
  } else if (to.meta.redirectAlreadyLogin && store.state.user.isLogin) {
    next('/')
  } else {
    next()
  }
})

export default router
