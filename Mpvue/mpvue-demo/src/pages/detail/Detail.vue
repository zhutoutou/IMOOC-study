<template>
    <div class="detail">
        <BookInfo :info="detail"></BookInfo>
        <CommentList :comments="comments"></CommentList>
        <div class="comment" v-if="showAdd">
          <textarea 
            v-model='comment'
            class="textarea"
            maxlength="100"
            placeholder="请输入图书短评"></textarea>
          <div class="location">
            地理位置：
            <switch color='EA5A49' :checked='location' @change='getGeo'></switch>
            <span class="text-primary">{{location}}</span>
          </div>
          <div class="phone">
            手机型号：
            <switch color='EA5A49' :checked='phone' @change='getPhone'></switch>
            <span class="text-primary">{{phone}}</span>
          </div>
          <button class="btn" @click="addComment">评论</button>
        </div>
        <div v-else class="text-footer">
          未登录或者已经评论过
        </div>
        <button class="btn" open-type="share">
          转发给好友
        </button>
    </div>
</template>
<script>
import {get, post, showModal} from '@/utils'
import BookInfo from '@/components/BookInfo'
import CommentList from '@/components/CommentList'
export default {
  components: {
    BookInfo,
    CommentList
  },
  data () {
    return {
      userinfo: {},
      comments: [],
      bookid: '',
      detail: {},
      comment: '',
      location: '',
      phone: ''
    }
  },
  computed: {
    showAdd () {
      // 用户没有登陆不给予评论
      if (!this.userinfo.openId) {
        return false
      }
      if (this.comments.filter(v => v.openid === this.userinfo.openId).length) {
        return false
      }
      return true
    }
  },
  methods: {
    async getDetail () {
      const detail = await get('/weapp/bookDetail', {id: this.bookid})
      this.detail = detail
      wx.setNavigationBarTitle({
        title: detail.title
      })
    },
    getGeo (e) {
      // 4997FFTU1NpS7W1lyo6P78hvIkuUZ4vB
      const ak = '4997FFTU1NpS7W1lyo6P78hvIkuUZ4vB'
      let url = 'http://api.map.baidu.com/geocoder/v2/'
      if (e.target.value) {
        wx.getLocation({
          success: async geo => {
            wx.request({
              url: url,
              data: {
                location: `${geo.latitude},${geo.longitude}`,
                output: 'json',
                ak
              },
              success: res => {
                if (res.data.status === 0) {
                  this.location = res.data.result.addressComponent.city
                } else {
                  this.location = '未知地点'
                }
              }
            })
          }
        })
      } else {
        // 未选中
        this.location = ''
      }
    },
    getPhone (e) {
      if (e.target.value) {
        const {model} = wx.getSystemInfoSync()
        this.phone = model
      } else {
        // 未选中
        this.phone = ''
      }
    },
    async addComment () {
      if (!this.comment) return
      // 评论内容 手机型号 地理位置 图书ID 用户的openId
      const data = {
        bookid: this.bookid,
        comment: this.comment,
        location: this.location,
        phone: this.phone,
        openId: this.userinfo.openId
      }
      try {
        await post('/weapp/addComment', data)
        showModal('成功', '评论成功！')
        this.comment = ''
        this.getComments()
      } catch (err) {
        showModal('失败', err.data.msg)
      }
    },
    async getComments () {
      try {
        const comments = await get('/weapp/commentList', {bookid: this.bookid})
        console.log(comments)
        this.comments = comments.list
      } catch (err) {
        console.log(err)
      }
    }
  },
  mounted () {
    wx.showShareMenu({
      // shareTicket 是获取转发目标群信息的票据，只有拥有 shareTicket 才能拿到群信息，用户每次转发都会生成对应唯一的shareTicket 。
      withShareTicket: true
    })
    this.bookid = this.$root.$mp.query.id
    this.getDetail()
    this.userinfo = (wx.getStorageSync('userinfo') && wx.getStorageSync('userinfo').userinfo) || {}
    this.getComments()
  },
  // 分享
  onShareAppMessage: function (res) {
    return {
      title: 'zhuzhutou',
      path: 'pages/me/main',
      success: function (res) {
        // getSystemInfo是为了获取当前设备信息，判断是android还是ios，如果是android
        // 还需要调用wx.getShareInfo()，只有当成功回调才是转发群，ios就只需判断shareTickets
        // 获取用户设备信息
        wx.getSystemInfo({
          success: function (d) {
            console.log(d)
            // 判断用户手机是IOS还是Android
            if (d.platform === 'android') {
              wx.getShareInfo({// 获取群详细信息
                shareTicket: res.shareTickets,
                success: function (res) {
                  showModal('成功', '积分+1')
                  // 这里写你分享到群之后要做的事情，比如增加次数什么的
                },
                fail: function (res) { // 这个方法就是分享到的是好友，给一个提示
                  wx.showModal({
                    title: '提示',
                    content: '分享好友无效，请分享群',
                    success: function (res) {
                      if (res.confirm) {
                        console.log('用户点击确定')
                      } else if (res.cancel) {
                        console.log('用户点击取消')
                      }
                    }
                  })
                }
              })
            }
            if (d.platform === 'ios') { // 如果用户的设备是IOS
              if (res.shareTickets !== undefined) {
                console.log('分享的是群')
                wx.getShareInfo({
                  shareTicket: res.shareTickets,
                  success: function (res) {
                    // 分享到群之后你要做的事情
                  }
                })
              } else { // 分享到个人要做的事情，我给的是一个提示
                console.log('分享的是个人')
                wx.showModal({
                  title: '提示',
                  content: '分享好友无效，请分享群',
                  success: function (res) {
                    if (res.confirm) {
                      console.log('用户点击确定')
                    } else if (res.cancel) {
                      console.log('用户点击取消')
                    }
                  }
                })
              }
            }
          },
          fail: function (res) {

          }
        })
      }

    }
  }
}
</script>
<style lang="scss" scoped>
.detail{
  font-size: 14px;
  .comment{
    margin-top: 10px;
    .textarea{
      width: 730rpx;
      height: 200rpx;
      background: #eee;
      padding: 10rpx;
    }
    .location{
      margin-top: 10px;
      padding: 5px 10px;
    }
    .phone{
      margin-top: 10px;
      padding: 5px 10px;
    }
    span{
      margin-left: 10px;
    }
  }
}
</style>
