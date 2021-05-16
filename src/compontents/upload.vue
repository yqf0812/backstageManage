<template>
    <div class="upload">
        <el-upload
            class="upload-demo"
            :action="action"
            :name="name"
            :disabled="disabled"
            :data="otherParams"
            :before-upload="beforeUpload"
            :on-progress="onProgress"
            :on-success="handleSuccess"
            :file-list="fileList"
            >
            <slot name="button">
                <el-button size="small" type="primary">点击上传</el-button>
            </slot>
            <el-progress :type="progressType" v-if="loading" :percentage="percentage" class="progress"></el-progress>
            <div slot="tip" class="el-upload__tip">{{tip}}</div>
        </el-upload>
    </div>
</template>

<script>
export default {
    name: 'upload',
    props: {
        action: {
            required: true,
            type: String,
            default: 'http://127.0.0.1:3000/api/upload'
        },
        name: {
            type: String,
            default: 'file'
        },
        disabled:{
            type: Boolean,
            default: false
        },
        // 文件的大小限制,单位为MB
        sizeLimit: {
            type: Number,
            default: 50
        },
        otherParams: {
            type: Object,
            default() {
                return {}
            }
        },
        tip: {
            type: String,
            default: ''
        },
        progressType: {
            type: String,
            defalut: ''
        },
        customColor: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {
            loading: false,
            percentage: 0, //进度条初始值
            interval:0,//加载的定时器
            timeStop:0,//加载成功停止的定时器,
            fileList: []
        }
    },
    methods: {
        beforeUpload(file) {
            const limit = file.size / 1024 / 1024 < this.sizeLimit;
            if (!limit) {
                this.$message.error(`上传的文件小不能超过 ${this.sizeLimit}MB!`);
            }
            if (limit) {
                this.loading = true;
            }
            return limit;
        },
        //进度条
        onProgress() {
            let that = this;
            let endPro = 95;
            that.loading = true;
            that.interval = setInterval(function () {
            if (that.percentage < endPro) {
                that.percentage++;
            }
            },500)
        },
        handleSuccess(file) {
            const file1 = {
                name: '',
                url: ''
            }
            file1.name = file.fileName;
            file1.url = file.filePath;
            this.fileList.push(file1);
            //上传成功，给个加载100的效果
            let that = this;
            that.percentage = 100;
            clearInterval(that.interval);
            that.timeStop=setTimeout(() => {
                that.loading = false;
                that.percentage=0;
                clearTimeout(that.timeStop);
                //根据实际开发情况处理响应
                // if (true) {
                //     //文件上传成功，返回状态数据
                //     that.$emit('submitUploadParent',res);
                // } else {
                //     that.$message.error(res.message || '上传失败');
                // }
            }, 100);
        },
    }
}
</script>

<style>

</style>