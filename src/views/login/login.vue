<!--
 * @Author: your name
 * @Date: 2020-10-23 16:58:34
 * @LastEditTime: 2020-10-23 17:29:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \backstageManage\src\views\login\login.vue
-->
<template>
  <div class="login">
      <div class="mask"></div>
  </div>
</template>

<script>
export default {
    name: 'Login'
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
}
.mask {
    width: 100%;
    height: 100%;
    background: inherit;   
    filter: blur(50px);   
    filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=4, MakeShadow=false);
}
</style>