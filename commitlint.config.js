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
};
