<template>
  <div class="people-container">
    <span class="people">当前驻留人次: {{ currentStay }}</span>
    <span class="people">今日客流总量: {{ todayFlow }}</span>
    <span class="people">客流上限:</span>
    <span class="people flow-limit" @click="dialogVisible = true">{{ flowLimit }}</span>
    <bshz-dialog :visible.sync="dialogVisible">
      <span slot="title">设置客流上限</span>
      <form action="" @submit.prevent="submitEntrySize">
        客流上限:
        <input v-model="flowLimit" type="text">
      </form>
      <span slot="footer">
        <button class="cancel" @click="dialogVisible = false">
          取消
        </button>
        <button class="confirm" @click="submitEntrySize">确定</button>
      </span>
    </bshz-dialog>
  </div>
</template>

<script>
import {server} from "../../../config";

export default {
  name: "People",
  props: {
    todayFlow: Number
  },
  data() {
    return {
      currentStay: -1,
      flowLimit: '',
      dialogVisible: false
    }
  },
  mounted() {
    this.getEntrySize();
  },
  methods: {
    submitEntrySize() {
      this.axios.get(server().http.setEntrySize, {params: {entrySize: this.flowLimit}})
          .then(res => {
            console.log(res);
            this.dialogVisible = false;
            this.getEntrySize().then(() => {
              this.$message.success('客流上限已经成功被设置为' + this.flowLimit);
            })
          })
          .catch(e => {
            console.error(e.message);
            this.$message.error('客流上限设置失败');
          })
    },
    getEntrySize() {
      return this.axios.get(server().http.getEntrySize)
          .then(res => {
            const data = res.data;
            this.flowLimit = data['entrySize']
          })
          .catch(e => {
            console.error(e.message)
          })
    }
  }
}
</script>

<style lang="scss" scoped>
.people-container {
  color: #ffffff;
  font-size: 20px;
  padding: 0 1rem;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  .people {
    display: inline-block;
    margin: 0 0.25rem;
  }

  .flow-limit {
    background: #fff;
    height: 1.875rem;
    line-height: 1.875rem;
    width: 2.5rem;
    border-radius: 2px;
    border: 1px solid #dcdfe6;
    color: #606266;
    padding: 4px 16px;
    cursor: pointer;
    transition: 0.1s;
    text-align: center;

    &:hover {
      color: #409eff;
      border-color: #c6e2ff;
      background: #ecf5ff;
    }

    &:active {
      color: #3a8ee6;
      border-color: #3a8ee6;
      outline: none;
    }
  }

  form {
    display: inline-block;

    input {
      height: 32px;
      width: 100px;
      padding: 4px 12px;
      box-sizing: border-box;
      font-size: 1rem;
    }
  }
}
</style>