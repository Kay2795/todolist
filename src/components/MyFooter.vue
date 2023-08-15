<template>
    <div class="todo-footer">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1, 3, 5, 10]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="todos.length"
            pager-count:5
            background
        >
        </el-pagination>
    </div>
</template>

<script>
export default {
    name: 'MyFooter',
    props: ['todos'],
    data() {
        return {
            currentPage: 1,
            pageSize: 3,
        }
    },

    methods: {
        handleCurrentChange(val) {
            this.currentPage = val
            /*   this.$bus.$emit(
                'getCurrentPageData',
                this.currentPageData,
                this.startIndex
            ) */
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.currentPage = 1 // 切换每页显示数量时重置当前页数为1
            /*   this.$bus.$emit(
                'getCurrentPageData',
                this.currentPageData,
                this.startIndex
            ) */
        },
    },
    computed: {
        startIndex() {
            return (this.currentPage - 1) * this.pageSize
        },
        currentPageData() {
            const endIndex = this.startIndex + this.pageSize
            return this.todos.slice(this.startIndex, endIndex)
        },
    },
    mounted() {
        this.$bus.$on('handleDeleteLast', () => {
            this.currentPage = this.currentPage - 1
        })
        this.$bus.$emit(
            'getCurrentPageData',
            this.currentPageData,
            this.startIndex
        )
    },
    watch: {
        startIndex: {
            deep: true,
            handler() {
                this.$bus.$emit(
                    'getCurrentPageData',
                    this.currentPageData,
                    this.startIndex
                )
            },
        },

        currentPageData: {
            deep: true,
            handler() {
                this.$bus.$emit(
                    'getCurrentPageData',
                    this.currentPageData,
                    this.startIndex
                )
            },
        },
        currentPage: {
            deep: true,
            handler() {
                this.$bus.$emit('getCurrentPage', this.currentPage)
            },
        },
        pageSize: {
            deep: true,
            handler() {
                this.$bus.$emit('getPageSize', this.pageSize)
            },
        },
    },
}
</script>

<style scoped lang="less">
/*footer*/
.todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 15px;
}

.todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
}

.todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
}

.todo-footer button {
    float: right;
    margin-top: 5px;
}
</style>
