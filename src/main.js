import Vue from 'vue'
import axios from "axios";
import VueAxios from "vue-axios";
import { Select, Option, Button, Upload, Tabs, TabPane, Dialog } from "element-ui";

import Message from "@/components/common/Message";
import Notification from "@/components/common/Notification";
import BshzDialog from "@/components/common/Dialog"

import App from './App.vue'
import router from './router'
import "./assets/css/global.css"
import './assets/js/iconfont'

Vue.config.productionTip = false;

axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
axios.withCredentials = true;
Vue.use(VueAxios, axios);

Vue.use(Message);
Vue.use(Notification);
Vue.component(BshzDialog.name, BshzDialog);

Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
Vue.component(Button.name, Button);
Vue.component(Upload.name, Upload);
Vue.component(Tabs.name, Tabs);
Vue.component(TabPane.name ,TabPane);
Vue.component(Dialog.name, Dialog);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
