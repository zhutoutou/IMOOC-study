import fetch from './fetch'

export default {
  // 获取微信授权地址
  oauth2 (params) {
    return fetch.get('/oauth2', params)
  },

  // 用户登录
  login (params) {
    return fetch.get('/login', params)
  },

  miniopenid (params) {
    return fetch.get('/miniopenid', params)
  },

  // 关联明星列表
  starlist (params) {
    return fetch.get('/starlist', params)
  },

  paymininotify (params) {
    return fetch.post('/paymininotify', params)
  },

  // 获取JSSDK
  jssdk (params) {
    return fetch.get('/jssdk', params)
  },

  // 统一下单
  wxpay (params) {
    return fetch.get('/unified', params)
  }
}
