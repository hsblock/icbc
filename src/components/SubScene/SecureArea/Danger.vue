<template>
  <div class="danger">
    <h4>危险物品</h4>
    <transition-group
        name="dangers"
        tag="div"
        appear
        duration="500"
        class="danger-wrapper"
    >
      <div v-for="item in danger" :key="item.key" class="danger-item">
        <img :src="item.img" alt="">
        <div>{{ item.name }}</div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import {server} from "../../../../config";

export default {
  name: "Danger",
  data() {
    return {
      danger: [],
      key: 0,
      wsAbnormal: null
    }
  },
  mounted() {
    this.openAbnormal();
  },
  beforeDestroy() {
    this.wsAbnormal && this.wsAbnormal.close(1000, 'abnormal destroy');
  },
  methods: {
    openAbnormal() {
      this.wsAbnormal = new WebSocket(server().ws.abnormal);
      this.wsAbnormal.onopen = () => console.log("abnormal open")
      this.wsAbnormal.onmessage = (e) => {
        const data = JSON.parse(e.data);
        console.log(data);
        this.danger.splice(0, this.danger.length);
        data.forEach((item) => {
          this.danger.push({
            name: item[0],
            img: `data:image/png;base64,${item[1]}`,
            key: ++this.key
          })
        })
      }
      this.wsAbnormal.onerror = (error) => console.log(error)
      this.wsAbnormal.onclose = () => console.log("abnormal close")
    }
  }
}
</script>

<style lang="scss" scoped>
.danger {
  display: flex;
  align-items: center;
  background: #eeeeee;
  padding: 5px 10px;
  border-radius: 10px;
  color: black;
  height: calc(50% - 0.5rem - 10px);

  h4 {
    margin: 0;
    width: 20px;
    line-height: 20px;
  }

  .danger-wrapper {
    text-align: center;
    flex: 1;

    .danger-item {
      display: inline-block;
      margin: 0 10px;
      transition: opacity .3s, transform .4s;

      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
  }
}

.dangers-enter {
  opacity: 0;
  transform: translateX(100%) scale(0.7);
}

.dangers-leave-to {
  opacity: 0;
  transform: translateX(-100%) scale(0.7);
}

.dangers-leave-active {
  position: absolute;
}
</style>