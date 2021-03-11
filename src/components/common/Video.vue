<template>
  <div class="video-container">
    <div class="video-wrapper">
      <video-player
          ref="video"
          :options="playerOptions"
          class="video"
      >
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
      </video-player>
    </div>
  </div>
</template>

<script>
import { server } from "../../../config";
import icbc from '@/assets/img/icbc.jpg';
import VideoPlayer from "@/components/common/VideoPlayer";
import 'video.js/dist/video-js.css'

export default {
  name: "Video",
  components: { VideoPlayer },
  data() {
    return {
      playerOptions: {
        autoplay: true,
        controls: true,
        poster: icbc,
        sources: [
          {
            withCredentials: false,
            type: 'application/x-mpegURL',
            src: server().m3u8.face
          }
        ]
      },
      activeSource: server().m3u8.face,
      sources: [
        { name: '进店', value: server().m3u8.face },
        { name: '排队', value: server().m3u8.queue },
        { name: '危险物品', value: server().m3u8.dangerous },
        { name: '遗留物品', value: server().m3u8.leftover },
        { name: '停留时间', value: server().m3u8.standing },
        { name: '离岗检测', value: server().m3u8.offline }
      ],
      ws: null
    }
  },
  created() {
    if (this.$route.name === 'SubScene') {
      if (this.$route.params.source !== undefined) {
        // 换源切换到副界面
        this.switchSource(this.$route.params.source);
      } else {
        // 点击链接切换到副界面
        this.switchSource(this.sources[1].value);
      }
    }
  },
  mounted() {
    this.openWebSocket();
    console.log(this.$refs.video.$refs.videoPlayer);
    this.$refs.video.$refs.videoPlayer.addEventListener('click', this.handleClick);
  },
  beforeDestroy() {
    this.ws && this.ws.close(1000, 'video destroy');
    this.$refs.video.$refs.videoPlayer.removeEventListener('click', this.handleClick);
  },
  methods: {
    openWebSocket() {
      this.ws = new WebSocket(server().ws.offlineImage);
      this.ws.onopen = () => console.log("video open");
      this.ws.onmessage = (e) => {
        this.$refs.img.setAttribute("src", "data:image/png;base64," + e.data);
      }
      this.ws.onerror = (e) => console.log(e);
      this.ws.onclose = () => console.log("video close");
    },
    handleClick(e) {
      console.log(e)
      const video = e.target;
      // 点击点的坐标
      const [x, y] = [e.clientX, e.clientY];
      const {top, left} = video.getBoundingClientRect();
      // 视频理论大小
      let { videoHeight, videoWidth, clientHeight, clientWidth } = video;
      console.log(videoHeight, videoWidth, clientHeight, clientWidth);
      videoWidth = (videoWidth / videoHeight) * clientHeight;
      const offset = (clientWidth - videoWidth) / 2;
      const px = (x - left - offset) / videoWidth;
      const py = (y - top) / videoHeight;
      this.axios.post(server().http.selectPerson, {x: px, y: py})
          .then(e => console.log(e))
          .catch(error => console.error(error.message))
    },
    switchSource(v) {
      console.log(v);
      console.log(this.$route)
      if (this.$route.name === 'Main' && v !== this.sources[0].value) {
        // 在主界面点击其他视频源，跳转到副界面
        this.$router.push({ name: 'SubScene', params: { source: v } });
      } else if (this.$route.name === 'SubScene' && v === this.sources[0].value) {
        this.$router.push({ name: 'Main' });
      } else {
        this.activeSource = v;
        this.$refs.video.player.src({src: v, type: 'application/x-mpegURL'});
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
    width: 100%;
    height: 0;
    padding: 5px 5px;
    box-sizing: border-box;
    flex: 1;
    display: flex;
    justify-content: center;

    .video {
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;

      /deep/ .video-js {
        width: 100%;
        height: 100%;

        video {
          z-index: 100;
        }
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
}
</style>