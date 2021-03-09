<template>
  <div class="video-container">
    <div class="video-wrapper">
<!--      <img ref="img" :src="placeholder" alt="" class="video">-->
      <video-player
          ref="video"
          :options="playerOptions"
          class="video"
      >
        <div class="switch-button">
          <el-button
              v-for="item in sources"
              :key="item.name"
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
        sources: [
          {
            withCredentials: false,
            type: 'application/x-mpegURL',
            src: 'http://211.67.21.65:8081/hls/test2.m3u8'
          }
        ]
      },
      placeholder: icbc,
      sources: [
        {
          name: '人脸检测',
          value: 'http://211.67.21.65:8081/hls/test2.m3u8'
        },
        {
          name: '遗留物品检测',
          value: 'https://logos-channel.scaleengine.net/logos-channel/live/biblescreen-ad-free/playlist.m3u8'
        }
      ],
      ws: null
    }
  },
  mounted() {
    this.openWebSocket();
    console.log(this.$refs.video.$refs.videoPlayer)
    // this.$refs.img.addEventListener('click', this.handleClick);
  },
  beforeDestroy() {
    this.ws && this.ws.close(1000, 'video destroy')
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
      const [x, y] = [e.clientX, e.clientY];
      const {top, left} = this.$refs.img.getBoundingClientRect();
      const imgWidth = this.$refs.img.clientWidth;
      const imgHeight = this.$refs.img.clientHeight;
      const [perX, perY] = [(x - left) / imgWidth, (y - top) / imgHeight];
      this.axios.post(server().http.selectPerson, {x: perX, y: perY})
          .then(e => console.log(e))
          .catch(error => console.error(error.message))
    },
    switchSource(v) {
      console.log(v);
      this.$refs.video.player.src({src: v, type: 'application/x-mpegURL'})
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

      /deep/ .video-js {
        width: 100%;
        height: 100%;
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

        button {
          width: 100%;
          margin: 0;
          background: rgba(255, 255, 255, 0.7);

          & + button {
            margin-top: 10px;
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