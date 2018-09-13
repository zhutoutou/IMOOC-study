import Vue from 'vue'
import Router from 'vue-router'
import Support from '@/components/Support'
import NotFound from '@/components/NotFound'
import OAUTH from '@/components/OAUTH2'
import { getToken, setToken, setToUrl, getToUrl, setUserInfo } from '@/libs/util'
import wxmp from '../api/wxmp'
import wechat from '@/libs/wechat'

Vue.use(Router)
const baseUrl = '/page'
// const hash = '/#'
const router = new Router({
  base: baseUrl,
  routes: [
    {
      path: '/Support',
      name: 'Support',
      component: Support,
      meta: {
        title: '充值打榜'
      }
    }, {
      path: '/oauth2',
      name: 'oauth2',
      component: OAUTH,
      meta: {
        title: '明星风云榜'
      }
    }, {
      path: '*',
      component: NotFound,
      meta: {
        title: '找不到页面'
      }
    }
  ]
})

const OAUTH2 = 'oauth2'

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  const token = getToken()
  console.log(to.name, token)
  if (!token && to.name !== OAUTH2) { // 尚未授权
    setToUrl(to.name)
    // api接口请求微信授权地址
    // ?code=商户code&userid=用户id
    // code区分商户,userid用于分享
    const {code, userId} = {...to.quert}
    let params = {
      state: `${to.fullPath}-${code}-${userId}`
    }
    wxmp.oauth2(params).then(res => {
      window.location.href = res.data
    })
  } else if (!token && to.name === OAUTH2) { // 授权页面回调
    // ?code=CODE&state=STATE
    let params = { ...to.query }
    // api 接口登录
    wxmp.login(params).then(res => {
      console.log('login', res.data)
      const {token, userinfo} = res.data
      setToken(token)
      setUserInfo(userinfo)
      const name = getToUrl()
      // window.location.href = window.location.origin + baseUrl + hash + target
      console.log(name)
      router.push({name})
      next()
    })
  } else {
    next()
  }
})

router.afterEach(to => {
  let _url = window.location.href.split('#')[0]
  console.log('getJSSDK:' + _url)
  wechat.getJSSDK(_url)
})
export default router
