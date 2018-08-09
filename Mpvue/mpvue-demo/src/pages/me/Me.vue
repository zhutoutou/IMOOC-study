<template>
    <div class="container">
        <div class="userinfo">
            <img :src="userinfo.avatarUrl" alt="">
            <p>{{userinfo.nickName}}</p>
        </div>
        <YearProgress></YearProgress>
        <button class="btn" @click="scanBook">添加图书</button>
        <button class="btnLogin btn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="doLogin" v-if="!authorization">获取用户信息</button>
    </div>
</template>
<script>
import qcloud from 'wafer2-client-sdk'
import config from '../../config'
import YearProgress from '@/components/YearProgress'
export default {
  components: {
    YearProgress
  },
  data () {
    return {
      userinfo: {},
      authorization: false
    }
  },
  created () {
    this.userinfo = wx.getStorageSync('userinfo') && (wx.getStorageSync('userinfo').userinfo || {})
    console.log(this.userinfo)
    if (!this.userinfo) {
      this.authorization = false
    } else {
      this.authorization = true
    }
  },
  methods: {
    doLogin () {
      qcloud.setLoginUrl(config.loginUrl)
      const session = qcloud.Session.get()

      if (session) {
        // 第二次登录
        // 或者本地已经有登录态
        // 可使用本函数更新登录态
        qcloud.loginWithCode({
          success: res => {
            wx.setStorageSync('userinfo', { userinfo: res, logged: true })
            this.authorization = true
            this.userinfo = res
            console.log('登陆成功')
            // util.showSuccess('登录成功')
          },
          fail: err => {
            console.error(err)
            // util.showModel('登录错误', err.message)
          }
        })
      } else {
        // 首次登录
        qcloud.login({
          success: res => {
            wx.setStorageSync('userinfo', { userinfo: res, logged: true })
            this.authorization = true
            this.userinfo = res
            console.log('首次成功')
            // util.showSuccess('登录成功')
          },
          fail: err => {
            console.error(err)
            // util.showModel('登录错误', err.message)
          }
        })
      }
    },
    scanBook () {
      wx.scanCode({
        success: (res) => {
          console.log(res)
        }
      })
    }
  }
}
</script>
<style lang='scss'>
.container {
    padding:0 30rpx;
}
    .userinfo{
        margin-top:100rpx;
        text-align: center;
        img{
        width: 150rpx;
        height: 150rpx;
        margin:20rpx;
        border-radius: 50%;
        }
    }
    .btnLogin{
      width:200rpx;
    }

</style>


