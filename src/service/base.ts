import store from '@/store'
import axios, { AxiosRequestConfig } from 'axios'
axios.defaults.baseURL = 'http://apis.imooc.com/api/'
axios.interceptors.request.use(config => {
  store.commit('setLoading', true)
  config.params = {
    ...config.params,
    icode: '6461F2CAC3BD6261'
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
