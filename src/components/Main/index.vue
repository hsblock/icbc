<template>
  <div class="main-container">
    <div class="left">
      <Video />
      <AreaData />
    </div>
    <div class="right">
      <People :today-flow="todayFlow" />
      <PassFlowStat @todayFlowChange="setTodayFlow" />
      <PassFlowStru />
      <FaceDetection />
    </div>
  </div>
</template>

<script>
import FaceDetection from "./FaceDetection";
import Video from "../common/Video";
import AreaData from "@/components/Main/AreaData";
import People from "@/components/Main/People";
import PassFlowStat from "@/components/Main/PassFlowStat";
import PassFlowStru from "@/components/Main/PassFlowStru";

export default {
  name: "Main",
  components: {PassFlowStru, PassFlowStat, People, AreaData, Video, FaceDetection},
  data() {
    return {
      todayFlow: 0
    }
  },
  methods: {
    setTodayFlow(data) {
      this.todayFlow = data;
    }
  }
}
</script>

<style scoped>
.main-container {
  display: flex;
  justify-content: space-between;
  height: calc(100vh - 48px);
  box-sizing: border-box;
  width: 100vw;
}

.main-container .left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;
}

.main-container .right {
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>