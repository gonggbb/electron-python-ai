import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppStore = defineStore(
  'app',
  () => {
    const locale = ref(localStorage.getItem('locale') || 'zh-CN');

    function setLocale(lang) {
      locale.value = lang;
      localStorage.setItem('locale', lang);
    }

    return { locale, setLocale };
  },
  {
    // 如果安装了 pinia-plugin-persistedstate，可开启
    // persist: true
  },
);
