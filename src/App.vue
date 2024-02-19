<template>
  <n-message-provider>
    <n-flex vertical style="height: 100%">
      <n-layout has-sider>
        <n-layout-sider
          bordered
          collapse-mode="width"
          :collapsed-width="64"
          :width="240"
          :collapsed="collapsed"
          show-trigger
          @collapse="collapsed = true"
          @expand="collapsed = false"
        >
          <n-flex align="center" justify="space-around" class="system-logo-name">
            <img src="@/assets/favicon.ico" width="50" />
            <span class="system-name">VUE3 INSTANCES</span>
          </n-flex>
          <n-menu
            v-model:value="activeKey"
            :collapsed="collapsed"
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="menuOptions"
            @update:value="handleMenuChange"
          />
        </n-layout-sider>
        <n-layout>
          <router-view />
        </n-layout>
      </n-layout>
    </n-flex>
  </n-message-provider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { MenuOption } from 'naive-ui'
import router from './router'
import { useRouter } from 'vue-router'

const activeKey = ref('/Home')
const collapsed = ref(false)

// 从路由文件中解析菜单
function getRoutesObject (routes: any) {
  let tmp: any[] = [];
  routes.forEach((item: any) => {
    let obj: any = {
      label: item.meta.title,
      key: item.path,
      icon: item.icon
    }
    if (item.children && item.children.length > 0) {
      obj['children'] = getRoutesObject(item.children);
    }
    tmp.push(obj)
  })
  return tmp;
}
const menuOptions: MenuOption[] = getRoutesObject(router.options.routes)
const $router = useRouter()
const handleMenuChange = (key: string) => {
  $router.push(key)
}

</script>
<style lang="scss" scoped>
  .system-logo-name {
    height: 50px;
    overflow: hidden;
    border-bottom: 1px solid #e9e9e9;
    .system-name {
      font-weight: bold;
    }
  }
</style>