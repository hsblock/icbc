import Vue from 'vue'
import axios from "axios";
import VueAxios from "vue-axios";

import App from './App.vue'
import router from './router'
import "./assets/global.css"
import './assets/js/iconfont'

Vue.config.productionTip = false

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.use(VueAxios, axios)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
