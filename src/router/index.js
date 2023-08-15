import Vue from 'vue'

// 从下载安装的vue包中引入VueRouter插件（VueRouter的本质是一个构造函数，vue-router内部有暴露VueRouter插件的语法）
import VueRouter from 'vue-router'
// 注册插件
Vue.use(VueRouter)

const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import(/* webpackChunkName: "xxx" */ '@/App')
  },


  // {
  // path: '/about',
  // name: 'about',

  // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

// 利用VueRouter构造函数创建一个路由实例router
const router = new VueRouter({
  // 传入配置对象，原本写法：routes：routes
  routes
})
// 默认暴露router
export default router
