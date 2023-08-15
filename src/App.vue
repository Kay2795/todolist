<template>
    <div id="app">
        <!-- 卡片视图区 -->
        <el-card class="box-card">
            <MyHeader @addTodo="addTodo" />
            <MyList :todos="todos" />
            <div class="btn-container" v-show="todos.length">
                <el-tag class="doneTag" type="success">
                    <el-checkbox class="allCheck" v-model="isAll">
                    </el-checkbox>
                    已完成项目 : {{ doneTotal }}</el-tag
                >

                <el-button type="danger" @click="clearDone"
                    >清空已完成待办事项
                </el-button>
            </div>
            <MyFooter :todos="todos" v-show="todos.length"></MyFooter>
        </el-card>
    </div>
</template>

<script>
import MyHeader from '@/components/MyHeader'
import MyList from '@/components/MyList'
import MyFooter from '@/components/MyFooter'
import { nanoid } from 'nanoid'

export default {
    name: 'App',
    components: { MyHeader, MyList, MyFooter },

    data() {
        return {
            todos: JSON.parse(localStorage.getItem('todos')) || [],
            currentPage: 1,
            pageSize: 3,
        }
    },
    methods: {
        // 非第一页删除、清除最后一项时，使currentPage-1
        beforeCrashLast() {
            if (
                this.currentPage > 1 &&
                (this.todos.length - 1) % this.pageSize === 0
            ) {
                this.$bus.$emit('handleDeleteLast')
            }
        },

        // 添加一个todo
        addTodo(newTodoObj) {
            this.todos.unshift(newTodoObj)
        },
        // 改变某个tode的done值
        swichTodo(index, val) {
            this.todos[index].done = val
        },
        // 删除某个tode
        deleteTodo(index) {
            this.$confirm('此操作将永久删除该todo项, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!',
                    })
                    this.beforeCrashLast()
                    this.todos.splice(index, 1)
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除',
                    })
                })
        },
        clearDone() {
            this.$confirm('此操作将清除所有已完成todo项, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!',
                    })
                    this.beforeCrashLast()
                    this.todos = this.todos.filter((item) => {
                        return item.done === false
                    })
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除',
                    })
                })
        },
    },
    computed: {
        doneTotal() {
            return this.todos.reduce((pre, cur) => pre + (cur.done ? 1 : 0), 0)
        },
        isAll: {
            get() {
                return (
                    this.doneTotal === this.todos.length && this.doneTotal > 0
                )
            },
            set(val) {
                this.todos.forEach((item) => {
                    item.done = val
                })
            },
        },
    },
    mounted() {
        this.$bus.$on('swichTodo', this.swichTodo)
        this.$bus.$on('deleteTodo', this.deleteTodo)
        this.$bus.$on('getCurrentPage', (currentPage) => {
            this.currentPage = currentPage
        })
        this.$bus.$on('getPageSize', (pageSize) => {
            this.pageSize = pageSize
        })
    },
    beforeDestroy() {
        this.$bus.$off([
            'swichTodo',
            'deleteTodo',
            'getCurrentPage',
            'getPageSize',
        ])
    },
    watch: {
        todos: {
            deep: true,
            handler(newVal) {
                localStorage.setItem('todos', JSON.stringify(newVal))
            },
        },
    },
}
</script>

<style lang="less" >
//导入全局样式表
@import '@/assets/css/global.css';

div .box-card {
    border-radius: 10px;
    width: 1000px;
    position: absolute;
    /* 居中方法2 */
    // top: 50%;
    left: 50%;

    /* 居中方法2.1 */
    transform: translate(-50%, 100px);
}
.btn-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.btn-container .doneTag {
    font-size: 15px;
    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
        'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
div .doneTag .allCheck {
    margin-right: 10px;
}
</style>
  