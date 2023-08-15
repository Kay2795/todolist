<template>
    <div class="todo-header">
        <el-input
            placeholder="请输入待办事项，点击右侧加号或按回车键确认"
            v-model="newTodo"
            class="input-with-select"
            @keyup.enter.native="add"
            maxlength="50"
            show-word-limit
        >
            <el-button
                slot="append"
                icon="el-icon-circle-plus-outline"
                @click="add"
            ></el-button>
        </el-input>
    </div>
</template>

<script>
import { nanoid } from 'nanoid'
export default {
    name: 'MyHeader',
    props: [],
    data() {
        return {
            newTodo: '',
        }
    },
    methods: {
        add() {
            if (!this.newTodo.trim()) {
                this.newTodo = ''
                this.$message({
                    type: 'error',
                    message: '待办事项不能为空！',
                })
                return
            }
            const newTodoObj = {
                id: nanoid(),
                title: this.newTodo,
                done: false,
            }
            this.$emit('addTodo', newTodoObj)
            this.newTodo = ''
        },
    },
}
</script>

<style scoped lang="less">
.todo-header {
    margin-bottom: 20px;
}

.el-input ::v-deep {
    input:focus {
        outline: none;
        border-color: rgba(82, 168, 236, 0.8);
        box-shadow: 0 0 8px rgba(82, 168, 236, 0.6);
        transition: 0.1s 0s linear all;
    }
}
</style>
