<template>
  <div class="lost">
    <h4>遗留物品</h4>
    <transition-group
        name="leftovers"
        tag="div"
        appear
        duration="500"
        class="lost-wrapper"
    >
      <div v-for="item in lost" :key="item.key" class="lost-item">
        <img :src="item.img" alt="">
      </div>
    </transition-group>
  </div>
</template>

<script>
import {server} from "../../../../config";

export default {
  name: "Leftover",
  data() {
    return {
      lost: [],
      key: 0,
      wsLeftover: null,
    }
  },
  mounted() {
    this.openLeftover();
  },
  beforeDestroy() {
    this.wsLeftover && this.wsLeftover.close(1000, 'leftover close');
  },
  methods: {
    openLeftover() {
      this.wsLeftover = new WebSocket(server().ws.leftover);
      this.wsLeftover.onopen = () => console.log("leftover open")
      this.wsLeftover.onmessage = (e) => {
        const data = JSON.parse(e.data);
        console.log(data);
        this.lost.splice(0, this.lost.length);
        data.forEach((item) => {
          this.lost.push({
            img: `data:image/png;base64,${item[0]}`,
            key: ++this.key
          })
        })
      }
      this.wsLeftover.onerror = (error) => console.log(error)
      this.wsLeftover.onclose = () => console.log("leftover close")
    },
  }
}
</script>

<style lang="scss" scoped>
.lost {
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

  .lost-wrapper {
    text-align: center;
    flex: 1;

    .lost-item {
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

.leftovers-enter {
  opacity: 0;
  transform: translateX(100%) scale(0.7);
}

.leftovers-leave-to {
  opacity: 0;
  transform: translateX(-100%) scale(0.7);
}

.leftovers-leave-active {
  position: absolute;
}
</style>