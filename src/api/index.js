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
import { MessageBox } from 'element-ui'

let token = '';

axios.defaults.withCredentials = false;
axios.defaults.headers.common['token'] = token;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';//配置请求头

//添加一个请求拦截器
axios.interceptors.request.use(function (config) {
  let user = JSON.parse(window.sessionStorage.getItem('access-user'));
  if (user) {
    token = user.token;
  }
  config.headers.common['token'] = token;
  //console.dir(config);
  return config;
}, function (error) {
  // Do something with request error
  console.info("error: ");
  console.info(error);
  return Promise.reject(error);
});

// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
  if (response.data && response.data.code) {
    if (parseInt(response.data.code) === 108 || parseInt(response.data.code) === 109 || response.data.msg === 'TOKEN失效，请重新登录' || response.data.msg === 'TOKEN不存在') {
      //未登录
      response.data.msg = "登录信息已失效，请重新登录";
      MessageBox.alert('登录信息已失效，请重新登录', {
          confirmButtonText: '确定',
          callback: action => {
              console.log(action)
          }
      })
    //   road.$message.error(response.data.msg);
      routerIndex.push('/login');
    }
    if (parseInt(response.data.code) === -1) {
    //   road.$message.error("请求失败");
        MessageBox.alert('请求失败', {
            confirmButtonText: '确定',
            callback: action => {
                console.log(action)
            }
        })
    }
  }
  return response;
}, function (error) {
  // Do something with response error
  console.dir(error);
//   road.$message.error("服务器连接失败");
    MessageBox.alert('服务器连接失败', {
        confirmButtonText: '确定',
        callback: action => {
            console.log(action)
        }
    })
  return Promise.reject(error);
})

//基地址
let base = Env.baseURL;

//测试使用
export const ISDEV = Env.isDev;

//通用方法
export const POST = (url, params) => {
  const getTimestamp = new Date().getTime();
  return axios.post(`${base}${url}?timer=${getTimestamp}`, params).then(res => res.data)
}

export const GET = (url, params) => {
  const getTimestamp = new Date().getTime();
  return axios.get(`${base}${url}?timer=${getTimestamp}`, {params: params}).then(res => res.data)
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