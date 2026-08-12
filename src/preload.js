// See the Electron documentation for details on how to use preload scripts: 有关如何使用预加载脚本的详细信息，请参阅Electron文档：
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron');

// 对外挂载 window.electronAPI
contextBridge.exposeInMainWorld('electronAPI', {
  // 打开文件夹对话框
  openFolderDialog: () => ipcRenderer.invoke('open-folder'),
  // 弹出系统通知
  showNotification: () => ipcRenderer.send('send-notification'),
  // 调用系统浏览器打开网址
  openExternalUrl: (url) => ipcRenderer.send('open-url', url),
});
