<template>
  <div class="video-container">
    <div class="video-wrapper">
      <img ref="img" src="../../assets/Cyberpunk.jpg" alt="" class="video">
    </div>
<!--    <VideoPlayer :options="videoOptions" />-->
  </div>
</template>

<script>
import {server} from "../../../config";
import qs from "qs";
import VideoPlayer from '../VideoPlayer'

export default {
  name: "Video",
  components: {VideoPlayer},
  data() {
    return {
      source: "http://211.67.20.171:8081/hls/test2.m3u8",
      playerOptions: {
        autoplay: true,
        sources: [{
          type: "application/x-mpegURL",
          src: "http://211.67.20.171:8081/hls/test2.m3u8"
        }],
      },
      player: null,
      videoOptions: {
        autoplay: true,
        controls: true,
        sources: [{
          src: "http://211.67.20.171:8081/hls/test2.m3u8",
          type: "application/x-mpegURL"
        }]
      }
    }
  },
  mounted() {
    this.openWebSocket();
    this.$refs.img.addEventListener('click', this.handleClick);
  },
  methods: {
    openWebSocket() {
      let ws = new WebSocket(server.ws.offlineImage);
      ws.onopen = () => console.log("open");
      ws.onmessage = (e) => {
        this.$refs.img.setAttribute("src", "data:image/png;base64," + e.data);
      }
      ws.onerror = (e) => console.log(e);
      ws.onclose = () => console.log("close");
    },
    handleClick(e) {
      const [x, y] = [e.clientX, e.clientY];
      const {top, left} = this.$refs.img.getBoundingClientRect();
      const imgWidth = this.$refs.img.clientWidth;
      const imgHeight = this.$refs.img.clientHeight;
      const [perX, perY] = [(x - left) / imgWidth, (y - top) / imgHeight];
      this.axios.post(server.http.selectPerson, qs.stringify({x: perX, y: perY}))
          .then(e => console.log(e))
          .catch(error => console.log(error))
    }
  }
}
</script>

<style scoped>
.video-container {
  background: #061123;
  border-radius: 5px;
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 60%;
  margin: 0.5rem;
}

.video-container .title {
  margin: 5px;
}

.video-wrapper {
  /*height: 100%;*/
  width: 100%;
  height: 0;
  padding: 5px 5px;
  box-sizing: border-box;
  flex: 1;
  display: flex;
  justify-content: center;
}

.video {
  max-width: 100%;
  max-height: 100%;
}
</style>