import {
  getAndCommit,
  getColumn,
  getColumns,
  getPosts,
  postAndCommit
} from '@/service/columns'
import { IPostProps } from '@/types/column-detail'
import { ColumnProps } from '@/types/column-list'
import { UserProps } from '@/types/global-header'
import axios from 'axios'
import { Commit, createStore } from 'vuex'

// const store = createStore({
//   state: {
//     count: 0
//   },
//   mutations: {
//     add(state) {
//       state.count++
//     }
//   },
//   actions: {},
//   modules: {}
// })
// console.log('store', store.state.count)
// store.commit('add')
// console.log('store', store.state.count)

export interface GlobalErrorProps {
  status: boolean
  message?: string
}

export interface GlobalDataProps {
  error: GlobalErrorProps
  columns: ColumnProps[]
  posts: IPostProps[]
  user: UserProps
  loading: boolean
  token: string
}
// 请注意下面这个GlobalDataProps
// 这个东西需要多次使用
// 这里定义store的时候用到了
// 在其他组件使用useStore来获取store的时候也会用到
// 方便ts的代码提示
const store = createStore<GlobalDataProps>({
  state: {
    columns: [],
    posts: [],
    user: {
      isLogin: false
    },
    loading: false,
    token: localStorage.getItem('token') || '',
    error: {
      status: false
    }
  },
  actions: {
    fetchColumns(context) {
      getAndCommit('/columns', 'fetchColumns', context.commit)
    },
    async fetchColumn({ commit }, cid) {
      const { data } = await getColumn(cid)
      commit('fetchColumn', data)
    },
    fetchPosts({ commit }, cid) {
      getPosts(cid).then(res => {
        commit('fetchPosts', res.data)
      })
    },
    login({ commit }, payload) {
      return postAndCommit('user/login', 'login', commit, payload)
    },
    fetchCurrentUser({ commit }) {
      return getAndCommit('user/current', 'fetchCurrentUser', commit)
    },
    // 下面的例子展示的是如何在一个action里面使用另一个action
    // 就是组合action 和promise有点类似
    loginAndFetch({ dispatch, commit }, loginData) {
      return dispatch('login', loginData).then(res => {
        return dispatch('fetchCurrentUser')
      })
    },
    createPost({ commit }, payload) {
      return postAndCommit('posts', 'createPost', commit, payload)
    }
  },
  mutations: {
    // 在mutations里面的函数可以获取到state里面的数据(第一个参数就是state)
    login(state, rawData) {
      // state.user = {
      //   ...state.user,
      //   isLogin: false,
      //   name: 'viking'
      // }
      const { token } = rawData.data
      localStorage.setItem('token', token)
      state.token = token
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    setLoading(state, status: boolean) {
      state.loading = status
    },
    fetchColumns(state, rawData) {
      state.columns = rawData.data.list
    },
    createPost(state, newPost) {
      state.posts.push(newPost)
    },
    fetchPosts(state, rawData) {
      state.posts = rawData.data.list
    },
    fetchColumn(state, rawData) {
      state.columns = [rawData.data]
    },
    fetchCurrentUser(state, rawData) {
      state.user = {
        isLogin: true,
        ...rawData.data
      }
    },
    setError(state, e: GlobalErrorProps) {
      state.error = e
    },
    logout(state) {
      state.token = ''
      localStorage.removeItem('token')
      delete axios.defaults.headers.common.Authorization
    }
  },
  getters: {
    // 组件在使用的时候是这样用的 const xxx = computed(()=>store.getters.biggerColumnLen)
    // 但是这时没有代码提示
    // biggerColumnLen(state) {
    //   return state.columns.filter(c => c.id > 2).length
    // }

    // 假如getters需要参数 那么此时返回的就是一个函数
    getColumnById(state) {
      return (id: string) => {
        return state.columns.find(c => c._id === id)
      }
    },
    getPostsByCid(state) {
      return (cid: string) => {
        return state.posts.filter(p => p.column === cid)
      }
    }
  }
})

export default store
