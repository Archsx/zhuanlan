import { PostProps, testData, testPosts } from '@/testData'
import { ColumnProps } from '@/types/column-list'
import { createStore } from 'vuex'

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
interface UserProps {
  isLogin: boolean
  name?: string
  id?: string
}
export interface GlobalDataProps {
  columns: ColumnProps[]
  posts: PostProps[]
  user: UserProps
}
// 请注意下面这个GlobalDataProps
// 这个东西需要多次使用
// 这里定义store的时候用到了
// 在其他组件使用useStore来获取store的时候也会用到
// 方便ts的代码提示
const store = createStore<GlobalDataProps>({
  state: {
    columns: testData,
    posts: testPosts,
    user: {
      isLogin: false
    }
  },
  mutations: {
    // 在mutations里面的函数可以获取到state里面的数据(第一个参数就是state)
    login(state) {
      state.user = {
        ...state.user,
        isLogin: true,
        name: 'viking'
      }
    }
  }
})

export default store
