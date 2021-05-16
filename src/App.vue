<!--
 * @Author: your name
 * @Date: 2020-10-23 15:20:58
 * @LastEditTime: 2020-10-23 17:02:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \backstageManage\src\App.vue
-->
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  methods: {
  }
}
</script>

<style>
html {
  overflow: hidden;
}
html,
body {
  height: 100%;
  background-color: #f9fbff;
  padding: 0 !important;
  font-size: 14px;
}
textarea {
  font-family: inherit;
}
a {
  text-decoration: none;
  color: inherit;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
</style>
