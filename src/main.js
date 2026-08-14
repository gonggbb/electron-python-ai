import { app } from 'electron';
import started from 'electron-squirrel-startup';
// Const { updateElectronApp } = require('update-electron-app'); //异常
import { updateElectronApp } from 'update-electron-app';

try {
  updateElectronApp({
    repo: 'gonggbb/electron-python-ai', // 显式指定，避免靠 name 推断出错
  });
} catch (e) {
  console.error('[main] updateElectronApp skipped:', e);
}
// Handle creating/removing shortcuts on Windows when installing/uninstalling.处理在安装/卸载时在Windows上创建/删除快捷方式。
if (started) {
  app.quit();
}

import path from 'node:path';
import { BrowserWindow } from 'electron';
import {
  getScreenInfo,
  registerGlobalShortcutTest,
  unregisterAllGlobalShortcuts,
  createTray,
  registerIpcMain,
  registerPowerMonitor,
} from './modules/index.js';

export let globalsWindowInstance = null;

const createWindow = () => {
  console.log('创建窗口...__dirname', __dirname, app.getAppPath());
  console.log(
    '🚀 ~ createWindow ~ MAIN_WINDOW_VITE_DEV_SERVER_URL:',
    MAIN_WINDOW_VITE_NAME,
    MAIN_WINDOW_VITE_DEV_SERVER_URL,
  );
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    // 选项中将预加载脚本附加到主进程webPreferences
    webPreferences: {
      // 无法直接访问 Node.js API 或 Electron 的内部对象，也不能轻易篡改 Preload 暴露的接口
      contextIsolation: true,
      // 禁止渲染进程直接使用 Node.js
      nodeIntegration: false,
      // 是否启用操作系统级沙箱。
      sandbox: false,
      preload: path.join(__dirname, 'preload.js'),
    },
    width: 800,
  });

  // And load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    // Open the DevTools in development only.
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }
  // 根据打包状态选择加载方式
  console.log('🚀 ~ createWindow ~ isPackaged:', app.isPackaged);
  // 获取屏幕信息 getScreenInfo
  console.log('🚀 ~ getScreenInfo();:', getScreenInfo());
  // 注册全局快捷键测试
  registerGlobalShortcutTest(mainWindow);
  // 创建系统托盘
  // createTray(mainWindow);
  // 注册IPC通信
  // registerIpcMain(mainWindow);
  // 注册电源监控
  registerPowerMonitor();
  // 窗口关闭事件
  mainWindow.on('closed', () => {
    console.log('窗口已关闭');
  });
  return mainWindow;
};
// This method will be called when Electron has finished 这个方法将在Electron完成时被调用
// Initialization and is ready to create browser windows.初始化，并准备创建浏览器窗口。
// Some APIs can only be used after this event occurs. 有些api只能在此事件发生后使用。
app.whenReady().then(() => {
  // Main 进程必须注册 ipcMain.handle
  registerIpcMain(globalsWindowInstance);
  globalsWindowInstance = createWindow();
  // 创建系统托盘
  createTray(globalsWindowInstance);
  // On OS X it's common to re-create a window in the app when the 在OS X上，在应用程序中重新创建一个窗口是很常见的 MacOS 激活窗口逻辑
  // Dock icon is clicked and there are no other windows open.  点击Dock图标，没有其他窗口打开。
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      globalsWindowInstance = createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common 当所有窗口都关闭时退出，除了macOS。在那里，这很常见
// For applications and their menu bar to stay active until the user quits 使应用程序及其菜单栏保持活动状态，直到用户退出
// Explicitly with Cmd + Q. 显式地使用Cmd + Q。
// 所有窗口关闭退出（Windows/Linux）
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process 在这个文件中，你可以包含应用程序特定主进程的其余部分
// Code. You can also put them in separate files and import them here. code. 您也可以将它们放在单独的文件中，然后在这里导入它们。

// 程序退出前注销全局快捷键，释放资源
app.on('will-quit', () => {
  unregisterAllGlobalShortcuts();
});

// window.myAPI = {
//   desktop: true,
// };
// console.log(window.myAPI);
