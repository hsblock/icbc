<template>
  <div class="person-select-container">
    <div>
      <el-select v-model="topic" placeholder="请选择主题" @change="handleTopicChange">
        <el-option
            v-for="item in topics"
            :key="item.label"
            :label="item.label"
            :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button class="upload-btn" type="success" @click="submitUpload">
        上传到服务器
      </el-button>
      <el-dialog :visible.sync="previewVisible">
        <img :src="'data:image/png;base64,' + (selected_img ? selected_img.img : '')" alt="">
      </el-dialog>
    </div>
    <el-tabs v-model="tab" type="border-card" @tab-click="handleTabClick">
      <el-tab-pane label="图片上传" name="uploadImage">
        <el-upload
            ref="upload"
            :class="['upload', uploadVisible ? '' : 'no-upload']"
            list-type="picture-card"
            :auto-upload="false"
            action="#"
            :on-change="handleChange"
            :show-file-list="true"
            :mulitple="false"
            :limit="1"
            :http-request="imageUpload"
        >
          <el-button class="plus-btn" icon="el-icon-plus" circle></el-button>
          <div slot="file" slot-scope="{file}" class="img-upload-container">
            <img
                class="el-upload-list__item-thumbnail"
                :src="file.url" alt=""
            >
            <span class="el-upload-list__item-actions">
              <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                  class="el-upload-list__item-delete"
                  @click="handleRemove"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
      </el-tab-pane>
      <el-tab-pane label="获取模板" name="getTemplates">
        <div class="img-templates">
          <div
              v-for="item in imgs"
              :key="item.img_id"
              class="img-template"
          >
            <img 
                :src="'data:image/png;base64,' + item.img"
                :title="new Date(parseInt(item.timestamp)).toLocaleString()"
                :alt="item.timestamp"
                @click="selectTemplate(item.img_id)"
            >
            <div v-show="selected_img && selected_img.img_id === item.img_id" class="selected-img">
              <svg class="iconfont" aria-hidden="true">
                <use xlink:href="#icon-success"></use>
              </svg>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {server} from "../../../config";

export default {
  name: "PersonSelect",
  data() {
    return {
      topic: 'manager',
      topics: [
        {label: '大堂经理', value: 'manager'},
        {label: '清洁工', value: 'cleaner'}
      ],
      uploadVisible: true,
      tab: 'uploadImage',
      imgs: [],
      selected_img: null,
      previewVisible: false
    }
  },
  computed: {},
  watch: {
    tab(newVal) {
      if (newVal.name === 'getTemplates') {
        this.selected_img = null;
        this.getCandidates();
      } else {
        this.$refs.upload.clearFiles();
        this.uploadVisible = true;
      }
    }
  },
  methods: {
    handlePictureCardPreview() {
      this.previewVisible = true;
    },
    handleTopicChange() {
      if (this.tab === 'getTemplates') {
        this.getCandidates();
      }
    },
    handleRemove(file) {
      let fileList = this.$refs.upload.uploadFiles;
      fileList.splice(fileList.indexOf(file), 1);
      this.uploadVisible = true;
    },
    handleChange() {
      let fileList = this.$refs.upload.uploadFiles;
      console.log(fileList)
      if (fileList.length > 0) {
        let file = fileList[0];
        if (file.size > 204800) {
          this.$message.error('图片超过200KB，上传失败');
          fileList.splice(0, fileList.length);
          return;
        }
        this.uploadVisible = false;
        let imgFile = new FileReader();
        imgFile.readAsDataURL(file.raw);
        new Promise((resolve) => {
          imgFile.onload = res => {
            resolve(res.target.result);
          }
        }).then(res => {
          res = res.split(',')[1];
          this.selected_img = {
            topic: this.topic,
            img_id: -1,
            img: res,
            timestamp: new Date().getTime()
          };
        })
      } else {
        this.selected_img = null
      }
    },
    checkTopic() {
      return new Promise((resolve, reject) => {
        if (this.topic) {
          resolve();
        } else {
          reject();
        }
      })
    },
    checkUpload() {
      return new Promise((resolve, reject) => {
        if (this.$refs.upload.uploadFiles.length > 0) {
          resolve();
        } else {
          reject();
        }
      })
    },
    submitUpload() {
      this.checkTopic().then(() => {
        if (this.tab === 'uploadImage') {
          this.checkUpload().then(() => {
            this.$refs.upload.submit();
          }).catch(() => {
            this.$message.error('请上传图片');
          })
        } else {
          if (this.selected_img) {
            this.submit();
          } else {
            this.$message.error('请选取模板图片')
          }
        }
      }).catch(() => {
        this.$message.error('请选择主题');
      })
    },
    imageUpload() {
      this.submit();
    },
    submit() {
      this.selected_img['flag'] = 'upload_pattern';
      this.axios.post(server().http.selectPattern, this.selected_img)
          .then(() => {
            this.$message.success('上传模板成功');
          })
          .catch(error => {
            console.error(error);
            this.$message.error('上传模板失败');
          })
    },
    getCandidates() {
      this.imgs = [];
      this.checkTopic().then(() => {
        this.axios.get(server().http.selectPattern, {params: {flag: 'get_candidates', topic: this.topic}})
            .then((res) => {
              const data = res.data;
              console.log(data);
              const {imgs, timestamps} = data;
              data['img_ids'].forEach((img_id, i) => {
                this.imgs.push({
                  img_id,
                  img: imgs[i],
                  timestamp: timestamps[i],
                  topic: this.topic
                });
              })
              this.$message.success('获取图片模板成功');
            })
            .catch(error => {
              console.error(error);
              this.$message.error('获取图片模板失败');
            })
      }).catch(() => {
        this.$message.error('请选择主题');
      })
    },
    handleTabClick(tab) {
      if (tab.name === 'getTemplates') {
        this.selected_img = null;
        this.getCandidates();
      }
    },
    selectTemplate(img_id) {
      this.selected_img = this.imgs.filter((item) => {
        return item.img_id === img_id;
      })[0];
    }
  }
}
</script>

<style lang="scss" scoped>
.person-select-container {
  height: calc(100vh - 48px);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .el-select {
    margin-right: 10px;
    margin-bottom: 10px;
  }

  /deep/ .el-dialog__body {
    display: flex;
    justify-content: center;

    img {
      width: 100%;
    }
  }

  .el-tabs {
    width: 800px;
    height: 400px;

    /deep/ .el-tabs__content {
      display: flex;
      width: 100%;
      height: 90%;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
    }

    .upload {
      display: flex;
      justify-content: center;
      align-items: center;

      &.no-upload /deep/ div.el-upload {
        display: none;
      }

      /deep/ .el-upload-list__item {
        width: 100px;
        height: auto;
      }
    }

    .img-upload-container {
      display: flex;
      align-items: center;
      height: 100%;

      img {
        width: 100%;
        height: auto;
      }
    }

    .img-templates {
      display: flex;
      flex-wrap: wrap;
      width: 640px;
      justify-content: space-around;
      align-items: center;
      font-size: 0;

      .img-template {
        position: relative;

        img {
          width: 50px;
        }

        .selected-img {
          position: absolute;
          background: rgba(0, 0, 0, 0.3);
          z-index: 10;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 2rem;
        }
      }
    }
  }
}
</style>