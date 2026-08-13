<template>
  <layout>
    <template #content>
      <t-space>
        <t-button :loading="checking" @click="onCheckUpdate"> 检查更新 </t-button>
        <span v-if="msg">{{ msg }}</span>
      </t-space>
      <!-- {
            "tag": "v0.1.2",
            "name": "v0.1.2",
            "publishedAt": "2026-08-13T08:45:22Z",
            "body": "",
            "htmlUrl": "https://github.com/gonggbb/electron-python-ai/releases/tag/v0.1.2",
            "assets": [
                {
                    "name": "AIAssistant-0.1.2-1.x86_64.rpm",
                    "downloadUrl": "https://github.com/gonggbb/electron-python-ai/releases/download/v0.1.2/AIAssistant-0.1.2-1.x86_64.rpm",
                    "size": 101242621
                },
                {
                    "name": "AIAssistant-0.1.2-full.nupkg",
                    "downloadUrl": "https://github.com/gonggbb/electron-python-ai/releases/download/v0.1.2/AIAssistant-0.1.2-full.nupkg",
                    "size": 139216328
                },
                {
                    "name": "AIAssistant-0.1.2.Setup.exe",
                    "downloadUrl": "https://github.com/gonggbb/electron-python-ai/releases/download/v0.1.2/AIAssistant-0.1.2.Setup.exe",
                    "size": 140262400
                },
                {
                    "name": "AIAssistant-darwin-arm64-0.1.2.zip",
                    "downloadUrl": "https://github.com/gonggbb/electron-python-ai/releases/download/v0.1.2/AIAssistant-darwin-arm64-0.1.2.zip",
                    "size": 118943350
                },
                {
                    "name": "aiassistant_0.1.2_amd64.deb",
                    "downloadUrl": "https://github.com/gonggbb/electron-python-ai/releases/download/v0.1.2/aiassistant_0.1.2_amd64.deb",
                    "size": 96414746
                },
                {
                    "name": "RELEASES",
                    "downloadUrl": "https://github.com/gonggbb/electron-python-ai/releases/download/v0.1.2/RELEASES",
                    "size": 82
                }
            ]
        }
      -->
      <t-card v-for="item in versions" :key="item.tag" bordered>
        <t-row
          v-for="item in [
            {
              label: 'Tag',
              value: item.tag,
            },
            {
              label: 'Name',
              value: item.name,
            },
            {
              label: 'Published At',
              value: item.publishedAt,
            },
          ]"
          :key="item.label"
          justify="start"
        >
          <t-col :span="8"> {{ item.label }}</t-col>
          <t-col :span="16">
            <t-tag>{{ item.value }}</t-tag>
          </t-col>
        </t-row>
        <t-row>
          <t-tag>{{ item.htmlUrl }}</t-tag>
        </t-row>
        <t-list :split="true">
          <t-list-item v-for="item in item.assets" :key="item.name">
            <t-list-item-meta
              :title="item.name"
              :description="`Size: ${(item.size / 1024 / 1024).toFixed(2)} MB`"
            />
            <template #action>
              <!-- 下载 -->
              <t-button
                variant="text"
                shape="square"
                href="item.downloadUrl"
                target="_blank"
                download
              >
                <!-- {{ item.downloadUrl }} -->
                <download-icon />
              </t-button>
            </template>
          </t-list-item>
        </t-list>
      </t-card>
    </template>
  </layout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import layout from '@/layout/main/index.vue';
import { DownloadIcon } from 'tdesign-icons-vue-next';
const checking = ref(false);
const msg = ref('');

async function onCheckUpdate() {
  checking.value = true;
  msg.value = '';
  try {
    const res = await window.electronAPI.checkForUpdates();
    msg.value = res.message;
    if (res.status === 'available') {
      MessagePlugin.success(res.message);
    } else if (res.status === 'not-available') {
      MessagePlugin.info(res.message);
    } else {
      MessagePlugin.warning(res.message);
    }
  } catch (e) {
    MessagePlugin.error(e.message || '检查失败');
  } finally {
    checking.value = false;
  }
}

let versions = ref([]);
const getRemoteVersions = async () => {
  const remoteVersions = await window.electronAPI.getRemoteVersionList();
  console.log('Remote Versions:', remoteVersions);
  versions.value = remoteVersions;
  return remoteVersions;
};
onMounted(() => {
  getRemoteVersions();
});
</script>
