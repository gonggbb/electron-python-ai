<template>
  <layout>
    <template #content>
      <t-space>
        <t-button @click="router.push('/about')">{{ t('about') }}</t-button>
        <t-button @click="toggleLang">{{ t('switchLang') }}</t-button>
        <t-button @click="counter.increment">Count: {{ counter.count }}</t-button>
      </t-space>
      <p>{{ t('hello') }}</p>
    </template>
  </layout>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useCounterStore } from '@/stores/counter';
import { useAppStore } from '@/stores/app';
import i18n from '@/i18n';
import layout from '@/layout/main/index.vue';

const { t, locale } = useI18n();
const router = useRouter();
const counter = useCounterStore();
const appStore = useAppStore();

function toggleLang() {
  const newLang = locale.value === 'zh-CN' ? 'en-US' : 'zh-CN';
  locale.value = newLang;
  appStore.setLocale(newLang);
  i18n.global.locale.value = newLang;
}
</script>
