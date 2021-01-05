<template>
  <div class="pass-flow-stat-container">
    <h2 class="title">
      客流统计信息
    </h2>
    <div class="pass-flow-stat-wrapper">
      <TodayFlow />
      <SevenDayFlow />
    </div>
  </div>
</template>

<script>
  import TodayFlow from "@/components/Main/PassFlowStat/TodayFlow";
  import SevenDayFlow from "@/components/Main/PassFlowStat/SevenDayFlow";

  export default {
    name: "PassFlowStat",
    components: {SevenDayFlow, TodayFlow}
  }
</script>

<style scoped>
  .pass-flow-stat-container {
    height: 30%;
    overflow: hidden;
    margin: 0 0.5rem 0.5rem 0;
    padding: 0.5rem;
    background: #061123;
    border-radius: 5px;
  }

  .pass-flow-stat-container .title {
    margin: 0;
    color: #dddddd;
  }

  .pass-flow-stat-wrapper {
    display: flex;
    height: calc(100% - 32px);
  }
  
  .pass-flow-stat-wrapper > div {
    background: #ffffff;
    margin: 0.5rem;
    max-width: 300px;
  }
</style>