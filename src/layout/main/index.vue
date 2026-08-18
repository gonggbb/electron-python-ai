<template>
  <t-layout class="app-container">
    <t-header>
      <t-head-menu
        value="item1"
        height="120px"
        @change="
          (value: string) => {
            console.log(value);
            router.push(value);
          }
        "
      >
        <!-- <template #logo> <img
            width="136"
            class="logo"
            src="https://www.tencent.com/img/index/menu_logo_hover.png"
            alt="logo"
        
          />
          </template> -->
        <template #logo>
          <img :width="collapsed ? 35 : 136" :src="iconUrl" alt="logo" />
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
        <t-menu :collapsed="collapsed" theme="light" height="550px" @change="changeHandler">
          <!-- <template #logo>
            <img :width="collapsed ? 35 : 136" :src="iconUrl" alt="logo" />
          </template> -->
          <template v-for="menuListItem in sideMenuList" :key="menuListItem.router">
            <t-menu-item :value="menuListItem.router">
              <template #icon>
                <t-icon :name="menuListItem.icon" />
              </template>
              {{ menuListItem.label }}
            </t-menu-item>
          </template>
          <template #operations>
            <t-button
              class="t-demo-collapse-btn"
              variant="text"
              shape="square"
              @click="changeCollapsed"
            >
              <template #icon><t-icon name="view-list" /></template>
            </t-button>
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

<script setup lang="ts">
import { useTheme } from '@/hooks/useTheme';
import { useHome } from './index.js';
import { useRoute, useRouter } from 'vue-router';
import { CalendarIcon } from 'tdesign-icons-vue-next';
let { checked, topMenuList, sideMenuList } = useHome();
const router = useRouter();
const route = useRoute();
console.log(route.path);
import { ref } from 'vue';
import type { MenuProps, ButtonProps } from 'tdesign-vue-next';

const collapsed = ref(true);
const iconUrl = ref(
  'https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/logo%402x.png',
);
const changeCollapsed: ButtonProps['onClick'] = () => {
  collapsed.value = !collapsed.value;
  iconUrl.value = collapsed.value
    ? 'https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/logo%402x.png'
    : 'https://tdesign.gtimg.com/site/baseLogo-light.png';
};
const changeHandler: MenuProps['onChange'] = (active) => {
  console.log('change', active);
  router.push(active as string);
};
</script>

<style scoped>
button {
  margin: 8px;
  padding: 6px 12px;
  cursor: pointer;
}
.t-layout__sider {
  width: unset;
}

.t-icon {
  /* 比例 1：1*/
  width: 20px;
  aspect-ratio: 1 / 1;
}
</style>
