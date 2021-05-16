<!--
 * @Author: your name
 * @Date: 2020-12-04 09:14:08
 * @LastEditTime: 2020-12-04 11:24:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \backstageManage\src\views\container\index.vue
-->
<template>
    <div class="container">
        <div class="box">
            <el-container>
                <el-aside width="250px">
                    <div class="logo">
                        <i class="logo-text"></i>
                    </div>
                    <div class="menu">
                        <el-menu :default-active="activeRoute"
                                :router="true"
                                class="el-menu-vertical-demo">
                            <e-menu :menuList="menuList"></e-menu>
                        </el-menu>
                    </div>
                    <div class="logout">
                        <i title="退出登录" @click="logOut"></i>
                    </div>
                </el-aside>
                <el-main>
                    <!-- <transition
                    leave-active-class="fadeOutDown"
                    > -->
                        <router-view class="animate__animated"></router-view>
                        <!-- <h1 v-show="visible" class="animate__animated">Animate.css</h1> -->
                    <!-- </transition> -->
                    
                </el-main>
            </el-container>
        </div>
    </div>
</template>

<script>
import Emenu from './../../compontents/Emenu'
import api from './../../api/api'
import { mapMutations } from 'vuex'
export default {
    name: 'container',
    components: {
        'e-menu': Emenu
    },
    data() {
        return {
            activeRoute: '/index',
            menuList:[
                {
                    id: 'index',
                    name: '首页',
                    route: '/index'
                },
                {
                    id: 'video',
                    name: '视频',
                    route: '/video'
                },
                {
                    id: 'news',
                    name: '新闻',
                    route: '/news'
                },
                {
                    id: 'actor',
                    name: '演员',
                    route: '/actor'
                },
                {
                    id: 'book',
                    name: '书籍',
                    route: '/book'
                }
            ]
        }
    },
    methods: {
        ...mapMutations(['logout']),
        logOut() {
            api.logout().then(res => {
                if (res.code === 0) {
                    this.logout();
                    this.$router.push('/login');
                }
            })
        }
    }
}
</script>

<style lang='scss'>
.container {
    background: url('./../../assets/images/bg.png') no-repeat;
    height: 100%;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    .box {
        width: 95%;
        height: 90%;
        border-radius: 0.1rem; 
        .el-container {
            height: 100%;
            border-radius: 0.1rem;
        }
        .el-aside {
            box-shadow: 0px 0px 20px #ccc;
            height: 100% ;
            color: #333;
            border-radius: 10px;
            background: #f4f7fd;
            display: flex;
            flex-direction: column;
            background: url('./../../assets/images/asideBg.jpg');
            background-size: 100% 100%;
            .logo {
                width: 100%;
                height: 1rem;
                display: flex;
                justify-content: center;
                align-items: center;
                i {
                    display: inline-block;
                    background: url('./../../assets/images/deyunshelogo.png');
                    width: 0.8rem;
                    height: 0.8rem;
                    background-size: 100% 100%;
                }
            }
            .menu {
                flex: 1;
                .el-menu {
                    background: none;
                    border: none;
                }
                // .el-menu {
                //     width: 60%;
                //     background: none;
                //     border: none;
                //     text-align: center;
                //     .el-menu-item {
                //         margin-top: 0.1rem;
                //         border-radius: 6px;
                //         border: 1px solid #000;
                //     }
                //     .el-menu-item, .el-submenu__title {
                //         height: 0.4rem;
                //         line-height: 0.4rem;
                //     }
                // }
            }
            .logout {
                width: 100%;
                height: 0.5rem;
                display: flex;
                justify-content: center;
                align-items: center;
                i {
                    display: inline-block;
                    width: 0.28rem;
                    height: 0.28rem;
                    background: url('./../../assets/images/logout.png');
                    background-size: 100% 100%;
                    cursor: pointer;
                }
            }
        }
        .el-main {
            box-shadow: 0px 0px 20px #000;
            color: #333;
            border-radius: 0.1rem;
            margin-left: 0.15rem;
            background: #f4f7fd;
        }
    }
}
</style>