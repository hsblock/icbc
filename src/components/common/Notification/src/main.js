import Vue from 'vue'
import Main from './main.vue'

const NotificationConstructor = Vue.extend(Main)

let instance;
let instances = [];
let seed = 1;

const Notification = function(options) {
  options = options || {};
  if (typeof options === 'string') {
    options = {
      title: options
    };
  }
  const id = 'notification_' + seed++;
  const position = options.position || 'top-right';

  options.onClose = function() {
    Notification.close(id);
  };

  instance = new NotificationConstructor({
    data: options
  });

  instance.id = id;
  instance.$mount();
  document.body.appendChild(instance.$el);
  instance.visible = true;
  instance.dom = instance.$el;
  instance.dom.style.zIndex = seed + "";

  let verticalOffset = options.offset || 0;
  instances.filter(item => item.position === position).forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16;
  });
  verticalOffset += 16;
  instance.verticalOffset = verticalOffset;
  instances.push(instance);
  return instance;
}

Notification.close = function(id) {
  let index = -1;
  const len = instances.length;
  const instance = instances.filter((instance, i) => {
    if (instance.id === id) {
      index = i;
      return true;
    }
    return false;
  })[0];
  if (!instance) return;

  instances.splice(index, 1);
  if (len <= 1) return;

  const position = instance.position;
  const removedHeight = instance.dom.offsetHeight;
  for (let i = index; i < len - 1; i++) {
    if (instances[i].position === position) {
      instances[i].dom.style[instance.verticalProperty] =
          parseInt(instances[i].dom.style[instance.verticalProperty], 10) - removedHeight -16 +'px';
    }
  }
};

export default Notification;
