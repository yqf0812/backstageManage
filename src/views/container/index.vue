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

                </el-aside>
                <el-main></el-main>
            </el-container>
        </div>
    </div>
</template>

<script>
export default {
    name: 'container'
}
</script>

<style lang='scss'>
.container {
    background: url('./../../assets/images/cool-background.png') no-repeat;
    height: 100%;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    .box {
        width: 90%;
        height: 90%;
        border-radius: 0.1rem;
        background: rgba($color: #000000, $alpha: .1);
        .el-container {
            height: 100%;
            border-radius: 0.1rem;
        }
        .el-aside {
            height: 100% ;
            color: #333;
            background: rgba($color: #ffffff, $alpha: .7);
        }
        .el-main {
            color: #333;
            border-radius: 0.1rem;
        }
    }
}
</style>