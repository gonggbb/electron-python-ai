import { powerMonitor } from 'electron';
// 电源监控 PowerMonitor 示例
export const registerPowerMonitor = () => {
  powerMonitor.on('resume', () => {
    console.log('电脑从休眠中恢复');
  });
  powerMonitor.on('shutdown', () => {
    console.log('电脑即将关机');
  });
  powerMonitor.on('lock-screen', () => {
    console.log('电脑锁屏');
  });
  powerMonitor.on('unlock-screen', () => {
    console.log('电脑解锁');
  });

  powerMonitor.on('abnormal-shutdown', () => {
    console.log('电脑异常关机');
  });

  powerMonitor.on('suspend', () => {
    console.log('电脑进入休眠');
  });
};
