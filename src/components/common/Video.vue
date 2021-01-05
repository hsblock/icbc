<template>
  <div class="video-container">
    <div class="video-wrapper">
      <img ref="img" src="../../assets/Cyberpunk.jpg" alt="" class="video">
    </div>
<!--    <vue-aliplayer-v2 ref="VueAliplayerV2" :source="source" :options="options" />-->
  </div>
</template>

<script>
  import { websocketServer } from "../../../config";
  import 'video.js/dist/video-js.css'
  import VueAliplayerV2 from "vue-aliplayer-v2"

  export default {
    name: "Video",
    components: { VueAliplayerV2 },
    data() {
      return {
        playerOptions: {
          muted: true,
          language: 'en',
          playbackRate: [1.0],
          sources: [{
            type: "rtmp/mp4",
            src: "rtmp://211.67.20.74:1935/myapp"
          }],
          techOrder: ['flash'],
          autoplay: true,
          controls: false,
          poster: "https://img-blog.csdnimg.cn/20200701110800521.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l1bG9uZ3h1ZQ==,size_16,color_FFFFFF,t_70"
        },
        source: "rtmp://211.67.20.74:1935/myapp",
        options: {
          isLive: true,
          useFlashPrism: true,
          useH5Prism: false
        }
      }
    },
    mounted() {
      this.openWebSocket();
    },
    methods: {
      openWebSocket() {
        let ws = new WebSocket(websocketServer + "face");
        ws.onopen = () => console.log("open");
        ws.onmessage = (e) => {
          this.$refs.img.setAttribute("src", "data:image/png;base64," + e.data);
        }
        ws.onerror = (e) => console.log(e);
        ws.onclose = () => console.log("close");
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
    height: 100%;
    width: 100%;
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