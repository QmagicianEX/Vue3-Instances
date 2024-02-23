<template>
  <div class="page-container">
    <div class="left-container"></div>
    <div class="center-container">
      <div id="editor-container"></div>
    </div>
    <div class="right-container"></div>
  </div>
   
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { App, Rect } from 'leafer-ui'
import { Ruler } from 'leafer-x-ruler'
import '@leafer-in/editor'

onMounted(() => {
  // 创建应用
  // const leafer = new Leafer({ view: 'editor-container' })
  const rect = new Rect({
      x: 100,
      y: 100,
      width: 200,
      height: 200,
      fill: '#32cd79', // 背景色
      editable: true,
  })
  // leafer.add(rect)
  
  const app = new App({
    view: 'editor-container',
    tree: {},
    editor: {},
  })
  const ruler = new Ruler(app)

  app.tree.add(rect)

  // 添加自定义主题  
  // ruler.addTheme('custom1', {
  //   backgroundColor: '#6cb0ab',
  //   textColor: '#a45454',
  //   borderColor: '#6f4593',
  //   highlightColor: 'rgba(22,93,255,0.75)'
  // })

  // // 切换主题  
  // ruler.changeTheme('custom1')
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
        background-color: #f5f6fd;
      }
    }
    .right-container {
      width: 15%;
      min-width: 250px;
      background-color: #fff;
    }
  }
</style>