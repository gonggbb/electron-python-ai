## 技术特性

- ⚡ **Vite 驱动**：主进程、Preload、Renderer 均使用 Vite 构建
- 🔒 **安全隔离**：Preload 脚本通过上下文桥接暴露安全 API
- 🎨 **TDesign**：腾讯设计体系，企业级 UI 组件
- 🌍 **国际化**：内置 Vue I18n，支持多语言切换
- 🔄 **自动更新**：集成 `update-electron-app`
- 📦 **多平台打包**：支持 Windows (Squirrel)、macOS (Zip)、Linux (deb/rpm)
- 📝 **Git 规范**：Conventional Commits + Commitlint + Husky
- 🚀 **CI 发布**：release-it 自动化版本管理与 GitHub Release

---

## 项目架构简介

### 技术栈

| 层级            | 技术                | 说明                                         |
| --------------- | ------------------- | -------------------------------------------- |
| **桌面端框架**  | Electron 43         | 跨平台桌面应用壳层                           |
| **前端框架**    | Vue 3.5             | 组合式 API，响应式 UI                        |
| **构建工具**    | Vite 5              | 极速开发与构建（electron-forge/plugin-vite） |
| **UI 组件库**   | TDesign Vue Next    | 腾讯企业级 Vue3 组件库                       |
| **状态管理**    | Pinia 4             | 轻量级状态管理，替代 Vuex                    |
| **路由**        | Vue Router 4        | 单页应用路由管理                             |
| **国际化**      | Vue I18n 11         | 多语言支持                                   |
| **HTTP 客户端** | Axios               | API 请求                                     |
| **自动更新**    | update-electron-app | 内置自动更新能力                             |
| **语言**        | TypeScript 5.8      | 全栈类型安全                                 |

### 工程化工具链

| 工具                                           | 用途                                          |
| ---------------------------------------------- | --------------------------------------------- |
| **Electron Forge**                             | 应用打包（deb/rpm/squirrel/zip）、GitHub 发布 |
| **ESLint 10 + typescript-eslint + vue-eslint** | 代码静态检查                                  |
| **Prettier**                                   | 代码格式化                                    |
| **Husky + lint-staged**                        | Git 提交前自动校验                            |
| **Commitlint**                                 | Commit 信息规范（Conventional Commits）       |
| **release-it**                                 | 语义化版本发布（patch/minor/major）           |

## 项目脚本速查

| 脚本                    | 说明              |
| ----------------------- | ----------------- |
| `npm run start`         | 开发模式启动      |
| `npm run package`       | 打包应用          |
| `npm run make`          | 构建平台安装包    |
| `npm run publish`       | 发布到 GitHub     |
| `npm run lint`          | ESLint 检查       |
| `npm run lint:fix`      | ESLint 自动修复   |
| `npm run format`        | Prettier 格式化   |
| `npm run format:check`  | Prettier 格式检查 |
| `npm run release`       | 交互式版本发布    |
| `npm run release:patch` | 自动补丁发布      |
| `npm run release:minor` | 自动次要发布      |
| `npm run release:major` | 自动主要发布      |
