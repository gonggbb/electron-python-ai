<template>
  <h1>💖 Hello World! vite+vue3</h1>
  <p>Welcome to your Electron application.</p>
  <button id="btnFolder">Dialog 打开文件夹</button>
  <button id="btnNotify">Notification 桌面通知</button>
  <button id="btnUrl">Shell GitHub</button>
</template>

<script setup>
import { onMounted } from 'vue';
console.log('👋 This message is being logged by "App.vue", included via Vite');

onMounted(() => {
  const btnFolder = document.getElementById('btnFolder');
  const btnNotify = document.getElementById('btnNotify');
  const btnUrl = document.getElementById('btnUrl');
  // 绑定按钮点击事件
  btnFolder?.addEventListener('click', async () => {
    const paths = await window.electronAPI.openFolderDialog();
    console.log('选中路径：', paths);
    alert('选择的文件夹：' + paths);
  });

  btnNotify?.addEventListener('click', () => {
    window.electronAPI.showNotification();
  });

  btnUrl?.addEventListener('click', () => {
    window.electronAPI.openExternalUrl('https://www.github.com');
  });
});
</script>

<style scoped>
button {
  margin: 8px;
  padding: 6px 12px;
  cursor: pointer;
}
</style>
