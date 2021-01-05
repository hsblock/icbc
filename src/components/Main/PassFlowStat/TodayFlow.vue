<template>
  <LineChart
      :chart-data="chartData"
      :options="options"
      class="today-flow"
  />
</template>

<script>
  import LineChart from "../../Charts/LineChart";
  import { websocketServer } from "../../../../config";

  export default {
    name: "TodayFlow",
    components: { LineChart },
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
              data: Array.from({length: 6}).map((_, i) => {
                return Math.round( Math.random() * 10);
              }),
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
      this.ws.close(1000, 'today flow closing');
    },
    methods: {
      openWebSocket() {
        this.ws = new WebSocket(websocketServer + "latestday");
        this.ws.onopen = () => console.log("today flow open");
        this.ws.onmessage = (e) => {
          this.chartData.datasets[0].data = JSON.parse(e.data)["population"];
        }
        this.ws.onerror = (error) => console.log(error)
        this.ws.onclose = () => console.log("today flow close")
      }
    }
  }
</script>

<style scoped>

</style>