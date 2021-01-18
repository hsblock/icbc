<template>
  <LineChart
      :chart-data="chartData"
      :options="options"
      class="seven-day-flow"
  />
</template>

<script>
import LineChart from '../../Charts/LineChart'
import {server} from "../../../../config";

export default {
  name: "SevenDayFlow",
  components: {LineChart},
  data() {
    return {
      chartData: {
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
            label: '未实现',
            fill: false,
            backgroundColor: '#000',
            borderColor: '#000',
            data: Array.from({length: 7}).map((_, i) => {
              return Math.round(Math.random() * 100);
            })
          }
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  }
}
</script>

<style scoped>

</style>