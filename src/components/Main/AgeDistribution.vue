<template>
  <div class="age-distribution-container">
    <h3 class="title">年龄分布</h3>
    <PieChart
        :chart-data="chartData"
        :options="options"
        class="age-distribution"
    />
  </div>
</template>

<script>
  import PieChart from "../Charts/PieChart";
  import {websocketServer} from "../../../config";

  export default {
    name: "AgeDistribution",
    components: { PieChart },
    data() {
      return {
        chartData: {
          labels: ['13岁以下', '18-30岁', '30-60岁', '60岁以上'],
          datasets: [
            {
              backgroundColor: ['#4CACED', '#FF6384', '#a8f156', '#fcad72'],
              borderColor: '#ffffff',
              data: [0, 0, 0, 0]
            }
          ],
        },
        options: {},
        ws: null
      }
    },
    mounted() {
      this.openWebSocket();
    },
    methods: {
      openWebSocket() {
        this.ws = new WebSocket(websocketServer + "age");
        this.ws.onopen = () => console.log("age open");
        this.ws.onmessage = (e) => {
          const data = JSON.parse(e.data)['age'];
          console.log(data)
          this.chartData.datasets[0].data = data.map((item) => +item);
        }
        this.ws.onerror = (error) => console.log(error)
        this.ws.onclose = () => console.log("age close")
      }
    }
  }
</script>

<style scoped>
  .age-distribution-container {
    grid-area: age-distribution;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .age-distribution-container .title {
    margin: 0;
  }
  .age-distribution-container .age-distribution {
    width: 200px;
    height: 200px;
  }
</style>