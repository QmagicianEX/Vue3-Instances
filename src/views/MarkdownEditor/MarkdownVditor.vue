<template>
  <div class="page-container">
    <div id="vditor" style="width: 100%; height: 100%;"/>
    <n-flex justify="end" class="operation-container">
      <n-button type="primary" @click="saveToLocal"><n-icon size="16"><SaveOutline /></n-icon>保存到本地</n-button>
      <n-button type="primary" @click="saveToServe"><n-icon size="16"><PaperPlaneOutline /></n-icon>保存到服务器</n-button>
    </n-flex>
    <div class="vditor-reset">
      <div v-html="htmlText"></div>
    </div>
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
let htmlText = ref('')

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

// 可按需添加头尾，请注意，需要将样式表文件放在下载文件的同一目录下，不然样式会不生效
var addHtmlHeadTail = (title='Document', htmlText: String='') => {
  let head = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>${title}</title>
    <link rel="stylesheet" href="./index.css">
  </head>
  <body>
    <div class="vditor-reset">`
  let tail = `
    </div>
  </body>
</html>`
  return head + htmlText + tail
}

var saveToLocal = () => {
  let htmlText = vditor.value!.getHTML();
  htmlText = addHtmlHeadTail('test', htmlText)
  const blob = new Blob([htmlText], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  // 创建下载链接
  const link = document.createElement('a');
  link.href = url;
  link.download = 'exported-content.html';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link); 
}
var saveToServe = () => {
  let title = 'test'
  let htmlText = addHtmlHeadTail(title, vditor.value!.getHTML());
  // 步骤1: 将字符串内容转换为Blob对象
  const blob = new Blob([htmlText], { type: "text/plain" });
  // 步骤2: 将Blob转换为File对象
  const fileName = 'test.html'
  const file = new File([blob], fileName, { type: "text/plain" });
  // 创建FormData实例, 并添加文件
  const formData = new FormData();
  formData.append("file", file);
  // 步骤3: 使用Fetch API上传文件到服务器
  fetch('YOUR_SERVER_ENDPOINT', { // 更换为您的服务器端点
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => console.log('Success:', data))
  .catch((error) => {
    console.error('Error:', error);
  });      
}
</script>

<style lang="scss" scoped>
  .operation-container {
    margin-top: 20px;
  }
</style>