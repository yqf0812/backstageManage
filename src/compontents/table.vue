<template>
    <div class="curstom-vue">
        <div style="display:flex;justify-content: space-between;align-items: center;">
            <div class="btn-group-box">
                <div v-if="buttons.length">
                    <span class="btn-span" v-for="btn in buttons" :key="btn" >
                        <el-button @click="add1" v-if="btn === 'add'" class="group-btn" type="primary" size="mini">增加</el-button>
                        <el-button @click="del1" v-if="btn === 'del'" class="group-btn" type="primary" size="mini">删除</el-button>
                        <el-button @click="frozen1" v-if="btn === 'frozen'" class="group-btn" type="primary" size="mini">冻结</el-button>
                        <el-button @click="thaw1" v-if="btn === 'thaw'" class="group-btn" type="primary" size="mini">解冻</el-button>
                        <el-button @click="export1" v-if="btn === 'export'" class="group-btn" type="primary" size="mini">导出</el-button>
                    </span>
                </div>
                <div class="solt-btn">
                    <slot name="button"></slot>
                </div>
            </div>
            <header-search @search="search" :options="searchItem"></header-search>
        </div>
        
        <el-table 
            class="vue-table"
            :data="tableData"
            :border="border"
            :stripe="stripe"
            @row-contextmenu="rightClick"
            @selection-change="selectChange">
            <el-table-column
                v-if="select"
                type="selection"
                width="55"
                fixed="left">
            </el-table-column>
            <el-table-column
                v-if="index"
                type="index"
                label="序号"
                width="55"
                :index="index">
            </el-table-column>
            <template v-for="(column, index) in columns">
                <!-- <slot  v-if="column.slot"  :name="column.slot"></slot> -->
                <el-table-column v-if="column.slot"
                    :key="'index-'+index"
                    :label="column.label"
                    :width="column.width"
                    :sortable="column.sort"
                    :fixed="column.fixed">
                    <template slot-scope="scope">
                        <slot :row="scope.row" :name="column.slot">{{scope.row.title}}</slot>
                    </template>
                </el-table-column>
                <el-table-column v-else-if="column.code !== 'operation'"
                    :key=index
                    :prop="column.code"
                    :label="column.label"
                    :width="column.width"
                    :sortable="column.sort"
                    :fixed="column.fixed">
                </el-table-column>
                <el-table-column v-else-if="column.code === 'operation'"
                    :key=index
                    :prop="column.code"
                    :label="column.label"
                    :width="column.width"
                    :fixed="column.fixed">
                    <template slot-scope="scope">
                        <template slot-scope="scope" v-if="column.slot">
                            <slot :row="scope" :name="column.slot">{{scope}}</slot>
                        </template>
                        <el-dropdown trigger="click">
                            <span class="el-dropdown-link">
                                操作<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="handlerEdit(scope)">编辑</el-dropdown-item>
                                <el-dropdown-item @click.native="handlerDelete(scope)">删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>
            </template>
            <template slot="empty">
                <div>
                    <img src="./../assets/images/noData.png" alt="" srcset="">
                </div>
            </template>
        </el-table>
        <div id="menu" ref="rightMenu">
            <div class="menu" v-for="item in menus" :key="item" @click.stop="infoClick(item)">{{item.label}}</div>
        </div>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[2, 10, 20, 50]"
            layout="total, sizes, prev, pager, next"
            :total="total">
        </el-pagination>
    </div>
</template>

<script>
import HearderSearch from './headerSearch'
import * as API from './../api/index'

export default {
    name: 'Table',
    props: {
        columns: {
            type: Array,
            default: () => {
                return []
            }
        }, 
        border: {
            type: Boolean,
            default: true
        },
        tableData: {
            type: Array,
            default: () => {
                return []
            }
        },
        buttons: {
            type: Array,
            default: () => {
                return []
            }
        },
        select: {
            type: Boolean,
            default: true
        },
        index: {
            type: Boolean,
            default: true
        },
        stripe: {
            type: Boolean,
            default: true
        },
        menus: {
            type: Array,
            default: () => {
                return [{
                    code: 'edit',
                    label: '编辑'
                }, {
                    code: 'del',
                    label: '删除'
                }]
            }
        },
        searchItem: {
            type: Array
        },
        requireUrl: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            currentRowIndex : 0,
            showMenu: false,
            rowData: {},
            activeName: '1',
            tableParams: {
                limit: 1,
                offset: 10
            },
            total: 0,
            selectData: []
        }
    },
    created() {
        
    },
    components: {
        'header-search': HearderSearch
    },
    mounted() {
        document.addEventListener('click', () => {
            const menu = document.querySelector("#menu");
            menu.style.display = 'none';
        })
        this.getData();
    },
    methods: {
        // 查询数据
        getData() {
            API.GET(this.requireUrl, this.tableParams).then(res => {
                this.tableData = res.data;
                this.total = res.total;
            })
        },
        selectChange(val) {
            this.selectData = val;
        },
        search(item) {
            alert(22);
            console.log(item)
        },
        handlerEdit(item) {
            console.log(item);
            console.log('edit');
        },
        handlerDelete(item) {
            console.log(item);
            console.log('delete');
        },
        add1() {
            this.$emit('add-row');
        },
        del1() {
            this.$emit('del-row', this.selectData);
        },
        frozen1() {
            this.$emit('frozen-row');
        },
        thaw1() {
            this.$emit('thaw-row');
        },
        export1() {
            this.$emit('export-row');
        },
        // 自定义菜单的点击事件
        infoClick(item) {
            this.$emit('menuClick', {item, row: this.rowData});
        },
        // table的右键点击当前行事件
        rightClick(row, column, event) {
            const menu = document.querySelector("#menu");
            event.preventDefault();
            //获取我们自定义的右键菜单
            // 根据事件对象中鼠标点击的位置，进行定位
            menu.style.left = event.clientX + 'px';
            menu.style.top = event.clientY + 'px';
            // 改变自定义菜单的隐藏与显示
            menu.style.display = 'block';
            this.rowData = row;
        },
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.tableParams.offset = val;
            this.getData();
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.tableParams.limit = val;
            this.getData();
        }
    }
}
</script>

<style lang='scss'>
.curstom-vue {
    height: 100%;
    display: flex;
    flex-direction: column;
    .btn-group-box {
        display: flex;
        .solt-btn .el-button:nth-child(n+2){
            margin-left: 0.1rem;
        }
    }
    .btn-span:nth-child(n+2) {
        margin-left: 0.1rem;
    }
    .btn-span:last-child {
        margin-right: 0.1rem;
    }
    .vue-table {
        margin-top: 0.1rem;
    }
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
    #menu { 
        border-radius: 5px;
        overflow: hidden; /*隐藏溢出的元素*/
        box-shadow: 0 1px 1px #888, 1px 0 1px #ccc;
        position: absolute; 
        display: none;
        background: #ffffff;
        z-index: 10;
        padding-bottom: 10px;
        background: #ccc;
    }
    .menu {
        width: 125px;
        height: 25px;
        line-height: 25px;
        text-indent: 10px;
        cursor: pointer;
    }
    .menu:hover {
        color: deeppink;
        text-decoration: underline;
    }
    .is-scrolling-none {
        height: 100%;
    }

}
</style>