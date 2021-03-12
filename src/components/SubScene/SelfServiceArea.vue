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
            <span @click="numVisible = true">{{ numLimit }}</span>
            <bshz-dialog :visible.sync="numVisible">
              <span slot="title">设置排队人数上限</span>
              <form action="" @submit.prevent="submitWaitNumber">
                排队人数上限:
                <input v-model="numLimit" type="text">
              </form>
              <span slot="footer">
                <button class="cancel" @click="numVisible = false">
                  取消
                </button>
                <button class="confirm" @click="submitWaitNumber">确定</button>
              </span>
            </bshz-dialog>
          </div>
        </div>
        <div class="row">
          <div>
            <span>最长停留时间</span>
            <span>{{ stayTime }}</span>
          </div>
          <div>
            <span>停留时间上限</span>
            <span @click="stayVisible = true">{{ stayTimeLimit }}</span>
            <bshz-dialog :visible.sync="stayVisible">
              <span slot="title">设置停留时间上限</span>
              <form action="" @submit.prevent="submitWaitTime">
                停留时间上限:
                <input v-model="stayTimeLimit" type="text">
              </form>
              <span slot="footer">
                <button class="cancel" @click="stayVisible = false">
                  取消
                </button>
                <button class="confirm" @click="submitWaitTime">确定</button>
              </span>
            </bshz-dialog>
          </div>
        </div>
        <div class="row">
          <div>
            <span>最长接触时间</span>
            <span>{{ contactTime }}</span>
          </div>
          <div>
            <span>接触时间上限</span>
            <span @click="contactVisible = true">{{ contactTimeLimit }}</span>
            <bshz-dialog :visible.sync="contactVisible">
              <span slot="title">设置接触时间上限</span>
              <form action="" @submit.prevent="submitContactTime">
                接触时间上限:
                <input v-model="contactTimeLimit" type="text">
              </form>
              <span slot="footer">
                <button class="cancel" @click="contactVisible = false">
                  取消
                </button>
                <button class="confirm" @click="submitContactTime">确定</button>
              </span>
            </bshz-dialog>
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
      numLimit: 0,
      numVisible: false,
      stayTime: 5,
      stayTimeLimit: 0,
      stayVisible: false,
      contactTime: '无',
      contactTimeLimit: 0,
      contactVisible: false,
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
      wsmostStandingTime: null,
      wsLatestDay: null,
      wsMostContactTime: null
    }
  },
  mounted() {
    this.openWebSocket();
    this.getInitialData();
  },
  beforeDestroy() {
    this.wsNumQueue && this.wsNumQueue.close(1000, 'num queue destroy');
    this.wsmostStandingTime && this.wsmostStandingTime.close(1000, 'most staning time destroy');
    this.wsLatestDay && this.wsLatestDay.close(1000, 'latest day destroy');
    this.wsMostContactTime && this.wsMostContactTime.close(1000, 'most contact time destroy');
  },
  methods: {
    openWebSocket() {
      this.openNumQueue();
      this.openmostStandingTime();
      this.openLatestDay();
      this.openMostContactTime();
    },
    getInitialData() {
      this.getContactTime();
      this.getWaitNumber();
      this.getWaitTime();
    },
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
    openmostStandingTime() {
      this.wsmostStandingTime = new WebSocket(server().ws.mostStandingTime);
      this.wsmostStandingTime.onopen = () => console.log("most staning time open")
      this.wsmostStandingTime.onmessage = (e) => {
        const data = JSON.parse(e.data);
        console.log(data);
        this.stayTime = data['mostStandingTime'];
      }
      this.wsmostStandingTime.onerror = (error) => console.log(error)
      this.wsmostStandingTime.onclose = () => console.log("most staning time close")
    },
    openMostContactTime() {
      this.wsMostContactTime = new WebSocket(server().ws.mostContactTime);
      this.wsMostContactTime.onopen = () => console.log("most contact time open")
      this.wsMostContactTime.onmessage = (e) => {
        const data = JSON.parse(e.data);
        console.log(data);
        this.contactTime = data['mostContactTime'];
      }
      this.wsMostContactTime.onerror = (error) => console.log(error)
      this.wsMostContactTime.onclose = () => console.log("most contact time close")
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
            this.$message({type: 'success', message: `最大排队人数成功被设置为${this.numLimit}`})
          })
          .catch(e => {
            console.error(e.message);
            this.$message({type: 'error', message: '设置排队人数上限失败'})
          })
    },
    submitWaitTime() {
      this.axios.get(server().http.setWaitTime, {params: {waitTime: this.stayTimeLimit}})
          .then(res => {
            console.log(res);
            this.$message({type: 'success', message: `停留时间上限成功被设置为${this.numLimit}`})
          })
          .catch(e => {
            console.error(e.message);
            this.$message({type: 'error', message: '设置停留时间上限失败'})
          })
    },
    submitContactTime() {
      this.axios.get(server().http.setContactTime, {params: {contactTime: this.contactTimeLimit}})
          .then(res => {
            console.log(res)
            this.$message({type: 'success', message: `接触时间上限成功被设置为${this.numLimit}`})
          })
          .catch(e => {
            console.error(e.message)
            this.$message({type: 'error', message: '设置接触时间上限失败'})
          })
    },
    getWaitNumber() {
      this.axios.get(server().http.getWaitNumber)
          .then(res => {
            const data = res.data;
            console.log(data)
            this.numLimit = data['waitNumber'];
          })
          .catch(e => {
            console.error(e.message);
          })
    },
    getWaitTime() {
      this.axios.get(server().http.getWaitTime)
          .then(res => {
            const data = res.data;
            console.log(data);
            this.stayTimeLimit = data['waitTime'];
          })
          .catch(e => {
            console.error(e.message);
          })
    },
    getContactTime() {
      this.axios.get(server().http.getContactTime)
          .then(res => {
            const data = res.data;
            console.log(data);
            this.contactTimeLimit = data['contactTime'];
          })
          .catch(e => {
            console.error(e.message);
          })
    }
  }
}
</script>

<style lang="scss" scoped>
.self-service-area-container {
  height: 50%;
  overflow: hidden;
  margin: 0.5rem 0.5rem 0.5rem 0;
  padding: 0.5rem;
  background: #061123;
  border-radius: 5px;
  color: #ffffff;

  h2 {
    margin: 0;
  }

  .self-service-area-wrapper {
    display: flex;
    height: calc(100% - 32px);
    justify-content: space-between;
    padding: 10px;
    box-sizing: border-box;

    .column {
      display: flex;
      flex-direction: column;
      width: 50%;
      margin: 1rem 0;
    }

    .row {
      display: flex;
      justify-content: space-around;

      > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0.25rem 0.5rem;

        > span {
          display: inline-block;
          width: 100px;
          text-align: center;
          border-radius: 2px;

          &:last-child {
            background: #4BC0C0;
            width: 40px;
            height: 20px;
            padding: 5px 8px;
            margin: 4px 0;
          }
        }

        &:last-child {

          > span:nth-child(2) {
            background: #fff;
            border-radius: 2px;
            border: 1px solid #dcdfe6;
            color: #606266;
            cursor: pointer;
            transition: 0.1s;
            width: 40px;
            height: 20px;
            padding: 5px 8px;
            margin: 4px 0;

            &:hover {
              color: #409eff;
              border-color: #c6e2ff;
              background: #ecf5ff;
            }

            &:active {
              color: #3a8ee6;
              border-color: #3a8ee6;
              outline: none;
            }
          }

          form {
            display: inline-block;

            input {
              height: 32px;
              width: 100px;
              padding: 4px 12px;
              box-sizing: border-box;
              font-size: 1rem;
            }
          }
        }
      }
    }

    .stay-time {
      height: 100%;
      margin-left: 10px;
      background: #ffffff;
    }
  }
}
</style>