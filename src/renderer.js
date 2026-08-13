/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 * 该文件将被vite自动加载，并在“renderer”上下文中运行。
 *了解更多关于“main”和“renderer”上下文之间的差异
 *电子，请浏览
 *
 * https://electronjs.org/docs/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *默认情况下，此文件中的Node.js集成是禁用的。当启用Node.js集成时
*在渲染过程中，请注意潜在的安全隐患。你可以阅读
*更多有关保安风险的资料请参阅：
＊
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */
console.log('========== PRELOAD LOADED renderer.js ==========');

import './index.css';
import './theme.css';
import { createApp } from 'vue';
import App from './App.vue';
// 引入组件库的少量全局样式变量
import 'tdesign-vue-next/es/style/index.css';
import { Button as TButton } from 'tdesign-vue-next';
import { createPinia } from 'pinia';
import router from './router/index.js';
import i18n from './i18n/index.js';

const pinia = createPinia();
createApp(App).use(TButton).use(pinia).use(router).use(i18n).mount('#app');

console.log('👋 This message is being logged by "renderer.js", included via Vite');
console.log(window.electronAPI);
console.log('getVersion:', window.electronAPI.getVersion);
window.electronAPI.ping().then(console.log);
