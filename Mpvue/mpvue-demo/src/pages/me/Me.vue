<template>
    <div class="container">
        <button class="btnLogin" open-type="getUserInfo" lang="zh_CN" @getuserinfo="doLogin" >
        <div class="userinfo">
            <img :src="userinfo.avatarUrl" alt="">
            <p>{{userinfo.nickName}}</p>
        </div>
        </button>
        <YearProgress></YearProgress>
        <button class="btn" @click="scanBook" v-if="logged">添加图书</button>
        <button class="btn" open-type="contact">联系客服</button>
    </div>
</template>
<script>
import config from '@/config'
import YearProgress from '@/components/YearProgress'
import utils, {post, showSuccess, showModal} from '@/utils'
export default {
  components: {
    YearProgress
  },
  data () {
    return {
      userinfo: {
        avatarUrl: '../../static/img/unlogin.png',
        nickName: '点击登陆'
      },
      logged: false
    }
  },
  onLoad () {
    let storage = wx.getStorageSync('userinfo') || {userinfo: this.userinfo, logged: this.logged}
    this.userinfo = storage.userinfo
    this.logged = storage.logged
    if (this.logged) {
      showSuccess('登陆成功')
    }
  },
  methods: {
    async doLogin () {
      if (this.logged) {
        console.log('已经登陆 无需再次登陆')
        return
      }
      wx.showLoading('登陆中')
      utils.qcloud.setLoginUrl(config.loginUrl)
      const session = utils.qcloud.Session.get()
      try {
        if (session) {
        // 第二次登录
        // 或者本地已经有登录态
        // 可使用本函数更新登录态
          try {
            await utils.qcloud.loginWithCodeSync()
          } catch (err) {
            throw err
          }
        } else {
        // 首次登录
          try {
            await utils.qcloud.loginSync()
          } catch (err) {
            throw err
          }
        }
        console.log('登陆成功')
        let res = await utils.qcloud.requestSync(config.userUrl)
        console.log('获取用户信息成功')
        wx.hideLoading()
        showSuccess('登陆成功')

        wx.setStorageSync('userinfo', { userinfo: res.data.data, logged: true })
        this.logged = true
        this.userinfo = res.data.data
      } catch (err) {
        console.log(err)
        wx.hideLoading()
        showModal('失败', err)
      }
    },
    scanBook () {
      wx.scanCode({
        success: (res) => {
          console.log(res)
          this.addBook(res.result)
        },
        fail: (err) => {
          console.log(err)
        }
      })
    },
    async addBook (isbn) {
      console.log(isbn)
      wx.showLoading('添加中')
      let msg = {
        title: '',
        content: ''
      }
      try {
        const res = await post('/weapp/addbook', {isbn, openId: this.userinfo.openId})
        console.log(res)
        msg = {title: '成功', content: `添加${res.title}成功` || '无title异常'}
      } catch (err) {
        console.log(err)
        msg = {title: '失败', content: err.data.msg || '无异常报错'}
      } finally {
        showModal(msg.title, msg.content)
        wx.hideLoading()
      }
    }
  }
}
</script>
<style lang='scss'>
.container {
    padding:0 30rpx;
}
.btnLogin{
    background: none !important;
    color: #000 !important;
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
}
.btnLogin::after{
  border: none;
}

</style>


