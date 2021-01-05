<template>
  <div class="real-time-flow-container">
    <h3>实时客流</h3>
    <div class="table">
      <span class="title">当前驻留</span>
      <span class="content">23</span>
      <span class="title">今日客流</span>
      <span class="content">50</span>
    </div>
    <div>
      <span>今日客流</span>
      <span>50</span>
    </div>
    <div>
      <span>客流上限</span>
      <span>500</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RealTimeFlow"
  }
</script>

<style scoped>
  .real-time-flow-container {
    text-align: center;
    background: #061123;
    color: #dddddd;
    margin: 10px;
    border-radius: 5px;
  }
  .real-time-flow-container .table {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 4.5rem;
    text-align: center;
    align-items: center;
  }
  .real-time-flow-container .table > span {
    width: 30%;
  }
  .real-time-flow-container .table > span:nth-child(2n+1) {
    height: 1.5rem;
    line-height: 1.5rem;
  }
  .real-time-flow-container .table > span:nth-child(2n) {
    padding: 0.625rem 0.25rem;
    height: 1.5rem;
    line-height: 1.5rem;
    background: #152242;
  }
</style>