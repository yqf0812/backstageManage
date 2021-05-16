/*
 * @Author: your name
 * @Date: 2020-10-23 15:20:58
 * @LastEditTime: 2020-10-23 16:42:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \backstageManage\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import './assets/elementui-var.scss'

import moment from 'moment'
import animated from 'animate.css' 
import VueCookie from 'vue-cookie'
Vue.use(VueCookie)

// 设置本地时区
moment.locale('zh-cn')
Vue.prototype.$moment = moment

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(animated)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
