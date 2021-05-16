import store from '@/store'
import axios, { AxiosRequestConfig } from 'axios'
axios.defaults.baseURL = 'http://apis.imooc.com/api/'
const icode = '22848D414CEB7D8C'
axios.interceptors.request.use(config => {
  store.commit('setLoading', true)
  store.commit('setError', { status: false, message: '' })
  // get 请求，添加到 url 中
  config.params = { ...config.params, icode }
  // 其他请求，添加到 body 中
  // 如果是上传文件，添加到 FormData 中
  if (config.data instanceof FormData) {
    config.data.append('icode', icode)
  } else {
    // 普通的 body 对象，添加到 data 中
    config.data = { ...config.data, icode }
  }

  return config
})

axios.interceptors.response.use(
  config => {
    store.commit('setLoading', false)
    return config
  },
  err => {
    const { error } = err.response.data
    store.commit('setError', { status: true, message: error })
    store.commit('setLoading', false)
    return Promise.reject(error)
  }
)

export function get(url: string, params?: AxiosRequestConfig) {
  return axios
    .get(url, {
      params
    })
    .then(res => {
      return res
    })
}

export function post(url: string, payload: any) {
  return axios.post(url, payload).then(res => {
    return res
  })
}
