import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Columns from '@/components/Columns.vue'
import ColumnDetail from '@/components/ColumnDetail.vue'
import store from '@/store'
import { computed } from '@vue/runtime-core'
import axios from 'axios'

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
  // if (to.meta.requiredLogin && !store.state.user.isLogin) {
  //   next({
  //     name: 'SignIn'
  //   })
  // } else if (to.meta.redirectAlreadyLogin && store.state.user.isLogin) {
  //   next('/')
  // } else {
  //   next()
  // }

  const { user, token } = store.state
  const { requiredLogin, redirectAlreadyLogin } = to.meta

  if (user.isLogin) {
    if (redirectAlreadyLogin) {
      next('/')
    } else {
      next()
    }
  } else {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      store
        .dispatch('fetchCurrentUser')
        .then(() => {
          if (redirectAlreadyLogin) {
            next('/')
          } else {
            next()
          }
        })
        .catch(err => {
          // 有token 但是还是有错误，说明token已经不好用了 比如过期了 此时应该删除
          console.log(err)
          localStorage.removeItem('token')
          next({
            name: 'SignIn'
          })
        })
    } else {
      if (requiredLogin) {
        next({
          name: 'SignIn'
        })
      } else {
        next()
      }
    }
  }
})

export default router
