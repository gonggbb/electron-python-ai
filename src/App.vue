<template>
  <t-layout class="app-container">
    <t-header>
      <t-head-menu value="item1" height="120px">
        <template #logo>
          <img
            width="136"
            class="logo"
            src="https://www.tencent.com/img/index/menu_logo_hover.png"
            alt="logo"
          />
        </template>
        <t-menu-item value="item1"> 已选内容 </t-menu-item>
        <t-menu-item value="item2"> 菜单内容一 </t-menu-item>
        <t-menu-item value="item3"> 菜单内容二 </t-menu-item>
        <t-menu-item value="item4" :disabled="true"> 菜单内容三 </t-menu-item>
        <template #operations>
          <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="search" /></a>
          <a href="javascript:;"
            ><t-icon class="t-menu__operations-icon" name="notification-filled"
          /></a>
          <t-switch v-model="checked" size="small" @change="useTheme" />
          <a href="javascript:;"><t-icon class="t-menu__operations-icon" name="home" /></a>
        </template>
      </t-head-menu>
    </t-header>
    <t-layout>
      <t-aside style="border-top: 1px solid var(--component-border)">
        <t-menu theme="light" value="dashboard" style="margin-right: 50px" height="550px">
          <t-menu-item value="dashboard">
            <template #icon>
              <t-icon name="dashboard" />
            </template>
            仪表盘
          </t-menu-item>
          <t-menu-item value="resource">
            <template #icon>
              <t-icon name="server" />
            </template>
            资源列表
          </t-menu-item>
          <t-menu-item value="root">
            <template #icon>
              <t-icon name="root-list" />
            </template>
            根目录
          </t-menu-item>
          <t-menu-item value="control-platform">
            <template #icon>
              <t-icon name="control-platform" />
            </template>
            调度平台
          </t-menu-item>
          <t-menu-item value="precise-monitor">
            <template #icon>
              <t-icon name="precise-monitor" />
            </template>
            调度平台
          </t-menu-item>
          <t-menu-item value="mail">
            <template #icon>
              <t-icon name="mail" />
            </template>
            消息区
          </t-menu-item>
          <t-menu-item value="user-circle">
            <template #icon>
              <t-icon name="user-circle" />
            </template>
            个人中心
          </t-menu-item>
          <t-menu-item value="play-circle">
            <template #icon>
              <t-icon name="play-circle" />
            </template>
            视频区
          </t-menu-item>
          <t-menu-item value="edit1">
            <template #icon>
              <t-icon name="edit-1" />
            </template>
            资源编辑
          </t-menu-item>
        </t-menu>
      </t-aside>
      <t-layout>
        <t-content>
          <div>
            <!-- Content -->
            <h1>💖 Hello World! vite+vue3</h1>
            <p>Welcome to your Electron application.</p>
            <button id="btnFolder">Dialog 打开文件夹</button>
            <button id="btnNotify">Notification 桌面通知</button>
            <button id="btnUrl">Shell GitHub</button>
            <t-space>
              <t-button loading ghost theme="success">加载</t-button>
              <t-button loading ghost variant="outline" theme="success">加载</t-button>
              <t-button loading ghost variant="dashed" theme="success">加载</t-button>
              <t-button loading ghost variant="text" theme="success">加载</t-button>
            </t-space>
          </div>
        </t-content>
        <t-footer
          >Copyright @ 2019-{{ new Date().getFullYear() }} Tencent. All Rights Reserved</t-footer
        >
      </t-layout>
    </t-layout>
  </t-layout>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useTheme } from './hooks/useTheme';
const checked = ref(true);
console.log('👋 This message is being logged by "App.vue", included via Vite');

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
</script>

<style scoped>
button {
  margin: 8px;
  padding: 6px 12px;
  cursor: pointer;
}
</style>
