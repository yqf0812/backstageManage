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

import login from './../views/login/login'
import container from './../views/container/index'
import index from './../views/index/index'
import video from './../views/video/index'
import news from './../views/news/news'
import actor from './../views/actor/actor'
import book from './../views/book/book'

import cookie from 'vue-cookie'
Vue.use(VueRouter)
const router = new VueRouter({
    routes:[
        { path: '/login', component: login },
        { 
            path: '/container', 
            component: container,
            children: [{
                path: '/index',
                component: index,
                meta:{
                    isLogin:true    // 添加该字段，表示进入这个路由是需要登录的
                }//路由元
            }, {
                path: '/video',
                component: video,
                meta:{
                    isLogin:true    // 添加该字段，表示进入这个路由是需要登录的
                }//路由元
            }, {
                path: '/news',
                component: news,
                meta:{
                    isLogin:true    // 添加该字段，表示进入这个路由是需要登录的
                }//路由元
            }, {
                path: '/actor',
                component: actor,
                meta:{
                    isLogin:true    // 添加该字段，表示进入这个路由是需要登录的
                }//路由元
            }, {
                path: '/book',
                component: book,
                meta:{
                    isLogin:true    // 添加该字段，表示进入这个路由是需要登录的
                }//路由元
            }]
        },
        { path: '', redirect: 'Login' }
    ]
  })
router.beforeEach((to,from,next) => {
    const token = cookie.get('Authorization');
    if(to.matched.some(res=>res.meta.isLogin)) {//判断是否需要登录
        if (token) {
            next();
        }else{
            next({
                path:"/login",
                query: {redirect: to.fullPath} 
            });
        }

    }else{
        next()
    }
    if(to.path == "/login"){
        if(token){
            next('/index');
        } else {
            next('/login');
        }
    }
});
export default router;