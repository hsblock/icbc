<template>
  <div class="today-flow-container">
    <div v-if="loading" class="loading"></div>
    <canvas ref="chart" class="today-flow"></canvas>
  </div>
</template>

<script>
import { server } from "../../../../config";
import Chart from "chart.js";

export default {
  name: "TodayFlow",
  data() {
    return {
      chartConfig: {
        type: 'line',
        data: {
          labels: Array.from({length: 9}).map((_, i) => 9 + i),
          datasets: [
            {
              label: '当天客流',
              fill: false,
              backgroundColor: '#000',
              borderColor: '#000',
              data: [],
            }
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        },
      },
      chart: null,
      loading: true
    }
  },
  mounted() {
    this.newChart();
    this.openWebSocket();
  },
  beforeDestroy() {
    this.ws && this.ws.close(1000, 'latest day destroy');
  },
  methods: {
    newChart() {
      let ctx = this.$refs.chart.getContext('2d');
      this.chart = new Chart(ctx, this.chartConfig);
    },
    openWebSocket() {
      this.ws = new WebSocket(server().ws.latestDay);
      this.ws.onopen = () => {
        console.log("latest day open");
        this.loading = false;
      }
      this.ws.onmessage = (e) => {
        console.log(e.data);
        const population = JSON.parse(e.data)['population'];
        // 去除末尾 0
        for (let i = population.length - 1; ; i--) {
          if (population[i] === 0) {
            population.pop();
          } else {
            break;
          }
        }
        this.chartConfig.data.datasets[0].data = population;
        this.chart.update();
        this.$emit('todayFlowChange', population.reduce((prev, cur) => {
          return prev + cur;
        }));
      }
      this.ws.onerror = (error) => console.log(error)
      this.ws.onclose = () => console.log("latest day close")
    }
  }
}
</script>

<style scoped>
.today-flow-container {
  position: relative;
}
</style>