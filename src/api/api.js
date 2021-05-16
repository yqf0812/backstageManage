/*
 * @Author: your name
 * @Date: 2020-10-23 16:56:35
 * @LastEditTime: 2020-10-23 16:57:09
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \backstageManage\src\api\api.js
 */
import * as API from './index'

export default {
  // 获取验证码
  getCaptcha: () => {
    return API.GET('api/email') 
  },
  //密码登录
  login: params => {
    return API.POST('api/login', params)
  },
  //游客登录touristLogin
  touristLogin: params => {
    return API.POST('api/touristLogin', params)
  },
  //退出登录
  logout: () => {
    return API.POST('api/logout')
  },
  // 添加视频
  addVideo: params => {
    return API.POST('back/addVideo', params)
  },
  //删除视频
  delVideo: params => {
    return API.POST('back/delVideo', params)
  },
  //删修改视频
  updateVideo: params => {
    return API.POST('back/updateVideo', params)
  },
  //上传视频
  upload: () => {
    return API.POST('api/upload')
  }
}