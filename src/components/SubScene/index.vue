<template>
  <div>
    <div class="main-container">
      <div class="left">
        <Video />
        <secure-area />
      </div>
      <div class="right">
        <self-service-area />
        <welcome-area />
      </div>
    </div>
  </div>
</template>

<script>
import Video from "@/components/common/Video";
import SecureArea from "@/components/SubScene/SecureArea";
import WelcomeArea from "@/components/SubScene/WelcomeArea";
import SelfServiceArea from "@/components/SubScene/SelfServiceArea";

export default {
  name: "SubScene",
  components: {SecureArea, WelcomeArea, SelfServiceArea, Video}
}
</script>

<style scoped>
.main-container {
  display: flex;
  justify-content: space-between;
  max-width: 100%;
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
  width: 50%;
}
</style>