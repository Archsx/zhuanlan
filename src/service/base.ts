import store from '@/store'
import axios, { AxiosRequestConfig } from 'axios'
axios.defaults.baseURL = 'http://apis.imooc.com/api/'
axios.interceptors.request.use(config => {
  store.commit('setLoading', true)
  // get 请求，添加到 url 中
  config.params = { ...config.params, icode: '6461F2CAC3BD6261' }
  // 其他请求，添加到 body 中
  // 如果是上传文件，添加到 FormData 中
  if (config.data instanceof FormData) {
    config.data.append('icode', '6461F2CAC3BD6261')
  } else {
    // 普通的 body 对象，添加到 data 中
    config.data = { ...config.data, icode: '6461F2CAC3BD6261' }
  }

  return config
})

axios.interceptors.response.use(config => {
  store.commit('setLoading', false)
  return config
})

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
