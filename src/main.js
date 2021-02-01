import Vue from 'vue'
import axios from "axios";
import VueAxios from "vue-axios";

import Message from "@/components/common/Message";
import Notification from "@/components/common/Notification";

import App from './App.vue'
import router from './router'
import "./assets/global.css"
import './assets/js/iconfont'

Vue.config.productionTip = false;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.use(VueAxios, axios);

Vue.use(Message);
Vue.use(Notification)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
