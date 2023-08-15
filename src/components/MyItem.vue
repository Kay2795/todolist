<template>
    <div>
        <el-checkbox :value="todo.done" @change="handlechange">
            <div class="titleWrapper">
                <span v-show="!inputVisible"> {{ todo.title }}</span>
                <input
                    v-show="inputVisible"
                    :value="todo.title"
                    type="text"
                    ref="editInput"
                    @blur="handleBlur"
                    @keyup.enter="handleEnter"
                />
            </div>

            <div class="btnWrapper">
                <el-button
                    class="delButton"
                    type="primary"
                    @click="handleEdit"
                    v-show="!inputVisible"
                    >编辑</el-button
                >
                <el-button class="delButton" type="danger" @click="handleDelete"
                    >删除</el-button
                >
            </div>
        </el-checkbox>
    </div>
</template>

<script>
export default {
    name: 'MyItem',
    // 声明接收
    props: ['todo', 'index'],
    data() {
        return {
            inputVisible: false,
        }
    },
    mounted() {},

    methods: {
        handlechange(val) {
            this.$bus.$emit('swichTodo', this.index, val)
        },
        handleEdit() {
            this.inputVisible = true
            this.$nextTick(() => {
                this.$refs.editInput.focus()
            })
        },
        handleBlur() {
            this.inputVisible = false

            if (this.$refs.editInput.value.trim() === '') {
                return this.$message({
                    type: 'error',
                    message: '输入不能为空',
                })
            }

            this.$bus.$emit(
                'updateTodo',
                this.index,
                this.$refs.editInput.value
            )
        },
        handleEnter() {
            this.$refs.editInput.blur()
        },
        handleDelete() {
            this.$bus.$emit('deleteTodo', this.index)
        }
    },
}
</script>

<style scoped lang="less">
.el-checkbox {
    padding: 0 10px;
    height: 40px;
    line-height: 30px;
    display: block;
    border-bottom: 1px solid #dddddd;
    margin-right: 0;
    display: flex;
    align-items: center;
}
.el-checkbox:not(:last-child) {
    border-bottom: 1px solid #dddddd;
}
.el-checkbox:hover {
    background-color: #f5f7fa;
}
::v-deep .el-checkbox__label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 1000px;
}
::v-deep .btnWrapper {
    display: none;
}
::v-deep .btnWrapper button {
    font-size: 10px;
    padding: 8px 15px;
}

.el-checkbox:hover ::v-deep .btnWrapper {
    display: block;
}

.titleWrapper ::v-deep input {
    height: 25px;
    border: 0.5px solid #409eff;
    border-radius: 5px;
    padding: 0px 10px;
    width: 800px;
    outline: none;
}
</style>
