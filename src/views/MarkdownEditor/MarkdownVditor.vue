<template>
  <div class="page-container">
    <div id="vditor" style="width: 100%; height: 100%;"/>
    <n-flex justify="end" class="operation-container">
      <n-button type="primary" @click="getContent"><n-icon size="20"><code-download /></n-icon>获取html内容</n-button>
    </n-flex>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import {
  CodeDownload
} from '@vicons/ionicons5'

const vditor = ref<Vditor | null>(null);

onMounted(() => {
  vditor.value = new Vditor('vditor', {
    width: '100%',
    height: '80%',
    mode: 'sv',
    outline: {
      enable: true,
      position: 'left'
    },
    toolbar: [
      'emoji',
      'headings',
      'bold',
      'italic',
      'strike',
      'link',
      'upload',
      '|',
      'list',
      'ordered-list',
      'check',
      'outdent',
      'indent',
      '|',
      'quote',
      'line',
      'code',
      'inline-code',
      'insert-before',
      'insert-after',
      '|',
      'table',
      '|',
      'undo',
      'redo',
      '|',
      'edit-mode',
      'content-theme',
      'code-theme',
      'export',
      {
        name: 'more',
        toolbar: [
          'fullscreen',
          'both',
          'preview',
        ],
      }],
    after: () => {
      vditor.value!.setValue('Example Text');
    },
  });
});

var getContent = () => {
  let html = vditor.value!.getHTML();
  console.log(html)
}
</script>

<style lang="scss" scoped>
  .operation-container {
    margin-top: 20px;
  }
</style>