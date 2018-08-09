<script>
// import {get} from './utils'

export default {
  async created () {
    console.log('小程序进入')
    // const res = await get('/weapp/demo')
    // console.log(123, res)
    // qcloud.setLoginUrl(config.loginUrl)
    // qcloud.login({
    //   success: function (userInfo) {
    //     console.log('登陆成功', userInfo)
    //   },
    //   fail: function (err) {
    //     console.log('登陆失败', err)
    //   }
    // })
  }
}
</script>
<style>
  .btn{
    color:white;
    background-color: #EA5A49;
    margin-bottom: 10px;
    padding-left: 15px;
    padding-right: 15px;
    border-radius: 2px;
    font-size: 16px;
    line-height: 40px;
    height: 40px;
    width:100%;
  }
  .btn:active{
    color:#EA5A49;
    background-color: white;
  }
</style>

