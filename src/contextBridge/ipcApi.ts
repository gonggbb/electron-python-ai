import { app, dialog, ipcMain, shell, Notification, autoUpdater } from 'electron';
// ========== 5. IPC 主进程监听渲染进程消息 ==========
/**
 *
 * 上下文隔离意味着预加载脚本与渲染器的主世界隔离，
 * 以避免将任何特权 API泄到您的 Web 内容代码中。
 * 请改用该contextBridge模块以安全地完成此操作：
 * 通过向渲染器公开ipcRenderer辅助函数，您可以使用进程间通信 (IPC) 从渲染器触发主进程任务（反之亦然）。
 * 如果您正在为托管在远程 URL 上的现有 Web 应用程序开发 Electron 包装器，则可以向渲染器的window全局变量添加自定义属性，这些属性可用于 Web 客户端的仅限桌面逻辑。
    Renderer
      │
      │ window.electronAPI.ping()
      ↓
    Preload
      │
      │ ipcRenderer.invoke('app:ping')
      ↓
    Main
      │
      │ ipcMain.handle('app:ping')
      ↓
    "pong"
 */
export const registerIpcMain = (mainWindow: Electron.BrowserWindow) => {
  ipcMain.handle('app:get-version', () => {
    return app.getVersion();
  });
  ipcMain.handle('app:ping', () => {
    console.log('[main] app:ping');

    return 'pong';
  });
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

  // 手动触发检查（用户点按钮时调用）
  ipcMain.handle('check-for-updates', async () => {
    if (!app.isPackaged) {
      return { status: 'dev', message: '开发环境不检查更新' };
    }

    return new Promise((resolve) => {
      let resolved = false;

      const onAvailable = () => {
        if (resolved) return;
        resolved = true;
        cleanup();
        resolve({ status: 'available', message: '发现新版本，正在下载…' });
      };

      const onNotAvailable = () => {
        if (resolved) return;
        resolved = true;
        cleanup();
        resolve({ status: 'not-available', message: '当前已是最新版本' });
      };

      const onError = (err: Error) => {
        if (resolved) return;
        resolved = true;
        cleanup();
        resolve({ status: 'error', message: err.message });
      };

      const onDownloaded = (
        event: Electron.IpcMainEvent,
        releaseNotes: string,
        releaseName: string,
      ) => {
        // 下载完成后再提示用户重启
        dialog
          .showMessageBox({
            type: 'info',
            title: '更新已就绪',
            message: `新版本 ${releaseName} 已下载完成`,
            detail: releaseNotes || '',
            buttons: ['立即重启', '稍后'],
            defaultId: 0,
          })
          .then(({ response }) => {
            if (response === 0) autoUpdater.quitAndInstall();
          });
      };

      function cleanup() {
        autoUpdater.removeListener('update-available', onAvailable);
        autoUpdater.removeListener('update-not-available', onNotAvailable);
        autoUpdater.removeListener('error', onError);
      }

      autoUpdater.once('update-available', onAvailable);
      autoUpdater.once('update-not-available', onNotAvailable);
      autoUpdater.once('error', onError);
      // ts检测的
      // autoUpdater.on('update-downloaded', onDownloaded);

      autoUpdater.checkForUpdates();
    });
  });

  // 获取远程版本列表
  ipcMain.handle('get-remote-versions', async () => {
    const owner = 'gonggbb';
    const repo = 'electron-python-ai';

    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases?per_page=20`, {
      headers: {
        Accept: 'application/vnd.github+json',
        // 私有仓库需要 token
        // Authorization: `Bearer ${process.env.GH_TOKEN}`
      },
    });
    if (!res.ok) throw new Error('获取版本列表失败');

    const releases: any[] = await res.json();

    // 只保留正式版（过滤 draft / prerelease）
    return releases
      .filter((r) => !r.draft && !r.prerelease)
      .map((r) => ({
        tag: r.tag_name, // 如 v1.2.3
        name: r.name,
        publishedAt: r.published_at,
        body: r.body, // 更新日志
        htmlUrl: r.html_url,
        assets: r.assets.map((a: any) => ({
          name: a.name,
          downloadUrl: a.browser_download_url,
          size: a.size,
        })),
      }));
  });
};
