<template>
    <div class="hearder-search">
        <el-select style="width:100px" v-model="value" clearable placeholder="请选择" size="mini" @change="changeItem">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            size="mini">
            </el-option>
        </el-select>
        <div class="input" v-if="!type">
            <el-input size="mini" style="width:200px" v-model="searchValue" placeholder="请输入内容"></el-input>
        </div>
        <div class="dateTime" v-else-if="type === 'dateTime'">
            <el-date-picker
                size="mini"
                v-model="dateTime"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                align="right"
                @change="changeDateTime">
            </el-date-picker>
        </div>
        <div class="num" v-else-if="type === 'range'">
            <div class="range-num">
                <el-input size="mini" style="width:100px" v-model="range1" placeholder="请输入内容"></el-input> 至
                <el-input size="mini" style="width:100px" v-model="range2" placeholder="请输入内容"></el-input>
            </div>
        </div>
        <el-button @click="search" style="margin-left:10px" type="primary" icon="el-icon-search" size="mini">搜索</el-button>
    </div>
</template>

<script>
export default {
    name: 'HeaderSearch',
    props: {
        options: {
            type: Array
        }
    },
    data() {
        return {
            searchValue: '',
            value: '',
            dateTime: '',
            type: '',
            range1: '',
            range2: ''
        }
    },
    computed: {
    },
    methods: {
        changeItem(item) {
            const type = this.options.find(val => val.value === item);
            this.type = type.type;
        },
        changeDateTime(item) {
            console.log(item)
        },
        search() {
            if (!this.value) {
                this.$message({
                    message: '请输入搜索类型',
                    type: 'warning'
                });
            } else {
                this.$emit('search', {
                    type: this.value,
                    value: this.searchValue
                });
            }
        }
    }
}
</script>

<style lang='scss'>
.hearder-search {
    display: flex;
    .el-select {
        .el-input__inner {
            // border-right: none;
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        }
    }
    .input {
        .el-input__inner {
            border-left: none;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
        }
    }
    .dateTime {
        .el-input__inner {
            border-left: none;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
        }
    }
    .num {
        .range-num {
            box-sizing: content-box;
            border: 1px solid #DCDFE6;
            border-left: none;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
            background: #fff;
            .el-input__inner {
                border: none;
            }
        }
    }
    
}
</style>