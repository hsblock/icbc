<template>
  <div class="manage-container">
    <label>
      <select v-model="topic" name="topic">
        <option value="entry" selected>entry</option>
        <option value="dangerous_goods">dangerous_goods</option>
      </select>
      <button @click="selectTopic">Send Topic</button>
      <button @click="selectArea">Send Area</button>
    </label>
    <div ref="cv" class="canvas-container">
      <canvas width="800" height="600">
      </canvas>
      <canvas width="800" height="600">
      </canvas>
    </div>
  </div>
</template>

<script>
import {server} from "../../../config";
import icbc from '@/assets/img/icbc.jpg';

export default {
  name: "Manage",
  data() {
    return {
      topic: '',
      arr: [],
      bgImg: null,
    }
  },
  mounted() {
    const res = {data: {img: icbc}}
    const data = res.data;
    let cv = this.$refs.cv.children[0];
    let ctx = cv.getContext('2d')
    let cv1 = this.$refs.cv.children[1];
    let ctx1 = cv1.getContext('2d')

    ctx.lineWidth = 3;
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'red';
    ctx.beginPath();

    this.bgImg = new Image();
    this.bgImg.src = data['img'];
    this.bgImg.onload = () => {
      ctx1.drawImage(this.bgImg, 0, 0, 800, 600)
    }
    document.oncontextmenu = () => false;
    const rects = cv.getBoundingClientRect();
    cv.onmousedown = (e) => {
      console.log(e)
      // 左键点击绘图
      if (e.buttons === 1) {
        let [x, y] = [Math.round(e.clientX - rects.left), Math.round(e.clientY - rects.top)];
        if (this.arr.length > 0) {
          // 已经有点了
          if (this.minDistance([x, y], this.arr[0])) {
            [x, y] = this.arr[0];
          }
          this.arr.push([x, y]);
          ctx.lineTo(x, y);
          ctx.stroke();
          console.log("1:", this.arr);
        } else {
          // 第一个点
          this.arr.push([x, y]);
          ctx.arc(x, y, 1, 0, 2 * Math.PI);
          ctx.stroke();
          ctx.moveTo(x, y);
          console.log("0:", this.arr);
        }
      } else if (e.buttons === 2) {
        // 右键点击取消
        if (this.arr.length > 0) {
          ctx.closePath();
          ctx.beginPath();
          ctx.clearRect(0, 0, 800, 600);

          this.arr.pop()
          this.arr.forEach(([x, y], i) => {
            if (i === 0) {
              ctx.arc(x, y, 1, 0, 2 * Math.PI);
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          })
          ctx.stroke();
        }
      }
    }
  },
  methods: {
    selectTopic() {
      this.axios.get(server().http.areaHandle, {params: {flag: 'get_image', topic: this.topic}})
          .then(res => {
            const data = res.data;
            console.log(data)
            let ctx = this.$refs.cv.children[1].getContext('2d');
            const img = new Image();
            img.src = 'data:image/png;base64,' + data['img'];
            img.onload = () => {
              ctx.drawImage(img, 0, 0, 800, 600);
            }
            this.$message.success('选取主题成功');
          })
          .catch(e => {
            this.$message.error('选取主题失败');
            console.error(e);
          })
    },
    selectArea() {
      setInterval(() => {
        this.axios.post(server().http.areaHandle,
            {flag: 'send_area', topic: this.topic, area: this.arr, size: [800, 600]})
            .then(res => {
              const data = res.data;
              console.log(data);
              this.$message.success('选取区域成功');
            })
            .catch(e => {
              this.$message.error('选取区域失败');
              console.error(e);
            })
      }, 2000)
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

  .canvas-container {
    position: relative;

    canvas:nth-child(1) {
      position: relative;
      background: rgba(255, 255, 255, 0);
      z-index: 10;
    }

    canvas:nth-child(2) {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }
  }

  label {
    margin-bottom: 1rem;
  }
}
</style>