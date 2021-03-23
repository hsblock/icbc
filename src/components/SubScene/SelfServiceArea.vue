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
            <span>{{ stayTime }} 分钟</span>
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
            <span>{{ contactTime }} 分钟</span>
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
      <div class="stay-time-container">
        <div v-if="loading" class="loading"></div>
        <canvas ref="chart" class="stay-time"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js'
import {server} from "../../../config";

export default {
  name: "SelfServiceArea",
  data() {
    return {
      num: '',
      numLimit: '',
      numVisible: false,
      stayTime: '',
      stayTimeLimit: '',
      stayVisible: false,
      contactTime: '',
      contactTimeLimit: '',
      contactVisible: false,
      wsNumQueue: null,
      wsMostStandingTime: null,
      wsMostContactTime: null,
      chart: null,
      chartConfig: {
        type: 'line',
        data: {
          labels: [],
          datasets: [{
            label: '排队人数统计',
            fill: false,
            backgroundColor: 'rgb(54, 162, 235)',
            borderColor: 'rgb(54, 162, 235)',
            data: [],
            yAxisID: 'y1'
          },{
            label: '排队时间统计',
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [],
            yAxisID: 'y2'
          }],
        },
        options: {
          responsive: true,
          interaction: {
            mode: 'index'
          },
          stacked: false,
          maintainAspectRatio: false,
          scales: {
            xAxes: [{
              display: true,
              ticks: {
                maxRotation: 0,
                autoSkip: false,
                callback: function (dataLabel, index) {
                  return +(dataLabel.split(':')[1]) % 15 === 0 ? dataLabel : null;
                }
              }
            }],
            yAxes: [{
              id: 'y1',
              position: 'left',
              offsetGridLines: true
            }, {
              id: 'y2',
              position: 'right',
              offsetGridLines: true
            }],
          }
        }
      },
      maxCount: 60,
      loading: true
    }
  },
  mounted() {
    this.newChart();
    this.getWaitArray();
    setInterval(this.getWaitArray, 1000 * 60);
    this.openWebSocket();
    this.getInitialData();
  },
  beforeDestroy() {
    this.wsNumQueue && this.wsNumQueue.close(1000, 'num queue destroy');
    this.wsMostStandingTime && this.wsMostStandingTime.close(1000, 'most standing time destroy');
    this.wsMostContactTime && this.wsMostContactTime.close(1000, 'most contact time destroy');
  },
  methods: {
    openWebSocket() {
      this.openNumQueue();
      this.openMostStandingTime();
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
    openMostStandingTime() {
      this.wsMostStandingTime = new WebSocket(server().ws.mostStandingTime);
      this.wsMostStandingTime.onopen = () => console.log("most standing time open")
      this.wsMostStandingTime.onmessage = (e) => {
        const data = JSON.parse(e.data);
        console.log(data);
        this.stayTime = data['mostStandingTime'];
      }
      this.wsMostStandingTime.onerror = (error) => console.log(error)
      this.wsMostStandingTime.onclose = () => console.log("most standing time close")
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
    submitWaitNumber() {
      this.axios.get(server().http.setWaitNumber, {params: {waitNumber: this.numLimit}})
          .then(res => {
            console.log(res);
            this.getWaitNumber().then(() => {
              this.$message({type: 'success', message: `最大排队人数成功被设置为${this.numLimit}`});
            })
            this.numVisible = false;
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
            this.getWaitTime().then(() => {
              this.$message({type: 'success', message: `停留时间上限成功被设置为${this.stayTimeLimit}`})
            })
            this.stayVisible = false;
          })
          .catch(e => {
            console.error(e.message);
            this.$message({type: 'error', message: '设置停留时间上限失败'})
          })
    },
    submitContactTime() {
      this.axios.get(server().http.setContactTime, {params: {contactTime: this.contactTimeLimit}})
          .then(res => {
            console.log(res);
            this.getContactTime().then(() => {
              this.$message({type: 'success', message: `接触时间上限成功被设置为${this.contactTimeLimit}`})
            })
            this.contactVisible = false;
          })
          .catch(e => {
            console.error(e.message)
            this.$message({type: 'error', message: '设置接触时间上限失败'})
          })
    },
    getWaitNumber() {
      return this.axios.get(server().http.getWaitNumber)
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
      return this.axios.get(server().http.getWaitTime)
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
      return this.axios.get(server().http.getContactTime)
          .then(res => {
            const data = res.data;
            console.log(data);
            this.contactTimeLimit = data['contactTime'];
          })
          .catch(e => {
            console.error(e.message);
          })
    },
    getWaitArray() {
      this.axios.get(server().http.getWaitArray)
          .then(res => {
            const data = res.data;
            console.log(data);
            const waitTimeArray = data['waitTimeArray'];
            const waitNumberArray = data['waitNumberArray'];
            let time = new Date();
            let [year, month, date, hour, minute] = [
              time.getFullYear(), time.getMonth(), time.getDate(), time.getHours(), time.getMinutes()
            ]
            const label = Array.from({length: this.maxCount}).map((_, i) => {
              let temp = new Date(year, month, date, hour, minute - i);
              return `${temp.getHours()}:${temp.getMinutes().toString().padStart(2, '0')}`;
            });
            label.reverse();

            const lastWaitNumberArray = this.chartConfig.data.datasets[0].data;
            const lastWaitTimeArray = this.chartConfig.data.datasets[1].data;
            const lastLabel = this.chartConfig.data.labels;
            if (lastLabel.length === 0) {
              // 初始化时
              this.chartConfig.data.datasets[0].data = waitNumberArray;
              this.chartConfig.data.datasets[1].data = waitTimeArray;
              this.chartConfig.data.labels = label;
            } else {
              let lastTime = lastLabel[lastLabel.length - 1];
              // 当前展示时间表的最大时间值在新时间表中的位置
              let index = label.indexOf(lastTime);
              let newCount = this.maxCount - (index + 1);
              [
                [lastWaitNumberArray, waitNumberArray],
                [lastWaitTimeArray, waitTimeArray],
                [lastLabel, label]
              ].forEach(([lastArr, arr]) => {
                lastArr.splice(0, newCount);
                lastArr.splice(lastArr.length, 0, ...arr.slice(index + 1));
              })
            }
            this.chart.update();
            this.loading = false;
          })
          .catch(e => {
            console.error(e);
          })
    },
    newChart() {
      let ctx = this.$refs.chart.getContext('2d');
      this.chart = new Chart(ctx, this.chartConfig);
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
    justify-content: space-around;
    padding: 10px;
    box-sizing: border-box;

    .column {
      display: flex;
      flex-direction: column;
      width: 30%;
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
            width: 4rem;
            height: 28px;
            line-height: 28px;
            padding: 4px 6px;
            margin: 0.375rem 0;
          }
        }

        &:last-child {

          > span:nth-child(2) {
            background: #fff;
            border-radius: 2px;
            color: #606266;
            cursor: pointer;
            transition: 0.1s;
            width: 4rem;
            height: 1.75rem;
            line-height: 1.75rem;
            padding: 4px 6px;
            margin: 0.375rem 0;

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

    .stay-time-container {
      position: relative;
      max-width: 30vw;

      .stay-time {
        height: 100%;
        margin-left: 10px;
        background: rgb(255, 255, 255);
      }
    }
  }
}
</style>