// 在 env.d.ts 顶部添加 /// <reference types="vite/client" />，使 .css 导入通过类型检查
/// <reference types="vite/client" />
/**
 * preload.ts 通过 contextBridge.exposeInMainWorld('electronAPI', ...) 挂载到 window 上的
 * 主进程通信 API 的类型声明。
 * 注意：这里声明的接口必须与 src/preload.ts 中暴露的对象结构保持一致。
 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<object, object, any>;
  export default component;
}

interface ElectronAPI {
  /** 打开文件夹选择对话框，返回选中的路径列表 */
  openFolderDialog(): Promise<string[]>;
  /** 弹出系统通知 */
  showNotification(): void;
  /** 调用系统浏览器打开外部网址 */
  openExternalUrl(url: string): void;
  /** 获取应用版本号 */
  getVersion(): Promise<string>;
  /** ping-pong 测试 */
  ping(): Promise<string>;
  /** 检查应用更新 */
  checkForUpdates(): Promise<{
    status: string;
    message: string;
  }>;
  /** 获取远程版本列表 */
  getRemoteVersionList(): Promise<RemoteVersion[]>;
}

// 将 preload 暴露的 API 用 declare global 声明为 Window 扩展，是 Electron + TS 的标准安全模式
declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

import type { RemoteVersion } from './types/remote';

export {};
