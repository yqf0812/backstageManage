/*
 * @Author: your name
 * @Date: 2020-10-23 16:43:19
 * @LastEditTime: 2020-10-23 16:44:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \backstageManage\src\store\index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'
import cookie from "vue-cookie"
// import api from './../api/api'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: cookie.get('Authorization') ? cookie.get('Authorization') : '',
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            cookie.set('Authorization', token);
        },
        logout(state) {
            state.token = '';
            cookie.delete('Authorization');
        }
    },
    actions: {

    }
})