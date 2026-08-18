<template>
  <layout>
    <template #content>
      <t-content class="skills-page">
        <div class="skills-layout">
          <aside class="skills-sidebar">
            <div class="skills-header">
              <div>
                <h3>Skill Library</h3>
                <p>Manage and preview markdown-based skill notes</p>
              </div>
              <t-button size="small" theme="primary" @click="addSkill">New</t-button>
            </div>

            <div
              v-for="item in skills"
              :key="item.id"
              class="skill-item"
              :class="{ active: item.id === selectedSkillId }"
              @click="selectSkill(item.id)"
            >
              <div class="skill-title">{{ item.name }}</div>
              <div class="skill-meta">{{ item.category }}</div>
            </div>
          </aside>

          <section class="skills-main">
            <div class="skills-toolbar">
              <div>
                <span class="skills-badge">{{ selectedSkill?.category }}</span>
                <h2>{{ selectedSkill?.name }}</h2>
              </div>

              <div class="toolbar-actions">
                <t-button size="small" variant="outline" @click="toggleEditMode">
                  {{ isEditing ? 'Preview' : 'Edit' }}
                </t-button>
                <t-button size="small" theme="danger" variant="outline" @click="removeSkill">
                  Delete
                </t-button>
              </div>
            </div>

            <div v-if="isEditing" class="editor-panel">
              <textarea v-model="draftContent" class="markdown-editor" spellcheck="false" />
              <div class="editor-actions">
                <t-button theme="primary" @click="saveSkill">Save</t-button>
                <t-button variant="text" @click="cancelEdit">Cancel</t-button>
              </div>
            </div>

            <div v-else class="markdown-preview">
              <div class="markdown-body" v-html="renderMarkdown(selectedSkill?.content ?? '')" />
            </div>
          </section>
        </div>
      </t-content>
    </template>
  </layout>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import layout from '@/layout/main/index.vue';

interface SkillItem {
  id: string;
  name: string;
  category: string;
  content: string;
}

const initialSkills: SkillItem[] = [
  {
    id: 'product-overview',
    name: 'Product Overview',
    category: 'Operations',
    content: `# Product Overview

## Goals

- Improve team collaboration
- Standardize knowledge assets
- Support Markdown skill documentation

## Usage

1. Select a skill on the left
2. Click Edit to update the content
3. Save and preview the result

> Works well for product, engineering, and operations teams.

\`\`\`bash
npm run start
\`\`\`
`,
  },
  {
    id: 'qa-rules',
    name: 'Quality Standards',
    category: 'Engineering',
    content: `# Quality Standards

## Code requirements

- Pass ESLint checks
- Run Prettier before commit
- Add tests for key changes

## Release requirements

- Update changelog
- Verify core flows
- Record regression results

[View project docs](https://github.com/gonggbb/electron-python-ai)`,
  },
];

const skills = ref<SkillItem[]>(initialSkills);
const selectedSkillId = ref<string>(initialSkills[0].id);
const draftContent = ref<string>(initialSkills[0].content);
const isEditing = ref(false);

const selectedSkill = computed(
  () => skills.value.find((skill) => skill.id === selectedSkillId.value) ?? skills.value[0],
);

const toggleEditMode = () => {
  isEditing.value = !isEditing.value;
  if (isEditing.value) {
    draftContent.value = selectedSkill.value.content;
  }
};

const selectSkill = (skillId: string) => {
  selectedSkillId.value = skillId;
  isEditing.value = false;
};

const saveSkill = () => {
  const current = selectedSkill.value;
  if (!current) {
    return;
  }

  current.content = draftContent.value.trim() || '# New Skill\n\nAdd more context here';
  current.name = extractTitle(current.content) || current.name;
  isEditing.value = false;
};

const cancelEdit = () => {
  draftContent.value = selectedSkill.value.content;
  isEditing.value = false;
};

const addSkill = () => {
  const uniqueNumber = skills.value.length + 1;
  const newSkill: SkillItem = {
    id: `skill-${Date.now()}`,
    name: `New Skill ${uniqueNumber}`,
    category: 'Custom',
    content: '# New Skill\n\n- Add a description\n- Add example usage',
  };

  skills.value.unshift(newSkill);
  selectedSkillId.value = newSkill.id;
  draftContent.value = newSkill.content;
  isEditing.value = true;
};

const removeSkill = () => {
  if (skills.value.length <= 1) {
    return;
  }

  const nextSkills = skills.value.filter((skill) => skill.id !== selectedSkillId.value);
  skills.value = nextSkills;
  selectedSkillId.value = nextSkills[0].id;
  draftContent.value = nextSkills[0].content;
  isEditing.value = false;
};

watch(
  selectedSkill,
  (skill) => {
    if (skill) {
      draftContent.value = skill.content;
    }
  },
  { immediate: true },
);

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const renderInline = (value: string) => {
  let result = escapeHtml(value);
  result = result.replace(/`([^`]+)`/g, '<code>$1</code>');
  result = result.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  result = result.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  result = result.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]+)\)/g,
    '<a href="$2" target="_blank" rel="noreferrer">$1</a>',
  );
  return result;
};

const renderMarkdown = (markdown: string) => {
  if (!markdown.trim()) {
    return '<p>No skill description yet.</p>';
  }

  const blocks = markdown.split(/\n\s*\n/);

  return blocks
    .map((block) => {
      const lines = block.split('\n');
      const firstLine = lines[0].trim();

      if (firstLine.startsWith('```')) {
        const language = firstLine.replace(/^```/, '').trim();
        const code = lines.slice(1).join('\n').trim();
        return `<pre class="code-block"><code class="language-${language || 'plaintext'}">${escapeHtml(code)}</code></pre>`;
      }

      if (/^#{1,3}\s+/.test(firstLine)) {
        const level = firstLine.match(/^#+/)?.[0].length ?? 1;
        const text = renderInline(firstLine.replace(/^#+\s*/, ''));
        return `<h${level}>${text}</h${level}>`;
      }

      if (/^[-*]\s+/.test(firstLine)) {
        const items = lines
          .map((line) =>
            line.trim().startsWith('- ') || line.trim().startsWith('* ')
              ? `<li>${renderInline(line.trim().slice(2))}</li>`
              : '',
          )
          .filter(Boolean)
          .join('');
        return `<ul>${items}</ul>`;
      }

      if (/^\d+\.\s+/.test(firstLine)) {
        const items = lines
          .map((line) =>
            line.trim().match(/^\d+\.\s+/)
              ? `<li>${renderInline(line.trim().replace(/^\d+\.\s+/, ''))}</li>`
              : '',
          )
          .filter(Boolean)
          .join('');
        return `<ol>${items}</ol>`;
      }

      if (firstLine.startsWith('>')) {
        const quote = lines.map((line) => renderInline(line.replace(/^>\s?/, ''))).join('<br />');
        return `<blockquote>${quote}</blockquote>`;
      }

      return `<p>${renderInline(block)}</p>`;
    })
    .join('');
};

const extractTitle = (value: string) => {
  const match = value.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : '';
};
</script>

<style scoped>
.skills-page {
  height: 100%;
  padding: 24px;
  background: var(--td-bg-color-page, #f5f7fa);
}

.skills-layout {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: 24px;
  height: calc(100vh - 220px);
  min-height: 520px;
}

.skills-sidebar,
.skills-main {
  background: var(--td-bg-color-container, #fff);
  border: 1px solid var(--td-component-stroke, #e7e7e7);
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
}

.skills-sidebar {
  padding: 20px 16px;
}

.skills-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.skills-header h3,
.skills-toolbar h2 {
  margin: 0;
}

.skills-header p {
  margin: 4px 0 0;
  color: #7a7a7a;
  font-size: 12px;
}

.skill-item {
  padding: 12px 14px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 8px;
}

.skill-item:hover,
.skill-item.active {
  background: rgba(41, 104, 255, 0.08);
  border: 1px solid rgba(41, 104, 255, 0.18);
}

.skill-title {
  font-weight: 600;
  margin-bottom: 4px;
}

.skill-meta {
  color: #7a7a7a;
  font-size: 12px;
}

.skills-main {
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.skills-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--td-component-stroke, #e7e7e7);
}

.skills-badge {
  display: inline-block;
  margin-bottom: 8px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(24, 144, 255, 0.1);
  color: #1677ff;
  font-size: 12px;
}

.toolbar-actions,
.editor-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.editor-panel,
.markdown-preview {
  flex: 1;
  min-height: 0;
  margin-top: 20px;
}

.markdown-editor {
  width: 100%;
  min-height: 320px;
  padding: 16px;
  border: 1px solid var(--td-component-stroke, #e7e7e7);
  border-radius: 12px;
  resize: vertical;
  background: #fafbfc;
  font-size: 14px;
  line-height: 1.7;
  color: #1f2329;
  box-sizing: border-box;
}

.markdown-editor:focus {
  outline: 2px solid rgba(24, 144, 255, 0.18);
  border-color: #6ea8fe;
}

.markdown-body {
  height: 100%;
  overflow: auto;
  padding: 6px 4px 0;
  line-height: 1.8;
  color: #1f2329;
}

.markdown-body :deep(h1),
.markdown-body :deep(h2),
.markdown-body :deep(h3) {
  margin-top: 1.25em;
  margin-bottom: 0.5em;
}

.markdown-body :deep(p),
.markdown-body :deep(ul),
.markdown-body :deep(ol),
.markdown-body :deep(blockquote),
.markdown-body :deep(pre) {
  margin: 0 0 1em;
}

.markdown-body :deep(ul),
.markdown-body :deep(ol) {
  padding-left: 1.5em;
}

.markdown-body :deep(code) {
  background: rgba(31, 35, 41, 0.06);
  padding: 2px 6px;
  border-radius: 6px;
  font-size: 0.92em;
}

.markdown-body :deep(pre) {
  padding: 12px 14px;
  background: #111827;
  border-radius: 10px;
  overflow: auto;
}

.markdown-body :deep(pre code) {
  background: transparent;
  padding: 0;
  color: #f8fafc;
}

.markdown-body :deep(blockquote) {
  padding: 8px 14px;
  border-left: 4px solid #7aa2ff;
  background: rgba(122, 162, 255, 0.08);
  border-radius: 4px;
}

.markdown-body :deep(a) {
  color: #1677ff;
}

@media (max-width: 900px) {
  .skills-layout {
    grid-template-columns: 1fr;
    height: auto;
  }

  .skills-sidebar,
  .skills-main {
    min-height: 300px;
  }
}
</style>
