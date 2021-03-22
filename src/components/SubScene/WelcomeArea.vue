<template>
  <div class="welcome-area-container">
    <h2>迎宾区域</h2>
    <div class="welcome-area-wrapper">
      <div class="staff-wrapper">
        <div class="title">
          值班员工
        </div>
        <div class="infos">
          <div class="staff">
            <div class="staff-info">
              <img :src="staff.img" alt="">
            </div>
            <div class="time">
              <span>状态:</span>
              <span>{{ staff.status }}</span>
            </div>
            <div class="time leave-time-limit">
              <span>离岗时间上限:</span>
              <span @click="staff.leaveTimeVisible = true">
                {{ staff.leaveTimeLimit }}
              </span>
              <bshz-dialog :visible.sync="staff.leaveTimeVisible">
                <span slot="title">设置离岗时间上限</span>
                <form action="" @submit.prevent="submitLeaveTime">
                  离岗时间上限:
                  <input v-model="staff.leaveTimeLimit" type="text">
                </form>
                <span slot="footer">
                <button class="cancel" @click="staff.leaveTimeVisible = false">
                  取消
                </button>
                <button class="confirm" @click="submitLeaveTime">确定</button>
              </span>
              </bshz-dialog>
            </div>
          </div>
        </div>
      </div>
      <div class="leave-time-container">
        <div v-if="loading" class="loading"></div>
        <canvas ref="chart" class="leave-time"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import {server} from "../../../config";
import Chart from "chart.js";

export default {
  name: "WelcomeArea",
  data() {
    return {
      staff: {
        img: '',
        status: '',
        leaveTimeLimit: '0',
        leaveTimeVisible: false
      },
      ws: null,
      chartConfig: {
        type: 'line',
        data: {
          labels: Array.from({length: 9}).map((_, i) => 9 + i),
          datasets: [
            {
              label: '离岗时间统计',
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
    this.getOfflineArray();
    setInterval(() => {
      this.getOfflineArray();
    }, 1000 * 60 * 5);
    this.openWebSocket();
    this.getLeaveTime();
    this.getStaff();
  },
  beforeDestroy() {
    this.ws && this.ws.close(1000, 'manager status destroy');
  },
  methods: {
    newChart() {
      let ctx = this.$refs.chart.getContext('2d');
      this.chart = new Chart(ctx, this.chartConfig);
    },
    openWebSocket() {
      this.ws = new WebSocket(server().ws.managerStatus);
      this.ws.onopen = () => console.log('open');
      this.ws.onmessage = (e) => {
        const data = JSON.parse(e.data);
        console.log(data);
        this.staff.status = data['status'];
      }
      this.ws.onclose = () => console.log('close');
      this.ws.onerror = (error) => console.log(error);
    },
    getStaff() {
      this.axios.get(server().http.getStaff, {params: {flag: 'get_pattern', topic: 'manager'}})
          .then(res => {
            const data = res.data;
            this.staff.img = "data:image/png;base64," + data['img'];
          })
          .catch(e => {
            console.error(e);
          })
    },
    submitLeaveTime() {
      this.axios.get(server().http.setLeaveTime, {params: {leaveTime: this.staff.leaveTimeLimit}})
          .then(res => {
            console.log(res);
            this.getLeaveTime().then(() => {
              this.$message.success('离岗时间上限成功被设置为' + this.staff.leaveTimeLimit);
            })
            this.staff.leaveTimeVisible = false;
          })
          .catch((e) => {
            console.error(e.message);
            this.$message.error('离岗时间上限设置失败');
          })
    },
    getLeaveTime() {
      return this.axios.get(server().http.getLeaveTime)
          .then(res => {
            const data = res.data;
            console.log(data);
            this.staff.leaveTimeLimit = data['leaveTime'];
          })
          .catch(e => {
            console.error(e.message);
          })
    },
    getOfflineArray() {
      this.axios.get(server().http.getOfflineArray)
          .then(res => {
            const data = res.data;
            console.log(data);
            const offlineTimeArray = data['offlineTimeArray'];
            let count = new Date().getHours() - 8;
            this.chartConfig.data.datasets[0].data = offlineTimeArray.slice(0, count);
            this.chart.update();
            this.loading = false;
          })
          .catch(e => {
            console.error(e);
          })
    }
  }
}
</script>

<style lang="scss" scoped>
.welcome-area-container {
  color: #ffffff;
  padding: 0.5rem;
  margin: 0 0.5rem 0.5rem 0;
  background: #061123;
  border-radius: 5px;
  height: 50%;
}

.welcome-area-container > h2 {
  margin: 0;
}

.welcome-area-wrapper {
  display: flex;
  height: calc(100% - 32px);
  justify-content: space-around;
  padding: 10px;
  box-sizing: border-box;

  .leave-time-container {
    position: relative;
    width: 30vw;
    max-width: 30vw;
  }
}

.staff-wrapper {
  .title {
    text-align: center;
    margin-bottom: 0.5rem;
  }
}

.staff-wrapper .staff-info {
  display: flex;
  height: 150px;
}

.staff-info {
  img {
    width: 50px;
    height: 150px;
    margin: auto;
  }
  img[src=''] {
    opacity: 0;
  }
}

.staff .time:nth-child(2) {
  margin: 0.875rem 0;
}

.staff {
  .time {
    display: flex;
    align-items: center;

    > span:first-child {
      width: 110px;
      display: inline-block;
      text-align: right;
      padding-right: 0.5rem;
    }

    > span:last-child {
      display: inline-block;
      width: 60px;
      height: 2.25rem;
      line-height: 1.25rem;
      box-sizing: border-box;
      text-align: center;
      background: #4BC0C0;
      padding: 0.5rem;
    }

    &.leave-time-limit {

      span:nth-child(2) {
        background: #fff;
        border-radius: 2px;
        border: 1px solid #dcdfe6;
        color: #606266;
        display: inline-block;
        box-sizing: border-box;
        text-align: center;
        width: 60px;
        height: 2.25rem;
        line-height: 1.25rem;
        padding: 0.5rem;
        cursor: pointer;
        transition: 0.1s;

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

.leave-time-container {
  height: 100%;

  .leave-time {
    background: #ffffff;
  }
}
</style>