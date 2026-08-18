import type { RemoteVersion } from './remote';

export interface ElectronAPI {
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
