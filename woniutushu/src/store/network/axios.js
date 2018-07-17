// 拦截器页面
import Axios from 'axios'

Axios.defaults.withCredentials = true

// request interceptor
Axios.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

// response interceptor
/* eslint-disable eqeqeq */
Axios.interceptors.response.use(function (response) {
  if (response.data.code == 9999 || response.data.errCode == 9999 || response.data.errorCode == 9999) {
    console.log('系统繁忙')
  }
  return response
}, function (error) {
  return Promise.reject(error)
})

export default Axios
