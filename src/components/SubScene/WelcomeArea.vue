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
              <div class="info">
                <div>姓名: {{ staff.name }}</div>
                <div>工号: {{ staff.age }}</div>
              </div>
            </div>
            <div class="time">
              <span>状态:</span>
              <span>{{ staff.status }}</span>
            </div>
            <div class="time">
              <span>离岗时间上限:</span>
              <form action="" @submit.prevent="submitLeaveTime">
                <input
                    v-model="staff.leaveTimeLimit"
                    type="text"
                />分钟
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="leave-time-chart-wrapper">
        <LineChart
            :chart-data="chartData"
            :options="options"
            class="leave-time-chart"
        />
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from "@/components/Charts/LineChart";
import {server} from "../../../config";

export default {
  name: "WelcomeArea",
  components: {LineChart},
  data() {
    return {
      staff: {
        img: 'data:image/png;base64,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',
        name: '张三',
        age: '20201215',
        status: '...',
        leaveTimeLimit: 20
      },
      ws: null,
      chartData: {
        labels: Array.from({length: 9}).map((_, i) => 9 + i),
        datasets: [
          {
            label: '无 - 离岗时间统计',
            fill: false,
            backgroundColor: '#000',
            borderColor: '#000',
            data: Array.from({length: 9}).map((_, i) => {
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
  },
  mounted() {
    this.openWebSocket();
  },
  beforeDestroy() {
    this.ws && this.ws.close(1000, 'manager status destroy');
  },
  methods: {
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
    submitLeaveTime() {
      this.axios.get(server().http.setLeaveTime, {params: {leaveTime: this.staff.leaveTimeLimit}})
          .then((res) => {
            console.log(res);
            this.$message.success('离岗时间上限成功被设置为' + this.staff.leaveTimeLimit);
          })
          .catch((e) => {
            console.log(e);
            this.$message.error('离岗时间上限设置失败');
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
  justify-content: space-between;
  padding: 10px;
  box-sizing: border-box;
}

.staff-wrapper {
  margin: 0.5rem;
}

.staff-wrapper .title {
  margin: 0.5rem 0;
}

.staff-info {
  display: flex;
  height: 50px;
}

.staff-info img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}

.staff-info .info {
  display: flex;
  flex-direction: column;
  height: 50px;
  justify-content: space-around;
  margin-left: 0.5rem;
}

.staff .time:nth-child(2) {
  margin: 0.875rem 0;
}

.staff {
  .time {
    > span:first-child {
      width: 110px;
      display: inline-block;
      text-align: right;
      padding-right: 0.5rem;
    }

    > span:last-child {
      display: inline-block;
      width: 60px;
      box-sizing: border-box;
      text-align: center;
      background: #4BC0C0;
      padding: 0.5rem;
    }

    > form {
      display: inline-block;

      input {
        display: inline-block;
        width: 60px;
        box-sizing: border-box;
        padding: 0.5rem;
      }
    }
  }
}

.leave-time-chart-wrapper {
  height: 100%;
}

.welcome-area-wrapper .leave-time-chart {
  height: 100%;
  background: #ffffff;
}
</style>