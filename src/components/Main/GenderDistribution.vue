<template>
  <div class="gender-distribution-container">
    <h3 class="title">性别分布</h3>
    <PieChart
        :chart-data="chartData"
        :options="options"
        class="gender-distribution"
    />
  </div>
</template>

<script>
  import PieChart from "../Charts/PieChart";
  import { websocketServer } from "../../../config";

  export default {
    name: "GenderPercent",
    components: { PieChart },
    data() {
      return {
        chartData: {
          labels: ['男性', '女性'],
          datasets: [
            {
              backgroundColor: ['#4CACED', '#FF6384'],
              borderColor: '#ffffff',
              data: [10, 20]
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
        this.ws = new WebSocket(websocketServer + "genderRate");
        this.ws.onopen = () => console.log("gender percent open");
        this.ws.onmessage = (e) => {
          const data = JSON.parse(e.data);
          this.chartData.datasets[0].data = [+data["男性"], +data["女性"]];
        }
        this.ws.onerror = (error) => console.log(error)
        this.ws.onclose = () => console.log("gender percent close")
      }
    }
  }
</script>

<style scoped>
  .gender-distribution-container {
    width: 100%;
    height: 100%;
    grid-area: gender-distribution;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .gender-distribution-container .title {
    margin: 0;
  }
  .gender-distribution-container .gender-distribution {
    width: 200px;
    height: 200px;
  }
</style>