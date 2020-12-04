<!--
 * @Author: your name
 * @Date: 2020-10-23 16:58:34
 * @LastEditTime: 2020-12-03 17:45:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \backstageManage\src\views\login\login.vue
-->
<template>
  <div class="login">
      <div class="mask"></div>
      <div class="login-box">
          <div class="input-box">
            <el-input class="el-input__style" v-model="user" name="user" placeholder="请输入账号"></el-input>
            <el-input class="el-input__style" v-model="passowrd" name="password" placeholder="请输入密码"></el-input>
          </div>
          <el-button class="login-btn" type="primary">登录</el-button>
      </div>
      <!-- <el-input v-model="input" placeholder="请输入内容"></el-input> -->
  </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            user: '',
            passowrd: ''
        }
    }
}
</script>

<style>
.login {
    height: 100%;
    background-image: url('./../../assets/images/background.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;   
    background-attachment: fixed;   
    overflow: hidden; 
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}
.mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 19.2rem;
    height: 10.8rem;
    background: inherit;   
    filter: blur(50px);   
    filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=4, MakeShadow=false);
}
.login-box {
    height: 50%;
    width: 50%;
    border-radius: 0.1rem;
    z-index: 999;
    margin-top: -1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.input-box {
    margin-top: -0.2rem;
    width: 30%;
    margin-bottom: 0.2rem;
}
.login-btn {
    width: 30%;
}
.input-box .el-input__inner {
    margin-top: 0.2rem;
    background-color: transparent;
    color: #000;
}
.login /deep/ .el-input__inner::placeholder {
    color: #fff;
}
</style>