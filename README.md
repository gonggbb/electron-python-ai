```
npm install update-electron-app

npm install --save-dev \
  @electron-forge/maker-squirrel \
  @electron-forge/maker-zip \
  @electron-forge/maker-dmg \
  @electron-forge/maker-deb \
  @electron-forge/maker-rpm

npm install vue
npm install --save-dev @vitejs/plugin-vue

npm install -D eslint @eslint/js eslint-plugin-vue globals prettier eslint-config-prettier eslint-plugin-prettier

npm install -D husky lint-staged
npx husky init

npm install -D @commitlint/cli @commitlint/config-conventional

# 发布
git tag v0.1.3 && git push origin v0.1.3
git ls-remote --tags origin
git tag -d v1.0.1 && git push origin --delete v1.0.1
git log --oneline
git log -5
git log --grep="fix "
git log --stat
git log --since="2 weeks ago"
git log --after="2024-01-01" --before="2024-06-01"
git log --pretty=format:"%h - %an, %ar : %s"
# 回退最近 1 次提交 保留‌暂存区和工作区的修改
git reset --soft HEAD~1

git add .
git commit -m "test: husky + lint-staged"
<!-- 不检验 -->
git commit -m "xxx" --no-verify

npm install -D @tdesign-vue-next/auto-import-resolver unplugin-vue-components unplugin-auto-import

npm i tdesign-vue-next

npm install vue-router@4 pinia axios vue-i18n@11
```
