<template>
  <transition
      name="message-fade"
      appear
      @after-leave="handleAfterLeave"
  >
    <div
        v-show="visible"
        :class="['message', type ? `message-${type}` : '']"
        :style="positionStyle"
        @mouseenter="clearTimer"
        @mouseleave="startTimer"
    >
      <svg class="iconfont" aria-hidden="true">
        <use :xlink:href="'#icon-' + type"></use>
      </svg>
      <span class="message-text">{{ message }}</span>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      visible: true,
      message: '这是一条消息提示',
      duration: 3000,
      type: 'info',
      verticalOffset: 20,
      closed: false,
      timer: null
    }
  },
  computed: {
    positionStyle() {
      return {
        'top': `${this.verticalOffset}px`
      };
    }
  },
  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false;
      }
    }
  },
  mounted() {
    this.startTimer();
  },
  methods: {
    handleAfterLeave() {
      this.$destroy();
      this.$el.parentNode.removeChild(this.$el);
    },
    close() {
      this.closed = true;
      if (typeof this.onClose === 'function') {
        this.onClose(this);
      }
    },
    clearTimer() {
      clearTimeout(this.timer);
    },
    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close();
          }
        }, this.duration);
      }
    }
  }
}
</script>

<style lang="scss">
.message {
  position: fixed;
  min-width: 400px;
  border-radius: 4px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  background: #EDF2FC;
  transition: opacity 0.3s, transform 0.4s, top 0.4s;
  overflow: hidden;
  color: #909399;
  padding: 0.75rem 1rem;
  font-size: 14px;
  z-index: 10000;

  &.message-success {
    color: #67c23a;
    background: #f0f9eb;
  }

  &.message-info {
    color: #E6A23C;
    background: #FDF6EC;
  }

  &.message-error {
    color: #F56C6C;
    background: #FEF0F0;
  }

  svg {
    width: 20px;
    height: 20px;
    display: inline-block;
    padding-right: 0.25rem;
  }
}

.message-fade-enter, .message-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -100%);
}
</style>