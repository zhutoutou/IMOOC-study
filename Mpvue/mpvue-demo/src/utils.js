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
export default {qcloud}
