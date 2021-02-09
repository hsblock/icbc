<template>
  <div class="secure-area-container">
    <button class="reset" @click="shotBackground">
      重置背景按钮
    </button>
    <h2>安防区域</h2>
    <div class="secure-area-wrapper">
      <div v-if="danger.length > 0" class="danger">
        <h4>危险物品</h4>
        <div class="danger-wrapper">
          <div v-for="item in danger" :key="item.name" class="danger-item">
            <img :src="item.img" alt="">
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>
      <div v-if="lost.length > 0" class="lost">
        <h4>遗留物品</h4>
        <div v-for="item in lost" :key="item.name" class="lost-item">
          <div>
            <img :src="item.img" alt="">
            <span>{{ item.name }}</span>
          </div>
          <div>
            <div class="time">
              <span>遗留时间</span>
              <span>{{ item.time }}分钟</span>
            </div>
            <div class="time">
              <span>遗留时间上限</span>
              <span>{{ item.timeLimit }}分钟</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {server} from "../../../config";
import google from '@/assets/img/g.png'

export default {
  name: "SecureArea",
  data() {
    return {
      danger: [{
        img: google,
        name: '斧头'
      }],
      lost: [{
        img: google,
        name: '手机',
        time: '无',
        timeLimit: '无'
      }],
      wsAbnormal: null,
      wsLeftover: null
    }
  },
  beforeDestroy() {
    this.wsAbnormal && this.wsAbnormal.close(1000, 'abnormal destroy');
    this.wsLeftover && this.wsLeftover.close(1000, 'leftover close');
  },
  created() {
    this.openWebSocket();
  },
  methods: {
    openWebSocket() {
      this.openAbnormal();
    },
    openAbnormal() {
      this.wsAbnormal = new WebSocket(server().ws.abnormal);
      this.wsAbnormal.onopen = () => console.log("abnormal open")
      this.wsAbnormal.onmessage = (e) => {
        const data = JSON.parse(e.data);
        console.log(data);
        this.danger[0].name = data['name'];
        this.danger[0].img = `data:image/png;base64,${data['img']}`
      }
      this.wsAbnormal.onerror = (error) => console.log(error)
      this.wsAbnormal.onclose = () => console.log("abnormal close")
    },
    openLeftover() {
      this.wsLeftover = new WebSocket(server().ws.leftover);
      this.wsLeftover.onopen = () => console.log("leftover open")
      this.wsLeftover.onmessage = (e) => {
        const data = JSON.parse(e.data);
        console.log(data);
        this.lost[0].name = data['name'];
        this.lost[0].img = `data:image/png;base64,${data['img']}`
      }
      this.wsLeftover.onerror = (error) => console.log(error)
      this.wsLeftover.onclose = () => console.log("leftover close")
    },
    shotBackground() {
      this.axios.get(server().http.backgroundShot)
          .then(res => {
            console.log(res);
            this.$message.success('背景图片拍摄成功');
          })
          .catch(e => {
            console.log(e);
            this.$message.error('背景图片拍摄失败');
          })
    }
  }
}
</script>

<style lang="scss" scoped>
.secure-area-container {
  background: #061123;
  border-radius: 5px;
  margin: 0 0.5rem 0.5rem;
  height: 39%;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  position: relative;

  .reset {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0.5rem;
    padding: 0.5rem;
    border-radius: 5px;
  }

  .secure-area-wrapper {
    display: flex;
    margin: 0.5rem 2rem;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;

    .danger, .lost {
      display: flex;
      align-items: center;
      background: #eeeeee;
      padding: 5px;
      border-radius: 10px;
      color: black;
      height: calc(50% - 0.5rem - 10px);

      h4 {
        margin: 0;
        width: 20px;
        line-height: 20px;
      }
    }

    .danger-wrapper {
      display: flex;
      justify-content: center;
      flex: 1;

      .danger-item {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        width: 80px;
        height: 80px;
        margin: 0 10px;

        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }
    }

    .lost-item {
      display: flex;
      height: 80px;

      > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        margin: 0 10px;

        &:last-child {
          margin-left: 0;
        }

        .time > span:first-child {

          &:first-child {
            width: 100px;
            display: inline-block;
            text-align: center;
          }

          &:last-child {
            display: inline-block;
            width: 60px;
            text-align: center;
            background: #4BC0C0;
            padding: 0.2rem;
          }
        }
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>