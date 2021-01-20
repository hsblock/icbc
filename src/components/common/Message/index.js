import Message from "@/components/common/Message/src/main";

export default {
  install(Vue) {
    Vue.prototype.$message = Message;
  }
};
