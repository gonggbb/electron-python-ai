<template>
  <layout>
    <template #content>
      <t-empty type="maintenance" :size="size"></t-empty>
    </template>
  </layout>
</template>

<script setup>
import layout from '@/layout/main/index.vue';
import { ref } from 'vue';
let size = ref('large');
</script>
