<template>
  <div class="page-container">
    <div class="left-container"></div>
    <div class="center-container" ref="fabricCon">
      <canvas ref="canvas" id="editor-container"></canvas>
    </div>
    <div class="right-container"></div>
  </div>
   
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fabric } from 'fabric';

const fabricCon = ref(null);
const canvas = ref(null)
let canvasInstance = null;

const resizeCanvas = () => {
  const { width, height } = fabricCon.value.getBoundingClientRect();
  canvasInstance.setWidth(width);
  canvasInstance.setHeight(height - 40);
}
onMounted(() => {
  canvasInstance = new fabric.Canvas(canvas.value);
  resizeCanvas();
  // 添加一个圆形对象到画布
  const circle = new fabric.Circle({
    radius: 50,
    fill: 'red',
    left: 100,
    top: 100,
  });
  canvasInstance.add(circle);

  // 添加一个矩形对象到画布
  const rect = new fabric.Rect({
    width: 100,
    height: 100,
    fill: 'blue',
    left: 300,
    top: 200,
  });
  canvasInstance.add(rect);

  // 添加一个文本对象到画布
  const text = new fabric.Text('Hello Fabric.js!', {
    fontFamily: 'Arial',
    fontSize: 24,
    fill: 'black',
    left: 200,
    top: 400,
  });
  canvasInstance.add(text);
}) 

</script>

<style lang="scss" scoped>
  .page-container {
    height: 100%;
    padding: 0;
    display: flex;
    .left-container {
      width: 15%;
      min-width: 250px;
      background-color: #fff;
    }
    .center-container {
      width: 100%;
      padding: 20px;
      background-color: #f1f2f4;
      #editor-container {
        width: 100%;
        height: 100%;
        background-color: #fff;
      }
    }
    .right-container {
      width: 15%;
      min-width: 250px;
      background-color: #fff;
    }
  }
</style>