import Vue from 'vue'
import wxmp from '../api/wxmp'
const jsApiList = ['chooseWXPay']

export default {
  // 获取JSSDK
  getJSSDK (url) {
    wxmp.jssdk({url: url}).then(res => {
      // res = res.data
      if (res.code === -1) console.log(res.data.msg)
      const wxconfig = {
        debug: false,
        appId: res.data.appId,
        timestamp: res.data.timestamp,
        nonceStr: res.data.nonceStr,
        signature: res.data.signature,
        jsApiList: jsApiList
      }
      Vue.wechat.config(wxconfig)
    })
  },
  getJSSDKAsync (url) {
    return new Promise((resolve) => {
      wxmp.jssdk({url: url}).then(res => {
        // res = res.data
        if (res.code === -1) console.log(res.data.msg)
        const wxconfig = {
          debug: false,
          appId: res.data.appId,
          timestamp: res.data.timestamp,
          nonceStr: res.data.nonceStr,
          signature: res.data.signature,
          jsApiList: jsApiList
        }
        Vue.wechat.config(wxconfig)
        resolve()
      })
    })
  },
  // eslint-disable-next-line
  chooseWXPayAsync (total_fee, body , openid,unionId) {
    return new Promise((resolve) => {
      wxmp.wxpay({total_fee, body, origin: 'PLATFORM', openid, unionId}).then(res => {
        // res = res.data
        if (res.code === -1) console.log(res.data.msg)
        Vue.wechat.chooseWXPay({
          timestamp: res.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: res.data.nonceStr, // 支付签名随机串，不长于 32 位
          package: res.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
          signType: res.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: res.data.paySign, // 支付签名
          success: function (res) {
          // 支付成功后的回调函数
            resolve(res)
          }
        })
      })
    })
  }

}
