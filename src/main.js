import Vue from 'vue'
import ElementUI from 'element-ui';
import rough from 'roughjs';
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import 'element-ui/lib/theme-chalk/index.css';



Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(rough)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
