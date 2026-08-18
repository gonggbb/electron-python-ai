import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/home/index.vue'),
    meta: { title: 'home' },
    children: [],
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/pages/about/index.vue'),
    meta: { title: 'about' },
    children: [],
  },
  {
    path: '/version',
    name: 'Version',
    component: () => import('@/pages/version/index.vue'),
    meta: { title: 'version' },
    children: [],
  },
  {
    path: '/skills',
    name: 'Skills',
    component: () => import('@/pages/skills/index.vue'),
    meta: { title: 'skills' },
    children: [],
  },
  // 404 页面
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/not-found/index.vue'),
    meta: { title: '404' },
    children: [],
  },
];

const router = createRouter({
  // Electron 推荐用 Hash 模式，避免 file:// 协议问题
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // 可在这里做权限、标题等处理
  next();
});

export default router;
