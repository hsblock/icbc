<template>
  <div class="pass-flow-stru-container">
    <h2 class="title">
      客流人员结构
    </h2>
    <div class="pass-flow-stru-wrapper">
      <PassAttr />
    </div>
  </div>
</template>

<script>
  import PassAttr from "@/components/Main/PassFlowStru/PassAttr";

  export default {
    name: "PassFlowStru",
    components: {PassAttr}
  }
</script>

<style scoped>
  .pass-flow-stru-container {
    height: 30%;
    overflow: hidden;
    margin: 0 0.5rem 0.5rem 0;
    padding: 0.5rem;
    background: #061123;
    border-radius: 5px;
  }

  .pass-flow-stru-container .title {
    margin: 0;
    color: #dddddd;
  }

  .pass-flow-stru-wrapper {
    display: flex;
    height: calc(100% - 32px);
  }

  .pass-flow-stru-wrapper > div {
    background: #ffffff;
    margin: 0.5rem;
  }

  /*.pass-flow-stru-wrapper /deep/ canvas {*/
  /*  height: 100% !important;*/
  /*}*/
</style>