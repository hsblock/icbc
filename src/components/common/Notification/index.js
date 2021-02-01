import Notification from "@/components/common/Notification/src/main";

export default {
  install(Vue) {
    Vue.prototype.$notify = Notification;
  }
};
