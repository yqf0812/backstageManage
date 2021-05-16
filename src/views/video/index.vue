<template>
    <div class="video" ref="a">
        <cu-table 
            ref="videoTable"
            :columns="columns"
            :buttons="buttons"
            :searchItem="searchItem"
            @add-row="handlerAdd"
            @del-row="handlerDel"
            @menuClick="menuClick"
            :requireUrl="requireUrl">
            <!-- <template slot="button">
                <el-button class="group-btn" type="primary" size="mini">xxx</el-button>
                <el-button class="group-btn" type="primary" size="mini">xxx</el-button>
            </template> -->
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
        <!-- 添加视频 -->
        <el-dialog
            title="增加"
            :visible.sync="addVideoVisible"
            :close-on-click-modal="closeModal"
            width="30%"
            :before-close="handleClose">
             <el-dialog
                width="30%"
                title="播放测试"
                :visible.sync="playTestVisible"
                :before-close="pauseVideo"
                append-to-body>
                <video controls="controls" style="width:100%" height="300" id="video" :src="videoruleForm.url"></video>
            </el-dialog>
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
        <!-- 编辑 -->
        <el-dialog
            title="编辑"
            :visible.sync="updateVideoVisible"
            :close-on-click-modal="closeModal"
            width="30%"
            :before-close="handleClose">
             <el-dialog
                width="30%"
                title="播放测试"
                :visible.sync="playTestVisible"
                :before-close="pauseVideo"
                append-to-body>
                <video controls="controls" style="width:100%" height="300" id="video" :src="videoruleForm.url"></video>
            </el-dialog>
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
                <el-form-item label="播放地址" prop="url">
                    <!-- <div class="url-box">
                        <el-input style="width: 80%" v-model="videoruleForm.url
                        "></el-input>
                        <i title="播放测试" @click="playTest" class="play-video"></i>
                    </div> -->
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelAddVideo('videoruleForm')">取 消</el-button>
                <el-button type="primary" @click="updateVideoOk('videoruleForm')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import Table from './../../compontents/table'
import upload from './../../compontents/upload'
import api from './../../api/api'
export default {
    name: 'videoIndex',
    components: {
        'cu-table': Table,
        'cu-upload': upload
    },
    data() {
        const validateTitle = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入标题'));
            } else if (value.length > 16) {
                callback(new Error('不能超过16个字符'));
            } else {
                callback();
            }
        };
        return {
            videoFlag: false,
            //是否显示进度条
            videoUploadPercent: "",
            //进度条的进度，
            isShowUploadVideo: false,
            //显示上传按钮
            videoForm: {
                showVideoPath: ''
            },
            requireUrl: 'api/videoList',
            addVideoVisible: false,
            updateVideoVisible: false,
            playTestVisible: false,
            closeModal: false,
            columns: [
                {
                    code: 'title',
                    label: '标题',
                    slot: 'title'
                },
                {
                    code: 'createTime',
                    label: '创建时间',
                    sort: true,
                    width: 200
                },
                {
                    code: 'auth',
                    label: '创建人'
                },
                {
                    code: 'updateTime',
                    label: '修改时间',
                    width: 200
                },
                {
                    code: 'url',
                    label: '播放地址',
                    width: 300
                },
                {
                    code: 'likeNum',
                    label: '点赞数',
                    sort: true
                },
                {
                    code: 'commentNum',
                    label: '评论数',
                    sort: true
                },
                {
                    code: 'shareNum',
                    label: '分享数',
                    sort: true
                },
                {
                    code: 'playNums',
                    label: '播放量',
                    sort: true
                },
                {
                    code: 'status',
                    label: '状态',
                },
                {
                    code: 'operation',
                    label: '操作',
                    fixed: 'right',
                    slot: 'opt'
                }
            ],
            select: true,
            searchItem: [{
                    value: 'title',
                    label: '标题'
                }, {
                    value: 'createUser',
                    label: '创建人'
                }, {
                    value: 'createTime',
                    label: '创建时间',
                    type: 'dateTime'
                }, {
                    value: 'likeNum',
                    label: '点赞数',
                    type: 'range'
            }],
            buttons: ['add', 'del', 'frozen', 'thaw'],
            videoruleForm: {
                vid: '',
                title: '',
                createTime: '',
                auth: '管理员',
                url: ''
            },
            rules: {
                title: [
                    {required: true, validator: validateTitle, trigger: 'blur' }
                ],
                url: [
                    {required: true, message: '请输入视频url', trigger: 'blur' }
                ]
            },
            tip: '支持MP4、ogg、flv、avi、wmv、rmvb、mov格式的文件，且文件大小不能超过50MB'
        }
    },
    created() {
        
    },
    computed: {
    },
    mounted() {
        
    },
    methods: {
        //上传前回调
        beforeUploadVideo(file) {
            var fileSize = file.size / 1024 / 1024 < 50;
            if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb', 'video/mov'].indexOf(file.type) == -1) {
                // layer.msg("请上传正确的视频格式");
                this.$message({
                    message: '请上传正确的视频格式',
                    type: 'warning'
                });
                return false;
            }
            if (!fileSize) {
                // layer.msg("视频大小不能超过50MB");
                this.$message({
                    message: '视频大小不能超过50MB',
                    type: 'warning'
                });
                return false;
            }
            this.isShowUploadVideo = false;
        },
        //进度条
        uploadVideoProcess(event, file) {
            this.videoFlag = true;
            console.log(file)
            console.log(String(file.percentage))
            this.videoUploadPercent = String(file.percentage);
        },
        handlerEdit(item) {
            this.videoruleForm = item.row;
            this.updateVideoVisible = true;
        },
        updateVideoOk(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    api.updateVideo(this.videoruleForm).then(res => {
                        if (res.code === 0) {
                            this.$message({
                                message: res.message,
                                type: 'success'
                            });
                            this.$refs.videoTable.getData();
                            this.updateVideoVisible = false;
                        } else {
                            this.$message({
                                message: res.message,
                                type: 'error'
                            });
                        }
                    })
                    
                } else {
                    return false;
                }
            });
        },
        handlerDelete(item) {
            let vid = [];
            vid.push(item.row.vid)
            const params = {
                vids: vid
            }
            api.delVideo(params).then(res => {
               if (res.code === 0) {
                    this.addVideoVisible = false;
                    this.$message({
                        message: res.message,
                        type: 'success'
                    });
                    this.$refs.videoTable.getData();
                } else {
                    this.$message({
                        message: res.message,
                        type: 'error'
                    });
                }
            })
        },
        handlerDel(rows) {
            const vid = rows.map(val => val.vid)
            const params = {
                vids: vid
            }
            api.delVideo(params).then(res => {
               if (res.code === 0) {
                    this.addVideoVisible = false;
                    this.$message({
                        message: res.message,
                        type: 'success'
                    });
                    this.$refs.videoTable.getData();
                } else {
                    this.$message({
                        message: res.message,
                        type: 'error'
                    });
                }
            })
        },
        handlerAdd() {
            this.addVideoVisible = true;
             this.videoruleForm.title = '';
            this.videoruleForm.createTime = this.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
            let a = this.getRanNum();
            this.videoruleForm.vid = this.$moment(new Date()).format('YYYYMMDDHHmmss') + a;
        },
        menuClick(item) {
            if (item.item.code === 'del') {
                this.handlerDelete(item);
            } else if (item.item.code === 'edit') {
                // this.updateVideoVisible = true;
                this.handlerEdit(item);
            }
        },
        playTest() {
            this.playTestVisible = true;
        },
        pauseVideo(done) {
            const myVideo = document.getElementById("video");
            myVideo.pause();
            done();
        },
        addVideoOk(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    api.addVideo(this.videoruleForm).then(res => {
                        if (res.code === 0) {
                            this.$message({
                                message: res.message,
                                type: 'success'
                            });
                            this.$refs.videoTable.getData();
                            this.cancelAddVideo('videoruleForm');
                        } else {
                            this.$message({
                                message: res.message,
                                type: 'error'
                            });
                        }
                    })
                    
                } else {
                    return false;
                }
            });
        },
        cancelAddVideo(formName) {
            this.$refs[formName].resetFields();
            this.addVideoVisible = false;
        },
        // 获取四个随机字母
        getRanNum(){
            let result = [];
            for(let i = 0; i < 4; i++){
            const ranNum = Math.ceil(Math.random() * 25); //生成一个0到25的数字
                //大写字母'A'的ASCII是65,A~Z的ASCII码就是65 + 0~25;然后调用String.fromCharCode()传入ASCII值返回相应的字符并push进数组里
                result.push(String.fromCharCode(65+ranNum));
            }
            return  result.join('');
        }
    }
}
</script>

<style lang='scss'>
    .video {
        height: 100%;
        .url-box {
            display: flex;
            align-items: center;
            .play-video {
                display: inline-block;
                width: 0.24rem;
                height: 0.24rem;
                background: url('./../../assets/images/play.png');
                background-size: 100% 100%;
                margin-left: 0.3rem;
                cursor: pointer;
            }
        }
    }
</style>