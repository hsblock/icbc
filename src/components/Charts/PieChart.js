import { Pie } from 'vue-chartjs'
const _ = require("loadsh")

export default {
  extends: Pie,
  props: ['chartData', 'options'],
  mounted() {
    this.renderChart(_.cloneDeep(this.chartData), this.options)
  },
  watch: {
    chartData: {
      handler() {
        console.log('change')
        this.renderChart(_.cloneDeep(this.chartData), this.options);
      },
      deep: true
    }
  }
}