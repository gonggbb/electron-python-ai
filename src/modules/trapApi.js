import { Tray, Menu } from 'electron';
import path from 'node:path';
import { app } from 'electron';

// ========== 4. 系统托盘 Tray + Menu 右键菜单 ==========
let appTray = null;
export const createTray = (mainWindow) => {
  const trayIcon = path.join(__dirname, '../../icons/icon.png'); // Fiddle可临时用任意图片，没有也不报错
  appTray = new Tray(trayIcon || '');
  const trayMenu = Menu.buildFromTemplate([
    { label: '显示窗口', click: () => mainWindow.show() },
    { label: '隐藏窗口', click: () => mainWindow.hide() },
    { type: 'separator' },
    { label: '退出程序', click: () => app.quit() },
  ]);
  appTray.setContextMenu(trayMenu);
  appTray.setToolTip('Electron Demo托盘');
};
