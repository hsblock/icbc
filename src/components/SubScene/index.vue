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
import Warning from "@/components/SubScene/Warning";

export default {
  name: "SubScene",
  components: {Warning, SecureArea, WelcomeArea, SelfServiceArea, Video}
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
  min-width: 50%;
  max-width: 70%;
}

.main-container .right {
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>