import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './config/resize.js'
import './config/css-reset.css'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.config.productionTip = false
Vue.use(Mint)
console.log(router)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
