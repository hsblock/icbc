<template>
  <div class="people-container">
    <span class="people">当前驻留人次: {{ currentStay }}</span>
    <span class="people">今日客流总量: {{ todayFlow }}</span>
    <span class="people">客流上限:</span>
    <form action="" @submit.prevent="submitEntrySize">
      <input v-model="flowLimit" type="text">
    </form>
  </div>
</template>

<script>
import {server} from "../../../config";

export default {
  name: "People",
  data() {
    return {
      currentStay: '无',
      todayFlow: '无',
      flowLimit: ''
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
            this.$message.success('客流上限已经成功被设置为' + this.flowLimit);
          })
          .catch(e => {
            console.log(e);
            this.$message.error('客流上限设置失败');
          })
    },
    getEntrySize() {
      this.axios.get(server().http.getEntrySize)
          .then(res => {
            const data = res.data;
            this.flowLimit = data['entrySize']
          })
          .catch(e => {
            console.log(e)
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

  form {
    display: inline-block;

    input {
      height: 32px;
      padding: 4px 8px;
      box-sizing: border-box;
      width: 100px;
      font-size: 1rem;
    }
  }
}
</style>