<template>
  <div class="self-service-area-container">
    <h2>自助设备区域</h2>
    <div class="self-service-area-wrapper">
      <div class="column">
        <div class="row">
          <div>
            <span>排队人数</span>
            <span>{{ num }}</span>
          </div>
          <div>
            <span>排队人数上限</span>
            <span>{{ numLimit }}</span>
          </div>
        </div>
        <div class="row">
          <div>
            <span>最长停留时间</span>
            <span>{{ stayTime }}</span>
          </div>
          <div>
            <span>停留时间上限</span>
            <span>{{ stayTimeLimit }}</span>
          </div>
        </div>
        <div class="row">
          <div>
            <span>最长接触时间</span>
            <span>{{ contactTime }}</span>
          </div>
          <div>
            <span>接触时间上限</span>
            <span>{{ contactTimeLimit }}</span>
          </div>
        </div>
      </div>
      <div>
        <LineChart
            :chart-data="chartData"
            :options="options"
            class="stay-time"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import LineChart from "@/components/Charts/LineChart";

  export default {
    name: "SelfServiceArea",
    components: {LineChart},
    data() {
      return {
        num: 10,
        numLimit: 3,
        stayTime: 5,
        stayTimeLimit: 2,
        contactTime: 8,
        contactTimeLimit: 9,
        chartData: {
          labels: Array.from({length: 9}).map((_, i) => 9 + i),
          datasets: [
            {
              label: '排队人数统计',
              fill: false,
              backgroundColor: '#000',
              borderColor: '#000',
              data: Array.from({length: 9}).map((_, i) => {
                return Math.round( Math.random() * 100);
              })
            },
            {
              label: '平均等待时间',
              fill: false,
              backgroundColor: '#0f0',
              borderColor: '#0f0',
              data: Array.from({length: 9}).map((_, i) => {
                return Math.round( Math.random() * 100);
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
  .self-service-area-container {
    height: 50%;
    overflow: hidden;
    margin: 0.5rem 0.5rem 0.5rem 0;
    padding: 0.5rem;
    background: #061123;
    border-radius: 5px;
    color: #dddddd;
  }

  .self-service-area-container h2 {
    margin: 0;
  }

  .self-service-area-wrapper {
    display: flex;
    height: calc(100% - 32px);
    justify-content: space-between;
    padding: 10px;
    box-sizing: border-box;
  }

  .self-service-area-wrapper .column {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 1rem 0;
  }

  .self-service-area-wrapper .row {
    display: flex;
    justify-content: space-around;
  }

  .self-service-area-wrapper .row > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0.25rem 0.5rem;
  }

  .self-service-area-wrapper .row > div > span {
    display: inline-block;
    width: 100px;
    text-align: center;
  }

  .self-service-area-wrapper .row > div > span:last-child {
    background: #4BC0C0;
    width: 40px;
    padding: 5px 8px;
    margin: 4px 0;
  }

  .self-service-area-wrapper .stay-time {
    height: 100%;
    margin-left: 10px;
    background: #ffffff;
  }
</style>