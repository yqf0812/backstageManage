/*
 * @Author: your name
 * @Date: 2020-10-23 16:56:35
 * @LastEditTime: 2020-10-23 16:57:09
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \backstageManage\src\api\api.js
 */
import * as API from './'

export default {
  //验证手机号是否已注册
  isExistUser: params => {
    return API.GET('login/isExistUser', params);
  },
  //注册
  register: params => {
    return API.POST('login/userRegister', params)
  },
  //密码登录
  login: params => {
    return API.POST('login/userLogin', params)
  }
}