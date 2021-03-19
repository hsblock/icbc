<template>
  <div class="area-select-container">
    <div class="area-select-wrapper">
      <el-select v-model="topic" placeholder="请选择">
        <el-option
            v-for="item in topics"
            :key="item.label"
            :label="item.label"
            :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button type="success" @click="selectTopic">Send Topic</el-button>
      <el-button type="success" @click="selectArea">Send Area</el-button>
    </div>
    <div ref="cv" class="canvas-container">
      <canvas :width="canvasWidth" :height="canvasHeight">
      </canvas>
      <canvas :width="canvasWidth" :height="canvasHeight">
      </canvas>
    </div>
  </div>
</template>

<script>
import icbc from "@/assets/img/icbc.jpg";
import {server} from "../../../config";

export default {
  name: "AreaSelect",
  data() {
    return {
      topic: 'face_area',
      arr: [],
      bgImg: null,
      topics: [
        {label: '进店', value: 'face_area'},
        {label: '排队', value: 'queue_area'},
        {label: '危险物品', value: 'dangerous_area'},
        {label: '遗留物品', value: 'leftover_area'},
        {label: '停留时间', value: 'standing_area'},
        {label: '离岗检测', value: 'offline_area'}
      ],
      canvasWidth: 800,
      canvasHeight: 500
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
      ctx1.drawImage(this.bgImg, 0, 0, this.canvasWidth, this.canvasHeight)
    }
    document.oncontextmenu = () => false;
    cv.onmousedown = (e) => {
      const rects = cv.getBoundingClientRect();
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
        } else {
          // 第一个点
          this.arr.push([x, y]);
          ctx.arc(x, y, 1, 0, 2 * Math.PI);
          ctx.stroke();
          ctx.moveTo(x, y);
        }
      } else if (e.buttons === 2) {
        // 右键点击取消
        if (this.arr.length > 0) {
          ctx.closePath();
          ctx.beginPath();
          ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

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
      if (!this.topic) {
        this.$message.error('请选择区域');
        return;
      }
      this.axios.get(server().http.areaHandle, {params: {flag: 'get_image', topic: this.topic}})
          .then(res => {
            const data = res.data;
            console.log(data)
            let ctx = this.$refs.cv.children[1].getContext('2d');
            const img = new Image();
            img.src = 'data:image/png;base64,' + data['img'];
            img.onload = () => {
              ctx.drawImage(img, 0, 0, this.canvasWidth, this.canvasHeight);
            }
            this.$message.success('选取主题成功');
          })
          .catch(e => {
            this.$message.error('选取主题失败');
            console.error(e);
          })
    },
    selectArea() {
      if (this.arr.length === 0) {
        this.$message.error('请选取区域');
        return;
      }
      this.axios.post(server().http.areaHandle,
          {flag: 'send_area', topic: this.topic, area: this.arr, size: [this.canvasWidth, this.canvasHeight]})
          .then(res => {
            const data = res.data;
            console.log(data);
            this.$message.success('选取区域成功');
          })
          .catch(e => {
            this.$message.error('选取区域失败');
            console.error(e);
          })
    },
    minDistance(pos1, pos2) {
      const dx = pos1[0] - pos2[0];
      const dy = pos1[1] - pos2[1];
      return dx * dx + dy * dy < 1024;
    }
  }
}
</script>

<style lang="scss" scoped>
.area-select-container {
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

  .area-select-wrapper {
    margin-bottom: 1rem;

    .el-select {
      margin-right: 1rem;
    }
  }
}
</style>