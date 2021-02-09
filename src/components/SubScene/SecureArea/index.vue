<template>
  <div class="secure-area-container">
    <button class="reset" @click="shotBackground">
      重置背景按钮
    </button>
    <h2>安防区域</h2>
    <div class="secure-area-wrapper">
      <danger />
      <leftover />
    </div>
  </div>
</template>

<script>
import {server} from "../../../../config";
import Danger from "@/components/SubScene/SecureArea/Danger";
import Leftover from "@/components/SubScene/SecureArea/Leftover";

export default {
  name: "SecureArea",
  components: {Leftover, Danger},
  methods: {
    shotBackground() {
      this.axios.get(server().http.backgroundShot)
          .then(res => {
            console.log(res);
            this.$message.success('背景图片拍摄成功');
          })
          .catch(e => {
            console.log(e);
            this.$message.error('背景图片拍摄失败');
          })
    }
  }
}
</script>

<style lang="scss" scoped>
.secure-area-container {
  background: #061123;
  border-radius: 5px;
  margin: 0 0.5rem 0.5rem;
  height: 39%;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  position: relative;

  .reset {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0.5rem;
    padding: 0.5rem;
    border-radius: 5px;
  }

  .secure-area-wrapper {
    display: flex;
    margin: 0.5rem 2rem;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
  }
}
</style>