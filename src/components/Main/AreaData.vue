<template>
  <div class="area-datas-container">
    <h2>区域统计数据</h2>
    <div class="area-datas-wrapper">
      <div class="area-datas-items">
        <h4>自助区域</h4>
        <span>当前排队人数: {{ self.num }}</span>
        <span>最长停留时间: {{ self.maxSTime }}分钟</span>
        <span>最长接触时间: {{ self.maxATime }}分钟</span>
      </div>
      <div class="area-datas-items">
        <h4>安防区域</h4>
        <span>可疑危险物品: {{ safe.danger }}</span>
        <span>检测遗留物品: {{ safe.lost }}</span>
      </div>
      <div class="area-datas-items">
        <h4>迎宾区域</h4>
        <span>值班员工: {{ manager.staff }}</span>
        <span>最近离岗时长: {{ manager.status }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { server } from "../../../config";

export default {
  name: "AreaData",
  data() {
    return {
      safe: {
        danger: '手枪',
        lost: '手机'
      },
      self: {
        num: 10,
        maxSTime: 10,
        maxATime: '未实现'
      },
      manager: {
        staff: '张三',
        status: '在岗/暂离/离岗'
      },
      wsNumQueue: null,
      wsMostStaningTime: null,
      wsAbnormal: null,
      wsLeftover: null,
      wsManagerStatus: null
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
      this.openAbnormal(1000, 'abnormal close');
      this.openLeftover(1000, 'leftover close');
      this.openManagerStatus(1000, 'manager status close');
      this.openMostStaningTime(1000, 'most staning time close');
      this.openNumQueue(1000, 'num queue close');
    },
    closeWebSocket() {
      this.wsNumQueue && this.wsNumQueue.close(1000, 'num queue destroy');
      this.wsMostStaningTime && this.wsMostStaningTime.close(1000, 'most staning time destroy');
      this.wsAbnormal && this.wsAbnormal.close(1000, 'abnormal destroy');
      this.wsLeftover && this.wsLeftover.close(1000, 'leftover destroy');
      this.wsManagerStatus && this.wsManagerStatus.close(1000, 'manager status destroy');
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
    openMostStaningTime() {
      this.wsMostStaningTime = new WebSocket(server().ws.mostStaningTime);
      this.wsMostStaningTime.onopen = () => console.log("most staning time open")
      this.wsMostStaningTime.onmessage = (e) => {
        const data = JSON.parse(e.data);
        console.log(data);
        this.self.maxSTime = data['mostStaningTime'];
      }
      this.wsMostStaningTime.onerror = (error) => console.log(error)
      this.wsMostStaningTime.onclose = () => console.log("most staning time close")
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
    }
  }
}
</script>

<style scoped>
  .area-datas-container {
    height: 39%;
    color: #dddddd;
    background: #061123;
    border-radius: 5px;
    margin: 0 0.5rem 0.5rem;
  }

  .area-datas-wrapper {
    display: flex;
    justify-content: space-around;
  }

  .area-datas-items {
    display: flex;
    flex-direction: column;
  }
</style>