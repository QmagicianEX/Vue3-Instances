<template>
  <div class="page-container">
    <div id="editor" style="width: 100%; height: 100%;"/>
    <n-flex justify="end" class="operation-container">
      <n-button type="primary" @click="saveToLocal"><n-icon size="16"><SaveOutline /></n-icon>保存到本地</n-button>
      <n-button type="primary" @click="saveToServe"><n-icon size="16"><PaperPlaneOutline /></n-icon>保存到服务器</n-button>
    </n-flex>
    <div class="toastui-editor-contents">
      <div v-html="htmlText"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { SaveOutline } from '@vicons/ionicons5'
import { PaperPlaneOutline } from '@vicons/ionicons5'
import axios from 'axios'

let editor: Editor|null = null;
let htmlText = ref('')

onMounted(() => {
  editor = new Editor({
    el: document.querySelector('#editor'),
    height: '500px',
    initialEditType: 'markdown',
    previewStyle: 'vertical',
    hooks: {
      // 在添加图片文件之前执行的钩子
      addImageBlobHook: (blob, callback) => {
        if (blob.size > 2 * 1024 * 1024) { // 2MB
          alert('文件大小不能超过2MB.');
          return;
        }
        // 如果文件大小合适，则继续上传处理
        const reader = new FileReader();
        reader.onload = function(e) {
          const url = e.target!.result;
          callback(url, 'image-alt-text'); // 'image-alt-text' 是图片的替代文本
        };
        reader.readAsDataURL(blob);
      }
    }
  });
  let fileName = 'test.md'
  axios.get('/api/getDocumentMarkdown', {
    params: { filename: fileName }
  })
  .then(res => {
    editor!.setMarkdown(res.data.data)
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});

// 可按需添加头尾，请注意，需要将样式表文件放在下载文件的同一目录下，不然样式会不生效
var addHtmlHeadTail = (title='Document', htmlText: String='') => {
  let head = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>${title}</title>
    <link rel="stylesheet" href="./toastui-editor.css">
  </head>
  <body>
    <div class="toastui-editor-contents">`
  let tail = `
    </div>
  </body>
</html>`
  return head + htmlText + tail
}

var saveToLocal = () => {
  let htmlText = editor!.getHTML();
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
  saveMarkdown()
  saveHtml()     
}
var saveMarkdown = () => {
  let markdownStr = editor!.getMarkdown();
  // 步骤1: 将字符串内容转换为Blob对象
  const blob = new Blob([markdownStr], { type: "text/plain" });
  // 步骤2: 将Blob转换为File对象
  const fileName = 'test.md'
  const file = new File([blob], fileName, { type: "text/plain" });
  // 创建FormData实例, 并添加文件
  const formData = new FormData();
  formData.append("file", file);
  // 步骤3: 使用Fetch API上传文件到服务器
  fetch('/api//uploadHelpDocument', { // 更换为您的服务器端点
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => console.log('Success:', data))
  .catch((error) => {
    console.error('Error:', error);
  });      
}
var saveHtml = () => {
  let title = 'test'
  let htmlText = addHtmlHeadTail(title, editor!.getHTML());
  // 步骤1: 将字符串内容转换为Blob对象
  const blob = new Blob([htmlText], { type: "text/plain" });
  // 步骤2: 将Blob转换为File对象
  const fileName = 'test.html'
  const file = new File([blob], fileName, { type: "text/plain" });
  // 创建FormData实例, 并添加文件
  const formData = new FormData();
  formData.append("file", file);
  // 步骤3: 使用Fetch API上传文件到服务器
  fetch('/api/uploadHelpDocument', { // 更换为您的服务器端点
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