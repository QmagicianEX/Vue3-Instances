<template>
  <div id="vditor" style="width: 100%; height: 100%;"/>
  <button @click="getContent">获取html内容</button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Vditor from 'vditor';
import 'vditor/dist/index.css';

const vditor = ref<Vditor | null>(null);

onMounted(() => {
  vditor.value = new Vditor('vditor', {
    mode: 'sv',
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
      vditor.value!.setValue('Vue Composition API + Vditor + TypeScript Minimal Example');
    },
  });
});

var getContent = () => {
  let html = vditor.value!.getHTML();
  console.log('html', html)
}
</script>

<style></style>