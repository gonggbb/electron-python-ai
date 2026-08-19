import { Tray, Menu, nativeImage } from 'electron';
import path from 'node:path';
import { app } from 'electron';

// ========== 4. 系统托盘 Tray + Menu 右键菜单 ==========
let appTray = null;
export const createTray = (mainWindow: Electron.BrowserWindow) => {
  // 生产环境兼容写法
  const iconPath = app.isPackaged
    ? path.join(process.resourcesPath, 'icons/icon.png') // 打包后放 resources 里
    : path.join(__dirname, '../../icons/icon.png'); // 开发环境
  console.log('resourcesPath:', process.resourcesPath);
  console.log('icon exists:', require('fs').existsSync(iconPath));
  // 或者更稳妥：
  // const iconPath = path.join(__dirname, '../../icons/icon.png');
  // 然后确保 icons 目录被正确复制/解包

  const trayIcon = nativeImage.createFromPath(iconPath);
  appTray = new Tray(trayIcon || '');
  const trayMenu = Menu.buildFromTemplate([
    { label: '显示窗口', click: () => mainWindow?.show() },
    { label: '隐藏窗口', click: () => mainWindow?.hide() },
    { type: 'separator' },
    { label: '退出程序', click: () => app.quit() },
  ]);
  appTray.setContextMenu(trayMenu);
  appTray.setToolTip('Electron Demo托盘');
};
