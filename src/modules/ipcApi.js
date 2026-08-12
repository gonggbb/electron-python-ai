import { dialog, ipcMain, shell, Notification } from 'electron';

// ========== 5. IPC 主进程监听渲染进程消息 ==========
/**
 *
 * 上下文隔离意味着预加载脚本与渲染器的主世界隔离，
 * 以避免将任何特权 API泄到您的 Web 内容代码中。
 * 请改用该contextBridge模块以安全地完成此操作：
 * 通过向渲染器公开ipcRenderer辅助函数，您可以使用进程间通信 (IPC) 从渲染器触发主进程任务（反之亦然）。
 * 如果您正在为托管在远程 URL 上的现有 Web 应用程序开发 Electron 包装器，则可以向渲染器的window全局变量添加自定义属性，这些属性可用于 Web 客户端的仅限桌面逻辑。
 */
export const registerIpcMain = (mainWindow) => {
  ipcMain.handle('open-folder', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory'],
    });
    return result.filePaths;
  });

  ipcMain.on('send-notification', () => {
    // 6. Notification 系统桌面通知
    new Notification({
      title: 'Electron通知',
      body: '来自主进程的桌面推送',
    }).show();
  });

  ipcMain.on('open-url', (_, url) => {
    // 7. Shell 调用系统默认程序打开链接/文件
    shell.openExternal(url);
  });
};
