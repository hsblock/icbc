<template>
  <transition name="dialog">
    <div v-show="visible" class="dialog-wrapper">
      <div class="dialog">
        <div class="dialog-title">
          <slot name="title">
          </slot>
        </div>
        <div class="dialog-body">
          <slot></slot>
        </div>
        <div class="dialog-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BshzDialog',
  props: {
    visible: Boolean,
  },
  data() {
    return {
      title: '',
      closed,
    }
  },
  methods: {
    hide() {
      this.$emit('update:visible', false);
      this.closed = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-wrapper {
  z-index: 2000;
  margin: 0;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  background: rgba(0, 0, 0, 0.3);

  .dialog {
    width: 30%;
    position: relative;
    margin: 20vh auto 50px;
    background: #ffffff;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    box-sizing: border-box;

    .dialog-title {
      color: #303133;
      font-size: 18px;
      line-height: 24px;
      padding: 20px 20px 10px;
    }

    .dialog-body {
      padding: 20px 20px;
      color: #606266;
      font-size: 16px;
      word-break: break-all;
      text-align: center;
    }

    .dialog-footer {
      padding: 10px 20px 20px;
      text-align: right;
      box-sizing: border-box;

      & /deep/ button {
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        border: 1px solid #dcdfe6;
        color: #606266;
        text-align: center;
        box-sizing: border-box;
        margin: 0 10px 0 0;
        outline: none;
        transition: 0.1s;
        font-weight: 500;
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 4px;
        
        &.confirm {
          color: #ffffff;
          background: #409eff;
          border-color: #409eff;

          &:active {
            background: #3a8ee6;
            border-color: #3a8ee6;
            color: #ffffff;
          }

          &:focus, &:hover {
            background: #66b1ff;
            border-color: #66b1ff;
            color: #ffffff;
          }
        }
        
        &:last-child {
          margin-right: 0;
        }
        
        &:active {
          color: #3a8ee6;
          border-color: #3a8ee6;
          outline: none;
        }
        
        &:focus, &:hover {
          color: #409eff;
          border-color: #c6e2ff;
          background: #ecf5ff;
        }
      }
    }
  }
}
</style>