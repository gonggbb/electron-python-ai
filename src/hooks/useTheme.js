export const useTheme = (darkMode) => {
  console.log('🚀 ~ useTheme ~ darkMode:', darkMode);
  if (darkMode) {
    // 深色模式
    document.documentElement.setAttribute('theme-mode', 'dark');
  } else {
    // 浅色模式
    document.documentElement.removeAttribute('theme-mode');
  }
};
