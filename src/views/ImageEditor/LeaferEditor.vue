<template>
  <div class="page-container">
    <div class="left-container">
      <n-layout has-sider style="height: 100%">
        <n-layout-sider
          bordered
          :width="70"
        >
          <n-menu
            class="custom-left-menu"
            v-model:value="activeKey"
            :options="menuOptions"
          />
        </n-layout-sider>
        <div class="tools-list" style="width: 300px; overflow: hidden;">
          <div v-if="activeKey == 'template'" class="tools-container">模板</div>
          <div v-else-if="activeKey == 'text'" class="tools-container">文本</div>
          <div v-else-if="activeKey == 'meta'" class="tools-container">
            <n-grid x-gap="12" :cols="4">
              <n-gi>
                <div class="tool-item" style="width: 50px; height: 50px; background-color: #32cd79;" @click="addMeta(1)"></div>
              </n-gi>
              <n-gi>
                <div class="tool-item" style="width: 50px; height: 50px; background-color: #32cd79; border-radius: 0 20px 10px 20px;" @click="addMeta(2)"></div>
              </n-gi>
              <n-gi>
                <div class="tool-item" style="width: 25px; height: 25px; background-color: #fff; border: 14px solid #32cd79; border-radius: 26px;" @click="addMeta(3)"></div>
              </n-gi>
              <n-gi>
                <div class="tool-item" style="border-style: solid; border-width: 0px 32px 46px 32px; border-color: transparent transparent #32cd79 transparent; width: 0px; height: 0px;" @click="addMeta(4)"></div>
              </n-gi>
            </n-grid>
          </div>
          <div v-else-if="activeKey == 'images'" class="tools-container">图片</div>
          <div v-else class="tools-container">背景</div>
        </div>
      </n-layout>
    </div>
    <div class="center-container" ref="center-container">
      <div id="editor-container"></div>
    </div>
    <div class="right-container"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, h, Component } from 'vue'
import { App, Ellipse, Polygon, Rect } from 'leafer-ui'
import { Ruler } from 'leafer-x-ruler'
import '@leafer-in/editor'
import {
  NewspaperOutline,
  TextOutline,
  ShapesOutline,
  ImageOutline,
  PhoneLandscapeSharp
} from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'

const activeKey = ref('template')

function renderIcon (icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    label: '模板',
    key: 'template',
    icon: renderIcon(NewspaperOutline)
  },
  {
    label: '文本',
    key: 'text',
    icon: renderIcon(TextOutline)
  },
  {
    label: '元件',
    key: 'meta',
    icon: renderIcon(ShapesOutline)
  },
  {
    label: '图片',
    key: 'images',
    icon: renderIcon(ImageOutline)
  },
  {
    label: '背景',
    key: 'background',
    icon: renderIcon(PhoneLandscapeSharp)
  },
]

var app = ref()

onMounted(() => {
  // 创建应用
  app.value = new App({
    view: 'editor-container',
    tree: {},
    editor: {},
  })
  const ruler = new Ruler(app.value)

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

const addMeta = (key) => {
  if (key == 1) {
    const rect = new Rect({
        x: 100,
        y: 100,
        width: 200,
        height: 200,
        fill: '#32cd79', // 背景色
        editable: true,
    })
    app.value.tree.add(rect)
  } else if (key == 2) {
    const rect = new Rect({
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      fill: 'rgb(50,205,121)',
      cornerRadius: [0, 40, 20, 40],
      editable: true,
    })
    app.value.tree.add(rect)
  } else if(key == 3) {
    const ellipse = new Ellipse({
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      innerRadius: 0.5,
      fill: "rgb(50,205,121)",
      editable: true
    })
    app.value.tree.add(ellipse)
  } else if(key == 4) {
    const polygon = new Polygon({
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      sides: 3,
      fill: 'rgb(50,205,121)',
      editable: true,
    })
    app.value.tree.add(polygon)
  }
}

</script>

<style lang="scss" scoped>
  .page-container {
    height: 100%;
    padding: 0;
    display: flex;
    .left-container {
      // width: 15%;
      // min-width: 250px;
      background-color: #fff;
      :deep(.custom-left-menu) {
        .n-menu-item {
          height: 56px;
          .n-menu-item-content {
            padding-left: 20px !important;
            display: flex;
            flex-direction: column;
            align-items: baseline;
            justify-content: center;
            .n-menu-item-content-header {
              opacity: 1 !important;
            }
          }
        }
      }
      .tools-list {
        .tools-container {
          padding: 16px;
          .tool-item {
            cursor: pointer;
          }
        }
      }
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