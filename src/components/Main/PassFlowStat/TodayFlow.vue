<template>
  <LineChart
      :chart-data="chartData"
      :options="options"
      class="today-flow"
  />
</template>

<script>
import LineChart from "../../Charts/LineChart";
import { server } from "../../../../config";

export default {
  name: "TodayFlow",
  components: {LineChart},
  data() {
    return {
      chartData: {
        labels: Array.from({length: 9}).map((_, i) => 9 + i),
        datasets: [
          {
            label: '当天客流',
            fill: false,
            backgroundColor: '#000',
            borderColor: '#000',
            data: [0],
          }
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted() {
    this.openWebSocket();
  },
  beforeDestroy() {
    this.ws && this.ws.close(1000, 'latest day destroy');
  },
  methods: {
    openWebSocket() {
      this.ws = new WebSocket(server().ws.latestDay);
      this.ws.onopen = () => console.log("latest day open");
      this.ws.onmessage = (e) => {
        console.log(e.data);
        const population = JSON.parse(e.data)['population']
        this.chartData.datasets[0].data = population;
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

</style>