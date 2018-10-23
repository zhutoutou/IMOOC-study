
<template>
  <div class="support-container">
    <div class="user">
      <img class="user-headimg"  :src="userinfo.headimgurl" alt="">
      <div class="user-nickname">{{userinfo.nickname}}</div>
    </div>
    <div class="support-panel" v-if="hasStar">
      <h3>为TA冲榜</h3>
      <div class="star" @click="chooseStar" >
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
      <button class="btn subpay" @click="Pay">{{ChargeText}}</button>
    </div>
    <h2 v-else>先去明星风云榜小程序，关注自己的爱豆吧</h2>
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
      hasCharge: false,
      hasStar: true,
      currentId: 2,
      userinfo: {},
      stars: [],
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
    },
    ChargeText () {
      return this.hasCharge ? '用爱发电' : '用爱发电(首冲送30热度)'
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
          const starid = this.currentStar.id
          const payitem = this.payItems.find(v => v.id === this.currentId)
          // eslint-disable-next-line
          const total_fee = payitem.money * 100
          const count = this.hasCharge ? payitem.hotValue : payitem.hotValue + 30
          const body = `${count}热度`
          const res = await wechat.chooseWXPayAsync(total_fee, body, openid, unionid)
          if (res && res.errMsg === 'chooseWXPay:ok') {
            const paymininotifyRes = await wxmp.paymininotify({
              openid: miniopenid,
              starid: starid,
              count: count
            })
            if (paymininotifyRes.code === -1) throw new Error(`paymininotify请求异常,Err:${paymininotifyRes.data.msg}`)
            else {
              this.hasCharge = true
              await this.getStarInfo()
            }
          }
        }
      } catch (err) {
        console.log(err)
      }
    },
    chooseStar () {
      this.$router.push({name: 'ChooseStar', params: {stars: this.stars}})
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
            setUserInfo(userinfo)
          }
          this.userinfo = userinfo
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
          this.stars = stars
          if (this.currentStar && this.currentStar.id) {
            this.currentStar = stars.find(v => v.id === this.currentStar.id) || this.currentStar
          } else {
            this.currentStar = stars[0]
          }
        } else {
          throw new Error('没有获取到miniopenid')
        }
      } catch (err) {
        console.log(err.message)
      }
    },
    async GethasCharge () {
      try {
        if (this.userinfo && this.userinfo.unionid) {
          const haschargeRes = await wxmp.hascharge({unionId: this.userinfo.unionid})
          if (haschargeRes.code === -1) throw new Error(`hascharge请求异常,Err:${haschargeRes.data.msg}`)
          const hascharge = haschargeRes.data
          this.hasCharge = hascharge
        } else {
          throw new Error('没有获取到unionid')
        }
      } catch (err) {
        console.log(err.message)
      }
    }
  },
  async mounted () {
    const starinfo = this.$route.params && this.$route.params.starinfo
    if (starinfo) this.currentStar = starinfo
    await this.getMiniOpenid()
    await this.getStarInfo()
    await this.GethasCharge()
    this.hasStar = this.userinfo && this.userinfo.miniopenid && this.stars && this.stars.length > 0
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.support-container{
  overflow: hidden;
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
  .support-panel{
    display: flex;
    flex-direction: column;;
    .star{
      height: 60px;
      display: flex;
      flex-direction: row;
      align-items: center;
      border-bottom: 1px solid rgb(195,195,195);
      .star-choose{
        margin-left: auto;
        margin-right: 0px;
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
      .pay-item:last-child{
        border:none
      }
      .pay-item:active{
        background-color: rgb(195,195,195)
      }
    }
    .subpay{
      margin-top:40px;
    }
  }
}

</style>
