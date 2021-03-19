<template>
  <div class="video-container">
    <div class="video-wrapper">
      <div class="switch-button">
        <el-button
            v-for="item in sources"
            :key="item.name"
            :class="[activeSource === item.value ? 'active' : '']"
            @click="switchSource(item.value)"
        >
          {{ item.name }}
        </el-button>
      </div>
      <div v-if="loading" class="loading"></div>
      <img ref="img" :src="placeholder" alt="" class="video">
    </div>
  </div>
</template>

<script>
import { server } from "../../../config";
import icbc from '@/assets/img/icbc.jpg';

export default {
  name: "Video",
  data() {
    return {
      activeSource: null,
      sources: [
        { name: '进店', value: server().video.flowFace },
        { name: '排队', value: server().video.flowStanding },
        { name: '危险物品', value: server().video.flowDangerous },
        { name: '遗留物品', value: server().video.flowLeftover },
        { name: '离岗检测', value: server().video.flowOffline }
      ],
      placeholder: icbc,
      ws: null,
      loading: true
    }
  },
  mounted() {
    if (this.$route.name === 'Main') {
      this.switchSource(this.sources[0].value);
    } else if (this.$route.name === 'SubScene') {
      if (this.$route.params.source !== undefined) {
        // 换源切换到副界面
        this.switchSource(this.$route.params.source);
      } else {
        // 点击链接切换到副界面
        this.switchSource(this.sources[1].value);
      }
    }
    this.$refs.img.addEventListener('click', this.handleClick);
  },
  beforeDestroy() {
    this.ws && this.ws.close(1000, 'video destroy');
    this.$refs.img.removeEventListener('click', this.handleClick);
  },
  methods: {
    openWebSocket(src) {
      console.log(src)
      this.ws = new WebSocket(src);
      this.ws.onopen = () => {
        this.loading = false;
        console.log("video open");
      }
      this.ws.onmessage = (e) => {
        this.placeholder = "data:image/png;base64," + e.data;
      }
      this.ws.onerror = (e) => {
        console.log(e);
      }
      this.ws.onclose = () => console.log("video close");
    },
    handleClick(e) {
      const [x, y] = [e.clientX, e.clientY];
      const {top, left} = this.$refs.img.getBoundingClientRect();
      const imgWidth = this.$refs.img.clientWidth;
      const imgHeight = this.$refs.img.clientHeight;
      const [perX, perY] = [(x - left) / imgWidth, (y - top) / imgHeight];
      console.log(perX, perY);
      this.axios.post(server().http.selectPerson, {x: perX, y: perY})
          .then(e => console.log(e))
          .catch(error => console.error(error.message))
    },
    switchSource(v) {
      if (this.$route.name === 'Main' && v !== this.sources[0].value) {
        // 在主界面点击其他视频源，跳转到副界面
        this.$router.push({ name: 'SubScene', params: { source: v } });
      } else if (this.$route.name === 'SubScene' && v === this.sources[0].value) {
        // 在副界面点击人脸检测视频源，跳转到主界面
        this.$router.push({ name: 'Main' });
      } else {
        this.ws && this.ws.close(1000, `${this.activeSource} close`);
        this.activeSource = v;
        this.loading = true;
        this.placeholder = icbc;
        this.openWebSocket(v);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.video-container {
  background: #061123;
  border-radius: 5px;
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 60%;
  margin: 0.5rem;

  .video-wrapper {
    position: relative;
    width: 100%;
    height: 0;
    padding: 5px 5px;
    box-sizing: border-box;
    flex: 1;
    display: flex;
    justify-content: center;

    .video {
      max-width: 100%;
      height: auto;
      object-fit: contain;
    }

    .switch-button {
      position: absolute;
      top: 50%;
      right: 2rem;
      transform: translate(50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity .4s ease, transform .4s ease;
      z-index: 1000;

      button {
        width: 100%;
        margin: 0;
        background: rgba(255, 255, 255, 0.7);

        & + button {
          margin-top: 10px;
        }

        &.active {
          color: lightblue;
          font-weight: bold;
          background: rgba(0, 128, 0, 0.4);
          border: rgba(255, 255, 255, 0.3) 1px solid;
        }
      }
    }

    &:hover {
      .switch-button {
        opacity: 1;
        transform: translate(0, -50%);
      }
    }
  }
}
</style>