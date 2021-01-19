<template>
  <div class="face-detection-container">
    <h2>访客人脸识别</h2>
    <transition-group name="faces" tag="p">
      <div
          v-for="(item, index) in infos"
          :key="index"
          class="face-detection-item"
      >
        <img :src="item.img" alt="" class="face">
        <div>
          {{ item.gender }} {{ item.age }}
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { server } from "../../../config";

export default {
  name: "FaceDetection",
  data() {
    return {
      infos: [],
      ws: null
    }
  },
  mounted() {
    this.openWebSocket();
  },
  beforeDestroy() {
    this.ws && this.ws.close(1000, 'face attr destroy')
  },
  methods: {
    openWebSocket() {
      this.ws = new WebSocket(server().ws.faceAttr);
      this.ws.onopen = () => console.log("face attr open");
      this.ws.onmessage = (e) => {
        let data = JSON.parse(e.data)['infos'];
        console.log(data)
        this.infos.splice(0, this.infos.length);
        // this.infos.splice(this.infos.length, 0, {
        //   img: "data:image/png;base64," + data['img'],
        //   gender: data['gender'],
        //   age: data['age']
        // })
        data.forEach((item) => {
          this.infos.splice(this.infos.length, 0, {
            img: "data:image/png;base64," + item['img'],
            gender: item['gender'],
            age: item['age']
          })
        })
      }
      this.ws.onerror = (error) => console.log(error)
      this.ws.onclose = () => console.log("face attr close")
    }
  }
}
</script>

<style scoped>
.face-detection-container {
  text-align: center;
  color: #ffffff;
  margin: 0 0.5rem 0.5rem 0;
  background: #061123;
  border-radius: 5px;
  flex: 1;
}

.face-detection-item {
  display: inline-block;
  margin: 0 10px;
  transition: all 0.5s;
}

.face-detection-item .face {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.face-enter, .face-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.face-leave-active {
  position: absolute;
}
</style>