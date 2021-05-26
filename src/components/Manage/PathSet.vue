<template>
  <div class="path-set-container">
    <div class="path-set-wrapper">
      <div v-for="url in urls" :key="url.name" class="url">
        <div class="url-name">{{ url.name }}</div>
        <div class="url-value">
          <input v-model="url.value" type="text">
        </div>
      </div>
      <el-button type="success" @click="setPath">确定</el-button>
    </div>
    <div class="tips">
      <h3>提示</h3>
      <p>
        设置视频源文件时，请设置绝对路径，如
        <code>
          /media/video/test.avi
        </code>
      </p>
    </div>
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
        {name: '排队', path: 'urlStanding', value: ''},
        {name: '危险物品', path: 'urlDangerous', value: ''},
        {name: '遗留物品', path: 'urlLeftover', value: ''},
        {name: '离岗检测', path: 'urlOffline', value: ''}
      ],
      pathToName: {
        urlFace: '进店',
        urlDangerous: '危险物品',
        urlLeftover: '遗留物品',
        urlStanding: '排队',
        urlOffline: '离岗检测'
      }
    }
  },
  methods: {
    setPath() {
      const urls = this.urls.filter(item => item.value !== '');
      if (urls.length === 0) {
        this.$message.info('请设置视频源');
        return;
      }
      const path = {};
      urls.forEach(item => {
        path[item.path] = item.value;
      })
      this.axios.post(server().http.urlHandle, path)
          .then(res => {
            const data = res.data;
            let msg = [];
            for (let key in data) {
              if (Object.prototype.hasOwnProperty.call(data, key)) {
                msg.push(`${this.pathToName[key]}: ${data[key]}`);
              }
            }
            this.$message.info(msg.join('<br />'));
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
  position: relative;

  .path-set-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;

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
          transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
          width: 100%;
        }
      }
    }
  }

  .tips {
    position: absolute;
    right: 16rem;
    background: #eeeeee;
    top: 40%;
    transform: translateY(-50%);
    padding: 1rem;
    width: 200px;
    border-radius: 5px;

    h3 {
      margin: 0 0 1rem 0;
    }

    p {
      margin: 0;
    }
  }
}
</style>