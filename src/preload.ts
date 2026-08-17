// See the Electron documentation for details on how to use preload scripts: 有关如何使用预加载脚本的详细信息，请参阅Electron文档：
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
// const { contextBridge, ipcRenderer } = require('electron');
import { ipcRenderer, contextBridge } from 'electron';
console.log('========== PRELOAD LOADED preload.js ==========');
// 对外挂载 window.electronAPI
contextBridge.exposeInMainWorld('electronAPI', {
  /**
   * send/on 和 invoke/handle 不要混用
   * @returns
   */
  // 打开文件夹对话框
  openFolderDialog: () => ipcRenderer.invoke('open-folder'),
  // 弹出系统通知
  showNotification: () => ipcRenderer.send('send-notification'),
  // 调用系统浏览器打开网址
  openExternalUrl: (url: string) => ipcRenderer.send('open-url', url),
  // 获取版本号
  getVersion: () => ipcRenderer.invoke('app:get-version'),
  // ping-pong 测试
  ping: () => ipcRenderer.invoke('app:ping'),
  // 版本更新检查
  checkForUpdates: () => ipcRenderer.invoke('check-for-updates'),
  // 获取远程版本列表
  getRemoteVersionList: () => ipcRenderer.invoke('get-remote-versions'),
});
