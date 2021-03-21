<template>
  <div class="face-detection-container">
    <h2>访客人脸识别</h2>
    <transition-group name="faces" tag="div" appear duration="500">
      <div
          v-for="item in infos"
          :key="item.key"
          class="face-detection-item"
      >
        <img :src="item.img" alt="" class="face">
        <div>
          <div>性别: {{ item.gender }}</div>
          <div>年龄: {{ item.age }}</div>
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
      key: 0,
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
        let data = JSON.parse(e.data);
        console.log(data)
        if (this.infos.length >= 5) {
          this.infos.splice(0, this.infos.length - 4);
        }
        this.infos.push({
          img: "data:image/png;base64," + data['img'],
          gender: data['gender'],
          age: data['age'],
          key: ++this.key
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
  overflow: hidden;
}

.face-detection-item {
  display: inline-block;
  margin: 0 10px;
  transition: opacity 0.4s, transform 0.5s;
}

.face-detection-item .face {
  width: 64px;
  height: 64px;
  border-radius: 50%;
}

.faces-enter {
  opacity: 0;
  transform: translateX(100%) scale(0.7);
}

.faces-leave-to {
  opacity: 0;
  transform: translateX(-100%) scale(0.7);
}

.faces-leave-active {
  position: absolute;
}
</style>