import axios from 'axios'
import { Message } from 'element-ui'
import { baseUrl } from '../config/env'

const fetch = axios.create({
  baseURL: baseUrl,
  timeout: 5000
})

// 请求拦截
fetch.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截
fetch.interceptors.response.use(res => {
  if (!res.data) {
    return Promise.reject(res)
  } else if (res.data.success) {
    return Promise.resolve(res.data)
  } else {
    return Promise.reject(res.data)
  }
}, error => {
  Message.error('网络出问题啦！')
  return Promise.reject(error)
})

export default fetch
