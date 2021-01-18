<template>
  <div class="main-container">
    <div class="left">
      <Video />
      <AreaData />
    </div>
    <div class="right">
      <People />
      <PassFlowStat />
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
    components: { PassFlowStru, PassFlowStat, People, AreaData, Video, FaceDetection },
  }
</script>

<style scoped>
  .main-container {
    display: flex;
    justify-content: space-between;
    height: calc(100vh - 48px);
    box-sizing: border-box;
  }

  .main-container .left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 50%;
    max-width: 70%;
  }

  .main-container .right {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
</style>