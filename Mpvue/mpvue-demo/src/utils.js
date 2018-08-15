// 工作类
import config from './config'
import qcloud from 'wafer2-client-sdk'

function request (url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      data,
      method,
      url: config.host + url,
      success: function (res) {
        if (res.data.code === 0) {
          resolve(res.data.data)
        } else {
          reject(res.data)
        }
      }
    })
  })
}

export function get (url, data) {
  return request(url, 'GET', data)
}

export function post (url, data) {
  return request(url, 'POST', data)
}

export function showSuccess (word) {
  wx.showToast({
    title: word,
    icon: 'success'
  })
}

export function showModal (title, content) {
  wx.showModal({
    title: title,
    content: content,
    showCancel: false
  })
}

// #region qcloud拓展
/**
 * 腾讯服务器登陆
 */
qcloud.loginSync = function () {
  return new Promise((resolve, reject) => {
    qcloud.login({
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}
/**
 * 腾讯服务器免验证登陆
 */
qcloud.loginWithCodeSync = function () {
  return new Promise((resolve, reject) => {
    qcloud.loginWithCode({
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}
/**
 * 腾讯服务获取openId
 * @param {请求地址} url
 */
qcloud.requestSync = function (url) {
  return new Promise((resolve, reject) => {
    qcloud.request({
      url: url,
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}
// #endregion

export default {qcloud}
