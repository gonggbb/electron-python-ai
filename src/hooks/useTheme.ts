import { SwitchValue } from 'tdesign-vue-next/es/switch/type';

export const useTheme = (
  value: SwitchValue,
  context: {
    e: MouseEvent;
  },
) => {
  console.log('🚀 ~ useTheme ~ :', value);
  if (value) {
    // 深色模式
    document.documentElement.setAttribute('theme-mode', 'dark');
  } else {
    // 浅色模式
    document.documentElement.removeAttribute('theme-mode');
  }
};
