// 1. 定义路由组件.
// 也可以从其他文件导入
import { createRouter, createWebHashHistory } from 'vue-router';
import MarkdownVditor from '../components/MarkdownVditor.vue'

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
const routes = [
  { path: '/MarkdownVditor', component: MarkdownVditor },
  { path: '/MarkdownTuiEditor', component: ()=>import('../components/MarkdownTuiEditor.vue') },
]

// 3. 创建路由实例并传递 `routes` 配置
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

export default router;