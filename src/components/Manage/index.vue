<template>
  <div class="manage-container">
    <label>
      <select v-model="topic" name="topic">
        <option value="entry" selected>entry</option>
        <option value="dangerous_goods">dangerous_goods</option>
      </select>
      <button @click="selectTopic">Send</button>
    </label>
    <div ref="cv">
      <canvas width="800" height="600" style="background: #ffffff">
      </canvas>
    </div>
  </div>
</template>

<script>
import {server} from "../../../config";
import icbc from '@/assets/img/icbc.jpg'

export default {
  name: "Manage",
  data() {
    return {
      topic: '',
      arr: [],
      bgImg: null,
      canvasHistory: [],
    }
  },
  mounted() {
    const res = {data: {img: icbc}}
    const data = res.data;
    let cv = this.$refs.cv.children[0];
    let ctx = cv.getContext('2d')

    ctx.lineWidth = 3;
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'red';
    console.log(ctx);
    ctx.beginPath();

    this.bgImg = new Image();
    this.bgImg.src = data['img'];
    this.bgImg.onload = () => {ctx.drawImage(this.bgImg, 0, 0, 800, 600)}
    document.oncontextmenu = () => false;
    this.$refs.cv.onmousedown = (e) => {
      console.log(e)
      // 左键点击绘图
      if (e.buttons === 1) {
        let [x, y] = [e.clientX - cv.offsetLeft, e.clientY - cv.offsetTop]
        if (this.arr.length > 0) {
          // 已经有点了
          if (this.minDistance([x, y], this.arr[0])) {
            [x, y] = this.arr[0];
          }
          this.arr.push([x, y]);
          this.canvasHistory.push(cv.toDataURL());
          ctx.lineTo(x, y);
          ctx.stroke();
          console.log("1:", this.arr);
          console.log(this.canvasHistory.length);
        } else {
          // 第一个点
          this.arr.push([x, y]);
          this.canvasHistory.push(cv.toDataURL());
          ctx.arc(x, y, 1, 0, 2 * Math.PI);
          ctx.stroke();
          ctx.moveTo(x, y);
          console.log("0:", this.arr);
          console.log(this.canvasHistory.length);
        }
      } else if (e.buttons === 2) {
        // 右键点击取消
        this.$refs.cv.removeChild(cv);
        cv = document.createElement('canvas');
        cv.width = 800;
        cv.height = 600;
        ctx = cv.getContext('2d');
        this.$refs.cv.appendChild(cv);

        this.arr.pop();
        const canvasImg = new Image();
        canvasImg.src = this.canvasHistory.pop();
        console.log(this.canvasHistory.length);
        console.log(cv, ctx)
        canvasImg.onload = () => {
          ctx.drawImage(canvasImg, 0, 0, 800, 600);
          ctx.beginPath();
          ctx.moveTo(...this.arr[this.arr.length - 1]);
        }
      }
      // document.onmousemove = function (e) {
      //   var e = e || window.event;
      //   ctx.lineTo(e.clientX - cv.offsetLeft, e.clientY - cv.offsetTop);
      //   ctx.stroke();
      // }
      // document.onmouseup = function () {
      //   document.onmousemove = null;
      //   document.onmouseup = null;
      // }
    }
  },
  methods: {
    selectTopic() {
      this.axios.get(server().http.areaHandle, {params: {flag: 'get_image', topic: this.topic}})
        .then(res => {
          const data = res.data;
          let ctx = this.$refs.cv.getContext('2d')
          ctx.drawImage('data:image/png;base64,' + data['img'])
        })
    },
    selectArea() {

    },
    minDistance(pos1, pos2) {
      const dx = pos1[0] - pos2[0];
      const dy = pos1[1] - pos2[1];
      console.log(dx * dx + dy * dy)
      return dx * dx + dy * dy < 1024;
    }
  }
}
</script>

<style lang="scss" scoped>
.manage-container {
  height: calc(100vh - 48px);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  label {
    margin-bottom: 1rem;
  }
}
</style>