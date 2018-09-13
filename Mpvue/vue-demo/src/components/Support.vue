
<template>
  <div class="support-container">
    <div class="user">
      <img class="user-headimg"  :src="userinfo.headimgurl" alt="">
      <div class="user-nickname">{{userinfo.nickname}}</div>
    </div>
    <h3>为TA冲榜</h3>
    <div class="star" @click="chooseStar">
      <Star :starinfo="currentStar" class="star-info"></Star>
      <div class="star-choose">选择爱豆></div>
    </div>
    <div class="pay-container">
      <div class="pay-item" v-for="(item,i) in payItems"
      :key="i" @click="checkOne(item.id)">
        <div>{{item.money}}元  (+{{item.hotValue}}热度)</div>
        <img :src="checkedImg(item.id)">
      </div>
    </div>
    <button class="btn subpay" @click="Pay">用爱发电</button>
  </div>
</template>

<script>
import { setUserInfo, getUserInfo } from '@/libs/util'
import config from '@/config'
import wechat from '@/libs/wechat'
import wxmp from '@/api/wxmp'
import Star from '@/components/Star'
export default {
  components: {Star},
  data () {
    return {
      currentId: 2,
      userinfo: {},
      currentStar: {},
      payItems: [{
        id: 0,
        money: 1,
        hotValue: 10
      }, {
        id: 1,
        money: 5,
        hotValue: 100
      }, {
        id: 2,
        money: 10,
        hotValue: 300
      }, {
        id: 3,
        money: 20,
        hotValue: 700
      }, {
        id: 4,
        money: 50,
        hotValue: 2000
      }, {
        id: 5,
        money: 100,
        hotValue: 5000
      }]
    }
  },
  computed: {
    checkedImg () {
      return function (id) {
        return (id === this.currentId) ? config.checkedImg : config.uncheckedImg
      }
    }
  },
  methods: {
    checkOne (id) {
      this.currentId = id
    },
    async Pay () {
      try {
        if (this.userinfo) {
          const {openid, unionid, miniopenid} = this.userinfo
          const starid = this.userinfo.stars[0].id
          console.log(`用户openid：${openid},unionid:${unionid}发起支付`)
          // eslint-disable-next-line
          const total_fee = 1
          const body = JSON.stringify({msg: '测试', openid, unionid})
          const res = await wechat.chooseWXPayAsync(total_fee, body, openid, unionid)
          if (res && res.errMsg === 'chooseWXPay:ok') {
            const paymininotifyRes = await wxmp.paymininotify({
              openid: miniopenid,
              starid: starid,
              count: 1
            })
            if (paymininotifyRes.code === -1) throw new Error(`paymininotify请求异常,Err:${paymininotifyRes.data.msg}`)
          }
        }
      } catch (err) {
        console.log(err)
      }
    },
    chooseStar () {

    },
    async getMiniOpenid () {
      let userinfo = getUserInfo()
      try {
        if (userinfo && userinfo.unionid) {
          if (!userinfo.miniopenid) {
            const miniopenidRes = await wxmp.miniopenid({unionid: userinfo.unionid})
            if (miniopenidRes.code === -1) throw new Error(`miniopenid请求异常,Err:${miniopenidRes.data.msg}`)
            const {miniopenid} = miniopenidRes.data
            userinfo.miniopenid = miniopenid
            this.userinfo = userinfo
            setUserInfo(userinfo)
          }
        } else {
          throw new Error('没有获取到userinfo')
        }
      } catch (err) {
        console.log(err.message)
      }
    },
    async getStarInfo () {
      try {
        if (this.userinfo && this.userinfo.miniopenid) {
          const starlistRes = await wxmp.starlist({openid: this.userinfo.miniopenid})
          if (starlistRes.code === -1) throw new Error(`starlist请求异常,Err:${starlistRes.data.msg}`)
          const {stars} = starlistRes.data
          console.log('stars', stars)
          this.userinfo.stars = stars
          if (!this.currentStar) {
            this.currentStar = stars[0]
          } else {
            this.currentStar = stars.find(v => v.id === this.currentStar.id)
          }
        } else {
          throw new Error('没有获取到userinfo')
        }
      } catch (err) {
        console.log(err.message)
      }
    }
  },
  async mounted () {
    await this.getMiniOpenid()
    await this.getStarInfo()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.support-container{
  margin:0 10px;
  .user{
    height: 40px;
    line-height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    .user-headimg{
      height: 40px;
      width: 40px;
      border-radius: 50%;
    }
    .user-nickname{
      margin-left: 10px;
      font-size: 20px;
    }
  }
  .star{
    height: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    .stra-info{

    }
    .star-choose{
      margin-left: auto;
      margin-right: 10px;
      color: rgb(195,195,195);
      font-size:16px;
    }
  }
  .pay-container{
    width:100%;
    display: flex;
    flex-direction: column;
    .pay-item{
      display: flex;
      flex-direction: row;
      height:45px;
      line-height: 45px;
      border-bottom: 1px rgb(195,195,195) solid;
      font-size: 14px;
      font-weight: bold;
      align-items: center;
      img{
        width:20px;
        height: 20px;
        margin-left: auto;
        margin-right: 5px;
      }
    }
    .pay-item:active{
      background-color: rgb(195,195,195)
    }
  }
  .subpay{
    margin-top:20px;
  }
}

</style>
