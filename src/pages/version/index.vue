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
      <t-card v-for="version in versions" :key="version.tag" bordered>
        <t-row
          v-for="row in [
            {
              label: 'Tag',
              value: version.tag,
            },
            {
              label: 'Name',
              value: version.name,
            },
            {
              label: 'Published At',
              value: version.publishedAt,
            },
          ]"
          :key="row.label"
          justify="start"
        >
          <t-col :span="8"> {{ row.label }}</t-col>
          <t-col :span="16">
            <t-tag>{{ row.value }}</t-tag>
          </t-col>
        </t-row>
        <t-row>
          <t-tag>{{ version.htmlUrl }}</t-tag>
        </t-row>
        <t-list :split="true">
          <t-list-item v-for="asset in version.assets" :key="asset.name">
            <t-list-item-meta
              :title="asset.name"
              :description="`Size: ${(asset.size / 1024 / 1024).toFixed(2)} MB`"
            />
            <template #action>
              <!-- 下载 -->
              <t-button
                variant="text"
                shape="square"
                :href="asset.downloadUrl"
                target="_blank"
                download
              >
                <download-icon />
              </t-button>
            </template>
          </t-list-item>
        </t-list>
      </t-card>
    </template>
  </layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import layout from '@/layout/main/index.vue';
import { DownloadIcon } from 'tdesign-icons-vue-next';
import { RemoteVersion } from '@/types/remote';
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
    const error = e as Error;
    MessagePlugin.error(error.message || '检查失败');
  } finally {
    checking.value = false;
  }
}

const versions = ref<RemoteVersion[]>([]);
const getRemoteVersions = async () => {
  if (!window.electronAPI) {
    MessagePlugin.error('未检测到主进程 API，请确认 preload 已正确注入');
    return;
  }
  try {
    const remoteVersions = await window.electronAPI.getRemoteVersionList();
    console.log('Remote Versions:', remoteVersions);
    versions.value = remoteVersions ?? [];
  } catch (e) {
    const error = e as Error;
    MessagePlugin.error(error.message || '获取远程版本列表失败');
  }
};
onMounted(() => {
  getRemoteVersions();
});
</script>
