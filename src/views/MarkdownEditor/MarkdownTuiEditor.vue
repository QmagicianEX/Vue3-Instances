<template>
  <div class="page-container">
    <div id="editor" style="width: 100%; height: 100%;"/>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';

const editor = ref<Editor | null>(null);

onMounted(() => {
  editor.value = new Editor({
    el: document.querySelector('#editor'),
    height: '500px',
    initialEditType: 'markdown',
    previewStyle: 'vertical'
  });
});
</script>

<style></style>