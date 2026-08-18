import { onMounted, ref } from 'vue';
export const useHome = () => {
  const checked = ref(true);
  console.log('👋 This message is being logged by "App.vue", included via Vite');
  const topMenuList = ref([
    {
      label: 'Home',
      router: '/',
    },
    {
      label: 'Version',
      router: '/version',
    },
    {
      label: 'About',
      router: '/about',
    },
    {
      label: '对话',
      router: '/dialogue',
    },
    {
      label: 'Deep Agents',
      router: '/deep-agents',
    },
    {
      label: 'Managed Deep Agents',
      router: '/managed-deep-agents',
    },
    {
      label: 'LangChain',
      router: '/langchain',
    },
    {
      label: 'LangGraph',
      router: '/langgraph ',
    },
    {
      label: 'LangSmith',
      router: '/langsmith',
    },
    {
      label: 'OpenWiki',
      router: '/openwiki',
    },
  ]);
  const sideMenuList = ref([
    {
      label: 'Skills',
      router: '/skills',
      icon: 'ai-tool',
    },
    {
      label: 'MCP',
      router: '/mcp',
      icon: 'ai',
    },
    {
      label: '模型',
      router: '/model',
      icon: 'ai-1',
    },

    {
      label: '记忆',
      router: '/precise-monitor',
      icon: 'ai-article',
    },

    {
      label: '智能体',
      router: '/agent',
      icon: 'robot',
    },
    {
      label: '任务',
      router: '/task',
      icon: 'assignment',
    },
    {
      label: '中间件',
      router: '/control-platform',
      icon: 'bridge-2',
    },
    {
      label: '插件',
      router: '/plugins',
      icon: 'extension',
    },
    {
      label: '知识库',
      router: '/knowledge',
      icon: 'ai-book-open',
    },
    {
      label: '数据集',
      router: '/dataset',
      icon: 'ai-chart-bar',
    },
    {
      label: '个人中心',
      router: '/user-circle',
      icon: 'user-circle',
    },
    {
      label: '设置',
      router: '/setting',
      icon: 'setting',
    },
  ]);
  onMounted(() => {
    const btnFolder = document.getElementById('btnFolder');
    const btnNotify = document.getElementById('btnNotify');
    const btnUrl = document.getElementById('btnUrl');
    // 绑定按钮点击事件
    btnFolder?.addEventListener('click', async () => {
      const paths = await window.electronAPI.openFolderDialog();
      console.log('选中路径：', paths);
      alert('选择的文件夹：' + paths);
    });

    btnNotify?.addEventListener('click', () => {
      window.electronAPI.showNotification();
    });

    btnUrl?.addEventListener('click', () => {
      window.electronAPI.openExternalUrl('https://www.github.com');
    });
  });
  return {
    checked,
    topMenuList,
    sideMenuList,
  };
};
