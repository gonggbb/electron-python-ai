import { globalShortcut, dialog } from 'electron';

// ========== 3. GlobalShortcut 全局快捷键 ==========
export const registerGlobalShortcutTest = (mainWindow) => {
  const success = globalShortcut.register('Ctrl+Shift+D', () => {
    dialog.showMessageBox(mainWindow, { message: '全局快捷键触发：Ctrl+Shift+D' });
  });
  console.log(`全局快捷键注册结果: ${success}`);
  if (!success) {
    console.error(`注册全局快捷键失败: 'Ctrl+Shift+D'`);
  }

  return success;
};
export const registerGlobalShortcut = (shortcut, callback) => {
  const success = globalShortcut.register(shortcut, callback);
  if (!success) {
    console.error(`注册全局快捷键失败: ${shortcut}`);
  }
  return success;
};

export const unregisterGlobalShortcut = (shortcut) => {
  globalShortcut.unregister(shortcut);
};

export const unregisterAllGlobalShortcuts = () => {
  console.log('取消所有全局快捷键');
  globalShortcut.unregisterAll();
};
