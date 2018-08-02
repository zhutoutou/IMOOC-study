import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

const app = new Vue(App)
app.$mount()

export default{
  pages: [],
  config: {
    window: {
      'backgroundTextStyle': 'light',
      'navigationBarBackgroundColor': '#EA5149',
      'navigationBarTitleText': 'WeChat',
      'navigationBarTextStyle': 'black'
    }
  }
}
