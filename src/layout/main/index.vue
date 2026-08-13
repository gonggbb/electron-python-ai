<template>
  <t-layout class="app-container">
    <t-header>
      <t-head-menu
        value="item1"
        height="120px"
        @change="
          (value) => {
            console.log(value);
            router.push(value);
          }
        "
      >
        <template #logo>
          <img
            width="136"
            class="logo"
            src="https://www.tencent.com/img/index/menu_logo_hover.png"
            alt="logo"
          />
        </template>
        <template v-for="menuListItem in topMenuList" :key="menuListItem.router">
          <t-menu-item :value="menuListItem.router">
            {{ menuListItem.label }}
          </t-menu-item>
        </template>
        <t-menu-item value="item4"> LangSmith </t-menu-item>
        <t-menu-item value="item4"> OpenWiki </t-menu-item>
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
          <template v-for="menuListItem in sideMenuList" :key="menuListItem.router">
            <t-menu-item :value="menuListItem.router">
              <template #icon>
                <t-icon :name="menuListItem.icon" />
              </template>
              {{ menuListItem.label }}
            </t-menu-item>
          </template>
        </t-menu>
      </t-aside>
      <t-layout>
        <slot name="content">
          <t-content>
            <div>
              <p>Welcome to your Electron application.</p>
              <button id="btnFolder">Dialog 打开文件夹</button>
              <button id="btnNotify">Notification 桌面通知</button>
              <button id="btnUrl">Shell GitHub</button>
              <t-space>
                <t-button loading ghost theme="success">加载</t-button>
              </t-space>
            </div>
          </t-content>
        </slot>
        <t-footer
          >Copyright @ 2019-{{ new Date().getFullYear() }} Tencent. All Rights Reserved</t-footer
        >
      </t-layout>
    </t-layout>
  </t-layout>
</template>

<script setup>
import { useTheme } from '@/hooks/useTheme';
import { useHome } from './index.js';
let { checked, topMenuList, sideMenuList } = useHome();
import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<style scoped>
button {
  margin: 8px;
  padding: 6px 12px;
  cursor: pointer;
}
</style>
