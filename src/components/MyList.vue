<template>
    <div class="todo-main">
        <MyItem
            v-for="(todo, index) in CurrentPageData"
            :key="todo.id"
            :todo="todo"
            :index="index + StartIndex"
        />
    </div>
</template>

<script>
import MyItem from '@/components/MyItem'

export default {
    name: 'MyList',
    components: { MyItem },
    props: ['todos'],
    data() {
        return {
            CurrentPageData: [],
            StartIndex: 0,
        }
    },
    methods: {},
    computed: {},
    mounted() {
        this.$bus.$on('getCurrentPageData', (currentPageData, startIndex) => {
            this.CurrentPageData = currentPageData
            this.StartIndex = startIndex
        })
    },
    beforeDestroy() {
        this.$bus.$off('getCurrentPageData')
    },
}
</script>

<style scoped lang="less">
/*main*/
.todo-main {
    margin-left: 0px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding: 0px;
    margin-bottom: 20px;
}

.todo-empty {
    height: 40px;
    line-height: 40px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding-left: 5px;
    margin-top: 10px;
}
</style>
