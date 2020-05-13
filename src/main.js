import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from './components/common/toast/index'

Vue.config.productionTip = false
//添加时间总线对象
Vue.prototype.$bus = new Vue()
//安装Toast插件
Vue.use(toast)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
