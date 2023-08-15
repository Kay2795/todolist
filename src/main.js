import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入element.js
import './element/element.js'

Vue.config.productionTip = false
Vue.prototype.$bus =

  new Vue({
    // 在Vm中配置router实例对象
    router,
    store,
    render: h => h(App),
    beforeCreate() {
      Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
    },
  }).$mount('#app')
