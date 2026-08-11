import { BrowserWindow } from 'electron';
import path from 'node:path';

export const createWindow = () => {
  console.log('创建窗口...', path.join(__dirname, '../preload.js'));
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, '../preload.js'),
    },
    width: 800,
  });

  // And load the index.html of the app.
  console.log(
    '🚀 ~ createWindow ~ MAIN_WINDOW_VITE_DEV_SERVER_URL:',
    MAIN_WINDOW_VITE_DEV_SERVER_URL,
  );
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    // Open the DevTools in development only.
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, `../../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }
};
