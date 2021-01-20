import Vue from 'vue';
import Main from "@/components/common/Message/src/main.vue";

const MessageConstructor = Vue.extend(Main);

let instance;
let instances = [];
let seed = 1;

const Message = (options) => {
  options = options || {};
  if (typeof options === 'string') {
    options = {
      message: options
    };
  }
  let id = 'message_' + seed++;
  options.onClose = function () {
    Message.close(id);
  }
  instance = new MessageConstructor({
    data: options
  });
  instance.id = id;
  let verticalOffset = options.offset || 20;
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16;
  });
  instance.verticalOffset = verticalOffset;
  instance.visible = true;
  instance.$mount();
  document.body.appendChild(instance.$el);
  instances.push(instance);
  return instance;
}

['success', 'warning', 'info', 'error'].forEach(type => {
  Message[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options
      };
    }
    options.type = type;
    return Message(options);
  };
});

Message.close = function (id) {
  let len = instances.length;
  let index = -1;
  let removedHeight;
  for (let i = 0; i < len; i++) {
    if (id === instances[i].id) {
      removedHeight = instances[i].$el.offsetHeight;
      index = i;
      instances.splice(i, 1);
      break;
    }
  }
  if (len <= 1 || index === -1 || index > instances.length - 1) return;
  for (let i = index; i < len - 1; i++) {
    let dom = instances[i].$el;
    dom.style['top'] = parseInt(dom.style['top'], 10) - removedHeight - 16 + 'px';
  }
}

export default Message;
