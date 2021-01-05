<template>
  <div class="warning-container">
    <h2>警示栏</h2>
    <span v-for="warning in warnings" :key="warning">
      {{ warning }}
    </span>
  </div>
</template>

<script>
  export default {
    name: "Warning",
    data() {
      return {
        warnings: ['安放区域：手机已遗留超过1分钟，有疑似斧头的危险物品'],
      }
    }
  }
</script>

<style scoped>
  .warning-container {
    background: #061123;
    border-radius: 5px;
    margin: 0 0.5rem 0.5rem;
    height: 10%;
    color: #dddddd;
    display: flex;
    align-items: center;
  }

  .warning-container h2 {
    margin: 0 10px;
    display: inline-block;
    color: red;
  }
</style>