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
          <td>13岁以下</td>
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
    <PieChart
        :chart-data="chartData"
        :options="options"
        class="gender-distribution"
    />
  </div>
</template>

<script>
  import PieChart from "@/components/Charts/PieChart";

  export default {
    name: "PassAttr",
    components: {PieChart},
    data() {
      return {
        chartData: {
          labels: [],
          datasets: [
            {
              label: '性别分布',
              backgroundColor: ['#4CACED', '#FF6384'],
              borderColor: '#ffffff',
              data: [10, 20]
            },
            {
              label: '年龄分布',
              backgroundColor: ['#ff9f40', '#FFCD56', "#4BC0C0", "#9966FF"],
              borderColor: '#ffffff',
              data: [70, 20, 40, 50]
            }
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          devicePixelRatio: 2,
          legend: {
            display: false
          },
          tooltips: {
            enabled: false
          }
        }
      }
    }
  }
</script>

<style scoped>
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
</style>