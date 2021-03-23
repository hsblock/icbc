<template>
  <div class="pass-attr">
    <div class="labels">
      <table>
        <tr>
          <td style="background: #4CACED"></td>
          <td>男性</td>
        </tr>
        <tr>
          <td style="background: #FF6384"></td>
          <td>女性</td>
        </tr>
      </table>
      <table>
        <tr>
          <td style="background: #ff9f40"></td>
          <td>18岁以下</td>
        </tr>
        <tr>
          <td style="background: #FFCD56"></td>
          <td>18-30岁</td>
        </tr>
        <tr>
          <td style="background: #4BC0C0"></td>
          <td>30-60岁</td>
        </tr>
        <tr>
          <td style="background: #9966FF"></td>
          <td>60岁以上</td>
        </tr>
      </table>
    </div>
    <div class="gender-age-container">
      <div v-if="loading" class="loading"></div>
      <canvas ref="chart" class="gender-age"></canvas>
    </div>
  </div>
</template>

<script>
import {server} from "../../../../config";
import Chart from "chart.js";

export default {
  name: "PassAttr",
  data() {
    return {
      chartConfig: {
        type: 'pie',
        data: {
          datasets: [
            {
              label: '性别分布',
              backgroundColor: ['#4CACED', '#FF6384'],
              borderColor: '#ffffff',
              data: [0, 0],
              labels: ['男', '女']
            },
            {
              label: '年龄分布',
              backgroundColor: ['#ff9f40', '#FFCD56', "#4BC0C0", "#9966FF"],
              borderColor: '#ffffff',
              data: [0, 0, 0, 0],
              labels: ['18岁以下', '18-30岁', '30-60岁', '60岁以上']
            }
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                let dataset = data.datasets[tooltipItem.datasetIndex];
                let index = tooltipItem.index;
                return dataset.labels[index] + ': ' + dataset.data[index];
              }
            }
          }
        }
      },
      chart: null,
      wsGender: null,
      wsAge: null,
      loading: true
    }
  },
  mounted() {
    this.newChart();
    // this.openWebSocket();
  },
  beforeDestroy() {
    this.closeWebSocket();
  },
  methods: {
    openWebSocket() {
      this.openGender();
      this.openAge();
    },
    closeWebSocket() {
      this.wsAge && this.wsAge.close(1000, 'age rate destroy');
      this.wsGender && this.wsGender.close(1000, 'gender rate destroy');
    },
    newChart() {
      let ctx = this.$refs.chart.getContext('2d');
      this.chart = new Chart(ctx, this.chartConfig);
    },
    openGender() {
      this.wsGender = new WebSocket(server().ws.genderRate);
      this.wsGender.onopen = () => {
        console.log("gender rate open");
        this.loading = false;
      }
      this.wsGender.onmessage = (e) => {
        const data = JSON.parse(e.data);
        console.log(data)
        this.chartConfig.data.datasets[0].data = [+data["男"], +data["女"]];
        this.chart.update();
      }
      this.wsGender.onerror = (error) => console.log(error)
      this.wsGender.onclose = () => console.log("gender rate close")
    },
    openAge() {
      this.wsAge = new WebSocket(server().ws.ageRate);
      this.wsAge.onopen = () => {
        console.log("age rate open");
        this.loading = false;
      }
      this.wsAge.onmessage = (e) => {
        const data = JSON.parse(e.data);
        console.log(data)
        this.chartConfig.data.datasets[1].data = data['age'].map((item) => +item);
        this.chart.update();
      }
      this.wsAge.onerror = (error) => console.log(error)
      this.wsAge.onclose = () => console.log("age rate close")
    }
  }
}
</script>

<style lang="scss" scoped>
.pass-attr {
  display: flex;
}

.pass-attr .labels {
  font-size: 10px;
}

.labels tr td:first-child {
  width: 20px;
}

.labels table + table {
  margin-top: 10px;
}

.gender-age-container {
  position: relative;
}
</style>