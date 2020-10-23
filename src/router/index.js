/*
 * @Author: your name
 * @Date: 2020-10-23 16:21:33
 * @LastEditTime: 2020-10-23 17:06:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \backstageManage\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from './../views/login/login'

Vue.use(VueRouter)

export default new VueRouter({
    routes:[
        { path: '/login', component: Login },
        { path: '', redirect: 'Login' }
    ]
  })