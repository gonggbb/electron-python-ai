import axios from 'axios';
import { MessagePlugin } from 'tdesign-vue-next';

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  timeout: 15000,
});

// 请求拦截
service.interceptors.request.use(
  (config) => {
    // 可在这里加 token
    // const token = localStorage.getItem('token')
    // if (token) config.headers.Authorization = `Bearer ${token}`
    return config;
  },
  (error) => Promise.reject(error),
);

// 响应拦截
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    // 根据你的后端约定调整
    if (res.code !== 0 && res.code !== 200) {
      MessagePlugin.error(res.message || '请求失败');
      return Promise.reject(new Error(res.message || 'Error'));
    }
    return res;
  },
  (error) => {
    MessagePlugin.error(error.message || '网络错误');
    return Promise.reject(error);
  },
);

export default service;
