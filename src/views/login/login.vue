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
        <div class="box">
            <div class="inner-box">
                <span class="title" title="Sign In to your Collection">登录</span>
                <div class="login-input">
                    <el-form :model="ruleForm"   :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
                        <el-form-item prop="account">
                            <div class="account-box">
                                <!-- <label>账号</label> -->
                                <el-input class="el-input__style" v-model="ruleForm.account" name="user" placeholder="请输入账号" size="mini"></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item prop="password">
                            <div class="password-box">
                                <!-- <label>密码</label> -->
                                <el-input size="mini" type="password" class="el-input__style" v-model="ruleForm.password" name="password" placeholder="请输入密码"></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item prop="captcha">
                            <div class="captcha-box">
                                <!-- <label>验证码</label> -->
                                <el-input size="mini" type="text" class="el-input__style" v-model="ruleForm.captcha" name="captcha" placeholder="请输入验证码"></el-input>
                                <el-button size="mini" class="login-btn" @click="handlerCaptcha()" :disabled="captchaDisable" type="primary">{{captchaTxt}}</el-button>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="login-btn" :loading="loginFlag" @click="login('ruleForm')" type="primary">登录</el-button>
                            <span class="tourist" @click="touristLogin">游客登录</span>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
                
        </div>
        <!-- <div class="login-box">
            <div class="input-box">
                <el-input class="el-input__style" v-model="user" name="user" placeholder="请输入账号"></el-input>
                <el-input class="el-input__style" v-model="passowrd" name="password" placeholder="请输入密码"></el-input>
            </div>
            <el-button class="login-btn" type="primary">登录</el-button>
        </div> -->
        <!-- <el-input v-model="input" placeholder="请输入内容"></el-input> -->
    </div>
</template>

<script>
import api from './../../api/api'
import { mapMutations } from 'vuex'
// import axios from 'axios'
export default {
    name: 'Login',
    data() {
         const validateAcount = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入账号!'));
            } else {
                callback();
            }
        };
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码!'));
            } else {
                callback();
            }
        };
        const validateCaptcha = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入验证码!'));
            } else {
                callback();
            }
        };
        return {
            captchaTxt: '获取验证码',
            ruleForm: {
                account: '',
                password: '',
                captcha: ''
            },
            rules: {
                account: [
                    { validator: validateAcount, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                captcha: [
                    { validator: validateCaptcha, trigger: 'blur' }
                ]
            },
            loginFlag: false,
            loginError: false,
            errorMsg: '',
            timeStart: 30,
            timeStep: -1,
            captchaDisable: false
        }
    },
    methods: {
        ...mapMutations(['setToken']),
        handlerCaptcha() {
            api.getCaptcha().then(res => {
                if (res.code === 0) {
                    let timer = null;
                    timer = setInterval(() => {
                        this.timeStart += this.timeStep ;
                        if (this.timeStart === 0) {
                            this.captchaTxt = '获取验证码';
                            this.captchaDisable = false;
                            clearInterval(timer);
                        } else {
                            this.captchaTxt = `${this.timeStart}s后重新获取`;
                            this.captchaDisable = true;
                        }
                    }, 1000)
                }
            })
        },
        // 游客登录
        touristLogin() {
            const ip = sessionStorage.getItem('ip');
            const params = {
                ip: ip
            }
            api.touristLogin(params).then((res) => {
                if (res.code === 1) {
                    this.$message({
                        showClose: true,
                        message: res.message,
                        type: 'error'
                    });
                } else {
                    this.setToken(res.token);
                    this.$router.push('/index');
                }
            })
        },

        login(formName) {
            let param = {
                account: this.ruleForm.account,
                password: this.ruleForm.password,
                captcha: this.ruleForm.captcha
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    api.login(param)
                    .then(res => {
                        if (res.code === 1) {
                            this.$message({
                                showClose: true,
                                message: res.message,
                                type: 'error'
                            });
                        } else {
                            this.setToken(res.token);
                            this.$router.push({path: '/index'});
                        }
                    })
                } else {
                    return false;
                }
            });
            
            // axios.post({
            //     method: 'post',
            //     url: 'http://127.0.0.1:3000/back/login',
            //     data:param
            // }).then(res => {
            //     console.log(res)
            // })
        }
    }
}
</script>

<style lang='scss'>
.login {
    height: 100%;
    background-image: url('./../../assets/images/bg121.jpg');
    background-size: 100% 100%;
    background-repeat: no-repeat;   
    background-attachment: fixed;   
    overflow: hidden; 
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    .box {
    width: 35%;
    height: 45%;
    margin-left: 93px;
    background-image: url('./../../assets/images/loginbg.jpg');
    background-size: 100% 100%;
    box-shadow: 2px 2px 15px rgb(56, 55, 55);
    display: flex;
    flex-direction: column;
    align-items: center;
    .inner-box {
        width: 60%;
        height: 100%;
        overflow: hidden;
        padding-top: 0.5rem;
        .error {
            margin-top: 0.1rem;
            border: 1px solid #f36148;
            padding: 0.05rem;
            background: #fefcee;
            .el-icon-warning {
                color: #f36148;
            }
        }
        .title {
            font-size: 0.25rem;
            font-weight: 600;
            color: #8d6f3d;
        }
        .login-input {
            width: 100%;
            display: flex;
            flex-direction: column;
            margin-top: 0.5rem;
            .el-form-item__content {
                margin-left: 0 !important;
            }
            .account-box {
                color: #CCC;
                width: 100%;
            }
            .password-box {
                color: #CCC;
                width: 100%;
            }
            .captcha-box {
                color: #CCC;
                width: 100%;
                display: flex;
                align-items: flex-end;
                justify-content: space-between;
                .el-input__style {
                    width: 60%;
                }
            }
        }
        .login-btn {
            margin-top: 0.3rem;
            width: 30%;
            background-color: #8d6f3d;
            border-color: #8d6f3d;
        }
        .tourist {
            cursor: pointer;
            margin-left: 0.2rem;
            color: #8d6f3d;
        }
        .el-input.is-active .el-input__inner, .el-input__inner:focus {
            border-color: #f36148;
        }
    }
}
}

.input-box {
    margin-top: -0.2rem;
    margin-bottom: 0.2rem;
}
.el-input__style {

    .el-input__inner {
        padding-left: 0px;
        border: 0px;
        border-radius: 0px;
        border-bottom: 1px solid #ccc;
        background-color: transparent;
        color: #8d6f3d;
    }
} 
.login /deep/ .el-input__inner::placeholder {
    color: #fff;
}
</style>