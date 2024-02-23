// 1. 定义路由组件.
// 也可以从其他文件导入
import { createRouter, createWebHashHistory } from 'vue-router';
import { h, Component } from 'vue'
import {
  HomeOutline,
  LogoMarkdown,
  ImageOutline,
} from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
function renderIcon (icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
const routes = [
  {
    path: '/Home',
    name: 'Home',
    icon: renderIcon(HomeOutline),
    meta: {
      title: '首页'
    },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/MarkdownEditor',
    name: 'MarkdownEditor',
    icon: renderIcon(LogoMarkdown),
    meta: {
      title: 'Markdown编辑器'
    },
    children: [
      {
        path: '/MarkdownVditor',
        name: 'MarkdownVditor',
        meta: {
          title: 'Vditor'
        },
        component: () => import('../views/MarkdownEditor/MarkdownVditor.vue')
      },
      {
        path: '/MarkdownTuiEditor',
        name: 'MarkdownTuiEditor',
        meta: {
          title: 'TuiEditor'
        },
        component: () => import('../views/MarkdownEditor/MarkdownTuiEditor.vue')
      },
    ]
  },
  {
    path: '/ImageEditor',
    name: 'ImageEditor',
    icon: renderIcon(ImageOutline),
    meta: {
      title: '图像编辑器'
    },
    children: [
      {
        path: '/FabricEditor',
        name: 'FabricEditor',
        meta: {
          title: 'Fabric'
        },
        component: () => import('../views/ImageEditor/FabricEditor.vue')
      },
      {
        path: '/LeaferEditor',
        name: 'LeaferEditor',
        meta: {
          title: 'Leafer'
        },
        component: () => import('../views/ImageEditor/LeaferEditor.vue')
      },
    ]
  },
]

// 3. 创建路由实例并传递 `routes` 配置
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

export default router;