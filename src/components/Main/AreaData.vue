<template>
  <div class="area-data-container">
    <h2>区域统计数据</h2>
    <div class="area-data-wrapper">
      <div class="area-data-items">
        <div class="title">自助区域</div>
        <div class="content">
          <div>当前排队人数:  {{ self.num }}</div>
          <div>最长停留时间: {{ self.maxSTime }} 分钟</div>
          <div>最长接触时间: {{ self.maxCTime }} 分钟</div>
        </div>
      </div>
      <div class="area-data-items">
        <div class="title">安防区域</div>
        <div class="content">
          <div>可疑危险物品:  {{ safe.danger }}</div>
          <div>检测遗留物品:  {{ safe.lost }}</div>
        </div>
      </div>
      <div class="area-data-items">
        <div class="title">迎宾区域</div>
        <div class="content">
          <div>值班员工:  {{ manager.staff }}</div>
          <div>员工状态:  {{ manager.status }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {server} from "../../../config";

export default {
  name: "AreaData",
  data() {
    return {
      safe: {
        danger: '手枪',
        lost: '手机'
      },
      self: {
        num: 0,
        maxSTime: 0,
        maxCTime: 0
      },
      manager: {
        staff: '张三',
        status: ''
      },
      wsNumQueue: null,
      wsMostStandingTime: null,
      wsAbnormal: null,
      wsLeftover: null,
      wsManagerStatus: null,
      wsMostContactTime: null
    }
  },
  mounted() {
    this.openWebSocket();
  },
  beforeDestroy() {
    this.closeWebSocket();
  },
  methods: {
    openWebSocket() {
      this.openAbnormal();
      this.openLeftover();
      this.openManagerStatus();
      this.openMostStandingTime();
      this.openNumQueue();
      this.openMostContactTime();
    },
    closeWebSocket() {
      this.wsNumQueue && this.wsNumQueue.close(1000, 'num queue destroy');
      this.wsMostStandingTime && this.wsMostStandingTime.close(1000, 'most staning time destroy');
      this.wsAbnormal && this.wsAbnormal.close(1000, 'abnormal destroy');
      this.wsLeftover && this.wsLeftover.close(1000, 'leftover destroy');
      this.wsManagerStatus && this.wsManagerStatus.close(1000, 'manager status destroy');
      this.wsMostContactTime && this.wsMostContactTime.close(1000, 'most contact time destroy');
    },
    openNumQueue() {
      this.wsNumQueue = new WebSocket(server().ws.numQueue);
      this.wsNumQueue.onopen = () => console.log("num queue open")
      this.wsNumQueue.onmessage = (e) => {
        const data = JSON.parse(e.data);
        console.log(data);
        this.self.num = data['numberOfQueue'];
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
        this.self.maxSTime = data['mostStandingTime'];
      }
      this.wsMostStandingTime.onerror = (error) => console.log(error)
      this.wsMostStandingTime.onclose = () => console.log("most standing time close")
    },
    openAbnormal() {
      this.wsAbnormal = new WebSocket(server().ws.abnormal);
      this.wsAbnormal.onopen = () => console.log("abnormal open")
      this.wsAbnormal.onmessage = (e) => {
        const data = JSON.parse(e.data);
        console.log(data);
        this.safe.danger = data['name'];
      }
      this.wsAbnormal.onerror = (error) => console.log(error)
      this.wsAbnormal.onclose = () => console.log("abnormal close")
    },
    openLeftover() {
      this.wsLeftover = new WebSocket(server().ws.leftover);
      this.wsLeftover.onopen = () => console.log("leftover open")
      this.wsLeftover.onmessage = (e) => {
        const data = JSON.parse(e.data);
        console.log(data);
        this.safe.lost = data['name'];
      }
      this.wsLeftover.onerror = (error) => console.log(error)
      this.wsLeftover.onclose = () => console.log("leftover close")
    },
    openManagerStatus() {
      this.wsManagerStatus = new WebSocket(server().ws.managerStatus);
      this.wsManagerStatus.onopen = () => console.log("manager status open")
      this.wsManagerStatus.onmessage = (e) => {
        const data = JSON.parse(e.data);
        console.log(data);
        this.manager.status = data['status'];
      }
      this.wsManagerStatus.onerror = (error) => console.log(error)
      this.wsManagerStatus.onclose = () => console.log("manager status close")
    },
    openMostContactTime() {
      this.wsMostContactTime = new WebSocket(server().ws.mostContactTime);
      this.wsMostContactTime.onopen = () => console.log("most contact time open")
      this.wsMostContactTime.onmessage = (e) => {
        const data = JSON.parse(e.data);
        console.log(data);
        this.self.maxCTime = data['mostContactTime'];
      }
      this.wsMostContactTime.onerror = (error) => console.log(error)
      this.wsMostContactTime.onclose = () => console.log("most contact time close")
    }
  }
}
</script>

<style lang="scss" scoped>
.area-data-container {
  height: 39%;
  color: #ffffff;
  background: #061123;
  border-radius: 5px;
  margin: 0 0.5rem 0.5rem;

  .area-data-wrapper {
    display: flex;
    justify-content: space-around;

    .area-data-items {
      display: flex;
      flex-direction: column;
      background: #ffffff;
      color: #000000;
      border-radius: 0.25rem;

      .title {
        padding: 0.875rem;
        border-bottom: 1px solid #dadce0;
        font-size: 1.125rem;
        font-weight: 600;
      }

      .content {
        padding: 1.125rem;
        font-size: 1rem;
        width: 10rem;

        div {
          margin-bottom: 0.5rem;
        }
      }
    }
  }
}
</style>