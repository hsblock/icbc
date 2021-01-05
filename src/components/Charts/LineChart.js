import { Line } from 'vue-chartjs'
const _ = require("loadsh")

export default {
  extends: Line,
  props: ['chartData', 'options'],
  mounted() {
    this.renderChart(_.cloneDeep(this.chartData), this.options)
  },
  watch: {
    chartData: {
      handler() {
        this.renderChart(_.cloneDeep(this.chartData), this.options);
      },
      deep: true
    }
  }
}
