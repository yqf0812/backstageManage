/*
 * @Author: your name
 * @Date: 2020-10-23 16:21:33
 * @LastEditTime: 2020-12-04 10:06:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \backstageManage\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from './../views/login/login'
import Index from './../views/container/index'

Vue.use(VueRouter)

export default new VueRouter({
    routes:[
        { path: '/login', component: Login },
        { path: '/index', component: Index },
        { path: '', redirect: 'Login' }
    ]
  })