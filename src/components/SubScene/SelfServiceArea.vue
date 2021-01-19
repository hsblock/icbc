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
            <form action="" @submit="submitWaitNumber">
              <input v-model="numLimit" type="text">
            </form>
          </div>
        </div>
        <div class="row">
          <div>
            <span>最长停留时间</span>
            <span>{{ stayTime }}</span>
          </div>
          <div>
            <span>停留时间上限</span>
            <form action="" @submit="submitWaitTime">
              <input v-model="stayTimeLimit" type="text">
              <span>分钟</span>
            </form>
          </div>
        </div>
        <div class="row">
          <div>
            <span>最长接触时间</span>
            <span>{{ contactTime }}</span>
          </div>
          <div>
            <span>接触时间上限</span>
            <form action="" @submit="submitContactTime">
              <input v-model="contactTimeLimit" type="text">
              <span>分钟</span>
            </form>
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
import {server} from "../../../config";

export default {
  name: "SelfServiceArea",
  components: {LineChart},
  data() {
    return {
      num: 10,
      numLimit: 10,
      stayTime: 5,
      stayTimeLimit: 15,
      contactTime: '无',
      contactTimeLimit: 5,
      chartData: {
        labels: Array.from({length: 9}).map((_, i) => 9 + i),
        datasets: [
          {
            label: '排队 / 总人数统计',
            fill: false,
            backgroundColor: '#000',
            borderColor: '#000',
            data: Array.from({length: 9}).map((_, i) => {
              return Math.round(Math.random() * 10);
            }),
            yAxisID: 'y'
          },
          {
            label: '无 - 平均等待时间',
            fill: false,
            backgroundColor: '#0f0',
            borderColor: '#0f0',
            data: Array.from({length: 9}).map((_, i) => {
              return Math.round(Math.random() * 100);
            }),
            yAxisID: 'y1'
          }
        ],
      },
      options: {
        responsive: true,
        interaction: {
          mode: 'index'
        },
        stacked: false,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              position: 'left',
              id: 'y'
            },
            {
              position: 'right',
              id: 'y1',
              gridLines: {
                drawOnChartArea: false,
              }
            }
          ],
        }
      },
      wsNumQueue: null,
      wsMostStaningTime: null,
      wsLatestDay: null
    }
  },
  created() {
    this.openNumQueue();
    this.openMostStaningTime();
    this.openLatestDay();
  },
  beforeDestroy() {
    this.wsNumQueue && this.wsNumQueue.close(1000, 'num queue destroy');
    this.wsMostStaningTime && this.wsMostStaningTime.close(1000, 'most staning time destroy');
    this.wsLatestDay && this.wsLatestDay.close(1000, 'latest day destroy');
  },
  methods: {
    openNumQueue() {
      this.wsNumQueue = new WebSocket(server().ws.numQueue);
      this.wsNumQueue.onopen = () => console.log("num queue open")
      this.wsNumQueue.onmessage = (e) => {
        const data = JSON.parse(e.data);
        console.log(data);
        this.num = data['numberOfQueue'];
      }
      this.wsNumQueue.onerror = (error) => console.log(error)
      this.wsNumQueue.onclose = () => console.log("num queue close")
    },
    openMostStaningTime() {
      this.wsMostStaningTime = new WebSocket(server().ws.mostStaningTime);
      this.wsMostStaningTime.onopen = () => console.log("most staning time open")
      this.wsMostStaningTime.onmessage = (e) => {
        const data = JSON.parse(e.data);
        console.log(data);
        this.stayTime = data['mostStaningTime'];
      }
      this.wsMostStaningTime.onerror = (error) => console.log(error)
      this.wsMostStaningTime.onclose = () => console.log("most staning time close")
    },
    openLatestDay() {
      this.wsLatestDay = new WebSocket(server().ws.latestDay);
      this.wsLatestDay.onopen = () => console.log("latest day open")
      this.wsLatestDay.onmessage = (e) => {
        const data = JSON.parse(e.data);
        console.log(data);
        this.chartData.datasets[0].data = data['population'];
      }
      this.wsLatestDay.onerror = (error) => console.log(error)
      this.wsLatestDay.onclose = () => console.log("latest day close")
    },
    submitWaitNumber() {
      this.axios.get(server().http.setWaitNumber, {params: {waitNumber: this.numLimit}})
          .then(res => {
            console.log(res);
          })
          .catch(e => {
            console.log(e)
          })
    },
    submitWaitTime() {
      this.axios.get(server().http.setWaitTime, {params: {waitTime: this.stayTimeLimit}})
          .then(res => console.log(res))
          .catch(e => console.log(e))
    },
    submitContactTime() {
      this.axios.get(server().http.setContactTime, {params: {contactTime: this.contactTimeLimit}})
          .then(res => console.log(res))
          .catch(e => console.log(e))
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
  color: #ffffff;
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
  height: 20px;
  padding: 5px 8px;
  margin: 4px 0;
}

.self-service-area-wrapper .row > div > form > input {
  width: 40px;
  height: 20px;
  padding: 5px 8px;
  margin: 4px 0;
}

.self-service-area-wrapper .stay-time {
  height: 100%;
  margin-left: 10px;
  background: #ffffff;
}
</style>