<template>
  <div class="area-datas-container">
    <h2>区域统计数据</h2>
    <div class="area-datas-wrapper">
      <div class="area-datas-items">
        <h4>自助区域</h4>
        <span>当前排队人数: {{ self.num }}</span>
        <span>最长停留时间: {{ self.maxSTime }}分钟</span>
        <span>最长接触时间: {{ self.maxATime }}分钟</span>
      </div>
      <div class="area-datas-items">
        <h4>安防区域</h4>
        <span>可疑危险物品: {{ safe.danger }}</span>
        <span>检测遗留物品: {{ safe.lost }}</span>
      </div>
      <div class="area-datas-items">
        <h4>迎宾区域</h4>
        <span>值班员工: {{ greet.staff }}</span>
        <span>最近离岗时长: {{ greet.leaveTime }}分钟</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AreaData",
  data() {
    return {
      safe: {
        danger: ['手枪'],
        lost: ['手机']
      },
      self: {
        num: 10,
        maxSTime: 10,
        maxATime: 10
      },
      greet: {
        staff: '张三',
        leaveTime: 0
      }
    }
  }
}
</script>

<style scoped>
  .area-datas-container {
    height: 39%;
    color: #dddddd;
    background: #061123;
    border-radius: 5px;
    margin: 0 0.5rem 0.5rem;
  }

  .area-datas-wrapper {
    display: flex;
    justify-content: space-around;
  }

  .area-datas-items {
    display: flex;
    flex-direction: column;
  }
</style>