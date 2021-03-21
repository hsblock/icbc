<template>
  <div class="seven-day-flow-container">
    <div v-if="loading" class="loading"></div>
    <canvas ref="chart" class="seven-day-flow"></canvas>
  </div>
</template>

<script>
import {server} from "../../../../config";
import Chart from "chart.js";

export default {
  name: "SevenDayFlow",
  data() {
    return {
      chartConfig: {
        type: 'line',
        data: {
          labels: Array.from({length: 7}).map((_, i) => {
            let today = new Date();
            const year = today.getFullYear();
            const month = today.getMonth();
            const date = today.getDate();
            const dateStr = new Date(year, month, date - i - 1).toLocaleDateString();
            const dateArr = dateStr.match(/([0-9]+)/g)
            dateArr.splice(0, 1);
            return dateArr.join("/")
          }).reverse(),
          datasets: [
            {
              label: '历史七天客流',
              fill: false,
              backgroundColor: '#000',
              borderColor: '#000',
              data: []
            }
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      },
      chart: null,
      loading: true
    }
  },
  mounted() {
    this.newChart();
    this.getLastWeekNum();
  },
  methods: {
    newChart() {
      let ctx = this.$refs.chart.getContext('2d');
      this.chart = new Chart(ctx, this.chartConfig);
    },
    getLastWeekNum() {
      this.axios.get(server().http.getLastWeekNum)
          .then((res) => {
            const data = res.data;
            console.log(data);
            this.chartConfig.data.datasets[0].data = data['lastWeekNum'];
            this.chart.update();
            this.loading = false;
          })
          .catch(e => console.error(e.message))
    }
  }
}
</script>

<style scoped>
.seven-day-flow-container {
  position: relative;
}
</style>