<template>
  <div class="people-container">
    <div>
      当前驻留人次: {{ currentStay }} 今日客流总量: {{ todayFlow }} 客流上限: {{ flowLimit }}
    </div>
  </div>
</template>

<script>
  export default {
    name: "People",
    data() {
      return {
        currentStay: '未实现',
        todayFlow: '未实现',
        flowLimit: '未实现'
      }
    }
  }
</script>

<style scoped>
  .people-container {
    color: #dddddd;
    font-size: 20px;
    padding: 0 1rem;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>