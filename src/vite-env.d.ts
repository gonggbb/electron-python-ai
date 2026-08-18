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

// 将 preload 暴露的 API 用 declare global 声明为 Window 扩展，是 Electron + TS 的标准安全模式
declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
import type { ElectronAPI } from './types/electron-api';

export {};
