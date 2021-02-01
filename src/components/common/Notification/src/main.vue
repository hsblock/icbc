<template>
  <transition name="notification-fade">
    <div
        v-show="visible"
        :style="positionStyle"
        :class="['notification', horizontalClass]"
    >
      <div class="notification-content">
        <h2 class="notification-title">{{ title }}</h2>
        <div v-show="message" class="notification-message">
          <p v-html="message"></p>
        </div>
        <svg
            v-if="showClose"
            class="iconfont notification-close"
            aria-hidden="true"
            @click.stop="close"
        >
          <use xlink:href="#icon-close"></use>
        </svg>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      message: '',
      visible: false,
      showClose: true,
      closed: false,
      onClose: null,
      verticalOffset: 0,
      position: 'top-right'
    };
  },
  computed: {
    horizontalClass() {
      return this.position.indexOf('right') > -1 ? 'right' : 'left';
    },
    verticalProperty() {
      return /^top/.test(this.position) ? 'top' : 'bottom';
    },
    positionStyle() {
      return {
        [this.verticalProperty]: `${this.verticalOffset}px`
      };
    }
  },
  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false;
        this.$el.addEventListener('transitionend', this.destroyElement);
      }
    }
  },
  methods: {
    destroyElement() {
      this.$el.removeEventListener('transitionend', this.destroyElement);
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
    close() {
      this.closed = true;
      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.notification {
  display: flex;
  width: 330px;
  padding: 14px 26px 14px 13px;
  border-radius: 8px;
  box-sizing: border-box;
  border: 1px solid #EBEEF5;
  position: fixed;
  background-color: #F56C6C;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: opacity 0.3s, transform 0.3s, left 0.3s, right 0.3s, top 0.4s, bottom 0.3s;
  overflow: hidden;
  
  &.right {
    right: 16px;
  }
  
  &.left {
    left: 16px;
  }
  
  .notification-content {
    margin-left: 13px;
    margin-right: 8px;
    
    .notification-title {
      font-weight: bold;
      font-size: 16px;
      color: #101111;
      margin: 0;
    }
    
    .notification-message {
      font-size: 14px;
      line-height: 21px;
      margin: 6px 0 0;
      //color: #606266;
      color: #202122;
      text-align: justify;
      
      p {
        margin: 0;
      }
    }
    
    .notification-close {
      position: absolute;
      top: 18px;
      right: 15px;
      cursor: pointer;
      //color: #909399;
      font-size: 16px;
      
      &:hover {
        color: #444444;
      }
    }
  }
}

.notification-fade-enter {
  &.right {
    right: 0;
    transform: translateX(100%);
  }

  &.left {
    left: 0;
    transform: translateX(-100%);
  }
}

.notification-fade-leave-active {
  opacity: 0;
}
</style>