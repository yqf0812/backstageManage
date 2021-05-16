/*
 * @Author: your name
 * @Date: 2020-10-23 16:50:02
 * @LastEditTime: 2020-10-23 16:56:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \backstageManage\src\api\index.js
 */
import Env from './env'
import axios from 'axios'
import routerIndex from './../router'
import { MessageBox, Message } from 'element-ui'
import cookie from 'vue-cookie'
import store from './../store/index'

let token = '';

axios.defaults.withCredentials = false;
axios.defaults.headers.common['authorization'] = token;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';//配置请求头

//添加一个请求拦截器
axios.interceptors.request.use(function (config) {
  let user = cookie.get('Authorization');
  if (user) {
    token = user;
  }
  config.headers.common['authorization'] = token;
  return config;
}, function (error) {
  // Do something with request error
  console.info("error: ");
  console.info(error);
  return Promise.reject(error);
});

// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
  // if (response.data && response.data.code) {
  //   // console.log(response)
  //   // if (parseInt(response.data.code) === 108 || parseInt(response.data.code) === 109 || response.data.msg === 'TOKEN失效，请重新登录' || response.data.msg === 'TOKEN不存在') {
  //   //   //未登录
  //   //   response.data.msg = "登录信息已失效，请重新登录";
  //   //   MessageBox.alert('登录信息已失效，请重新登录', {
  //   //       confirmButtonText: '确定',
  //   //       callback: action => {
  //   //           console.log(action)
  //   //       }
  //   //   })
  //   // //   road.$message.error(response.data.msg);
  //   //   routerIndex.push('/login');
  //   // }
  //   // if (parseInt(response.data.code) === -1) {
  //   // //   road.$message.error("请求失败");
  //   //     MessageBox.alert('请求失败', {
  //   //         confirmButtonText: '确定',
  //   //         callback: action => {
  //   //             console.log(action)
  //   //         }
  //   //     })
  //   // }
  // }
  // return response;
  if (response.status === 200) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(response);
  }
}, function (error) {
  console.log(error)
  if (error.response.status) {
    switch (error.response.status) {
      // 401 token过期
      // 登录过期对用户进行提示
      // 清除本地token和清空vuex中token对象
      // 跳转登录页面
      case 401:
        MessageBox.alert('身份验证失败，请重新登录...', {
          confirmButtonText: '确定',
          callback: () => {
            store.state.token = '';
            cookie.delete('Authorization');
            routerIndex.push('/login');
          }
        })
        break;
      // 404请求不存在
      case 404:
       Message({
          showClose: true,
          message: '您访问的地址不存在...',
          type: 'error'
        });
        break;
      // 其他错误，直接抛出错误提示
      default:
        MessageBox.alert(error.data, {
          confirmButtonText: '确定',
          callback: () => {
            store.state.token = '';
            cookie.delete('Authorization');
            routerIndex.push('/login');
          }
        })
    }
    
  } else {
    MessageBox.alert('连接服务器失败，请稍后再试...', {
      confirmButtonText: '确定',
      callback: () => {
        store.state.token = '';
        cookie.delete('Authorization');
        routerIndex.push('/login');
      }
    })
  }
  return Promise.reject(error);
})

//基地址
let base = Env.baseURL;

//测试使用
export const ISDEV = Env.isDev;

//通用方法
export const POST = (url, params) => {
  // const getTimestamp = new Date().getTime();
  return axios.post(`${base}${url}`, params).then(res => res.data)
}

export const GET = (url, params) => {
  return axios.get(`${base}${url}`, {params: params}).then(res => res.data)
}

export const PUT = (url, params) => {
  return axios.put(`${base}${url}`, params).then(res => res.data)
}

export const DELETE = (url, params) => {
  return axios.delete(`${base}${url}`, {params: params}).then(res => res.data)
}

export const PATCH = (url, params) => {
  return axios.patch(`${base}${url}`, params).then(res => res.data)
}