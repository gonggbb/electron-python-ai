import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { VitePlugin } from '@electron-forge/plugin-vite';
import { FusesPlugin } from '@electron-forge/plugin-fuses';
import { FuseV1Options, FuseVersion } from '@electron/fuses';

// 在文件最开头添加
// require('dotenv').config();
const config: ForgeConfig = {
  packagerConfig: {
    // `asar` 是 Electron 自研的**类压缩打包格式**
    asar: true,
    icon: './icons/icon',
    // 把 icons 目录整个复制到 resources 下
    extraResource: [
      './icons', // 或者只写单个文件 './icons/icon.png'
    ],
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({
      setupIcon: './icons/icon.ico',
    }),
    new MakerZIP({}, ['darwin']),
    new MakerRpm({}),
    new MakerDeb({}),
  ],
  hooks: {
    // 打包前的钩子函数
    preStart: async (forgeConfig) => {
      console.log('应用即将启动...');
    },
    // 编译与资源生成钩子（Assets & Read Hooks）
    readPackageJson: async (forgeConfig, packageJson) => {
      // 动态设置版本号
      packageJson.version = process.env.BUILD_VERSION || packageJson.version;
      return packageJson;
    },
    // 打包后的钩子函数
    postPackage: async (forgeConfig, options) => {
      console.log('打包完成，输出目录：', options.outputPaths);
    },
  },
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'gonggbb',
          name: 'electron-python-ai',
        },
        rerelease: true,
      },
    },
  ],
  plugins: [
    new VitePlugin({
      // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
      // ‘ build ’可以指定多条目构建，可以是主进程，预加载脚本，工作进程等。
      // If you are familiar with Vite configuration, it will look really familiar.
      // 如果您熟悉Vite配置，它看起来会非常熟悉。
      build: [
        {
          // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
          // ‘ entry ‘只是’ build.lib ’的别名。在相应的config文件中输入'。
          entry: 'src/main.ts',
          config: 'vite.main.config.mts',
          target: 'main',
        },
        {
          entry: 'src/preload.ts',
          config: 'vite.preload.config.mts',
          target: 'preload',
        },
      ],
      renderer: [
        {
          name: 'main_window',
          config: 'vite.renderer.config.mts',
        },
      ],
    }),
    // Fuses are used to enable/disable various Electron functionality
    // 保险丝用于启用/禁用各种电子功能
    // at package time, before code signing the application
    // 在包时，在对应用程序进行代码签名之前
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
export default config;
