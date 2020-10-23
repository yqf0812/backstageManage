/*
 * @Author: your name
 * @Date: 2020-10-23 15:20:58
 * @LastEditTime: 2020-10-23 16:30:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \backstageManage\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
