<template>
  <div class="actor">
      <cu-table 
            ref="videoTable"
            :columns="columns"
            :buttons="buttons"
            :searchItem="searchItem"
            @add-row="handlerAdd"
            @del-row="handlerDel"
            @menuClick="menuClick"
            :requireUrl="requireUrl">
            <template v-slot:title=" { row }">
                <a href="#">{{row.title}}</a>
            </template>
            <template v-slot:opt="row">
                <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                        操作<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="handlerEdit(row)">编辑</el-dropdown-item>
                        <el-dropdown-item @click.native="handlerDelete(row)">删除</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </template>
      </cu-table>
      <!-- 新增演员 -->
      <el-dialog
            title="增加"
            :visible.sync="addVideoVisible"
            :close-on-click-modal="closeModal"
            width="30%"
            :before-close="handleClose">
            <el-form label-width="80px" :model="videoruleForm" :rules="rules" ref="videoruleForm">
                <el-form-item label="vid" v-show="false">
                    <el-input disabled v-model="videoruleForm.vid"></el-input>
                </el-form-item>
                <el-form-item label="标题" prop="title">
                    <el-input v-model="videoruleForm.title"></el-input>
                </el-form-item>
                <el-form-item label="创建时间">
                    <el-input disabled v-model="videoruleForm.createTime"></el-input>
                </el-form-item>
                <el-form-item label="创建人">
                    <el-input disabled v-model="videoruleForm.auth"></el-input>
                </el-form-item>
                <el-form-item label="视频" prop="url">
                    <!-- <div class="url-box">
                        <el-input style="width: 80%" v-model="videoruleForm.url
                        "></el-input>
                        <i title="播放测试" @click="playTest" class="play-video"></i>
                    </div> -->
                    <cu-upload :tip="tip"></cu-upload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelAddVideo('videoruleForm')">取 消</el-button>
                <el-button type="primary" @click="addVideoOk('videoruleForm')">确 定</el-button>
            </span>
        </el-dialog>
  </div>
</template>

<script>
import Table from './../../compontents/table'
export default {
    name: 'actor',
    components: {
        'cu-table': Table,
    },
    data() {
      return {
        requireUrl: 'api/actorList',
        columns: [
            {
                code: 'stagName',
                label: '艺名',
            },
            {
                code: 'originalName',
                label: '原名',
            },
            {
                code: 'introduction',
                label: '简介'
            },
            {
                code: 'photoAlbum',
                label: '图片集',
            },
            {
                code: 'cover',
                label: '封面',
            },
            {
                code: 'likeNum',
                label: '点赞数',
            },
            {
                code: 'shareNum',
                label: '分享数',
            },
            {
                code: 'works',
                label: '作品',
            },
            {
                code: 'relationship',
                label: '关系图谱',
            },
            {
                code: 'operation',
                label: '操作',
                fixed: 'right',
                slot: 'opt'
            }
        ],
        buttons: ['add', 'del', 'frozen', 'thaw'],
      }
    }
}
</script>

<style>

</style>