export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修复 bug
        'docs', // 文档变更
        'style', // 代码格式（不影响功能）
        'refactor', // 重构
        'perf', // 性能优化
        'test', // 测试相关
        'build', // 构建系统或依赖变更
        'ci', // CI 配置
        'chore', // 其他杂项
        'revert', // 回滚
      ],
    ],
    'subject-case': [0], // 不强制 subject 大小写
    // 'subject-max-length': [2, 'always', 72],
    // 'body-max-line-length': [2, 'always', 100],
  },
  // cz-git 专用配置
  prompt: {
    types: [
      { value: 'feat', name: '✨ feat:     新功能' },
      { value: 'fix', name: '🐛 fix:      修复 Bug' },
      { value: 'docs', name: '📝 docs:     文档变更' },
      { value: 'style', name: '💄 style:    代码格式（不影响逻辑）' },
      { value: 'refactor', name: '♻️ refactor: 重构' },
      { value: 'test', name: '✅ test:     测试相关' },
      { value: 'chore', name: '🔧 chore:    构建/工具调整' },
      { value: 'perf', name: '⚡ perf:     性能优化' },
      { value: 'ci', name: '👷 ci:       CI 配置' },
      { value: 'revert', name: '⏪ revert:   回滚提交' },
    ],

    scopes: [
      { name: 'components' },
      { name: 'views' },
      { name: 'utils' },
      { name: 'api' },
      { name: 'styles' },
      { name: 'build' },
    ],

    messages: {
      type: '选择提交类型：',
      scope: '选择影响范围（可选）：',
      subject: '填写简短描述：',
      body: '填写详细描述（可选）：',
      footer: '填写关闭的 Issue（可选）：',
      confirm: '确认提交信息？',
    },

    subjectLimit: 100,
    allowEmptyScopes: true,
    allowBreakingChanges: ['feat', 'fix'],
    skipQuestions: ['body', 'footer'], // 可按需跳过问题
  },
};
