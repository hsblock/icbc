<template>
  <div class="path-set-container">
    <div v-for="url in urls" :key="url.name" class="url">
      <div class="url-name">{{ url.name }}</div>
      <div class="url-value">
        <input v-model="url.value" type="text">
      </div>
    </div>
    <el-button type="success" @click="setPath">确定</el-button>
  </div>
</template>

<script>
import {server} from "../../../config";

export default {
  name: "PathSet",
  data() {
    return {
      urls: [
        {name: '进店', path: 'urlFace', value: ''},
        {name: '排队', path: 'urlDangerous', value: ''},
        {name: '危险物品', path: 'urlLeftover', value: ''},
        {name: '遗留物品', path: 'urlStanding', value: ''},
        {name: '离岗检测', path: 'urlOffline', value: ''}
      ]
    }
  },
  methods: {
    setPath() {
      console.log(this.urls)
      const urls = this.urls.filter(item => item.value !== '');
      if (urls.length === 0) {
        this.$message.info('请设置视频源');
        return;
      }
      console.log(urls.length);
      const path = {};
      urls.forEach(item => {
        path[item.path] = item.value;
      })
      console.log(path)
      this.axios.post(server().http.urlHandle, path)
          .then(res => {
            this.$message.success('视频源设置成功');
          })
          .catch(e => {
            this.$message.error('视频源设置失败');
          })
    }
  }
}
</script>

<style lang="scss" scoped>
.path-set-container {
  height: calc(100vh - 48px);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .url {
    margin-bottom: 1rem;

    .url-name {
      float: left;
      width: 80px;
      text-align: right;
      color: white;
      font-size: 1rem;
      line-height: 40px;
      padding-right: 12px;
      box-sizing: border-box;
    }

    .url-value {
      margin-left: 80px;
      line-height: 40px;

      input {
        -webkit-appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        height: 40px;
        line-height: 40px;
        outline: none;
        padding: 0 15px;
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        width: 100%;
      }
    }
  }
}
</style>