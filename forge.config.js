const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');
// 在文件最开头添加
// require('dotenv').config();
module.exports = {
  packagerConfig: {
    asar: true,
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
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
    }
  },
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'gonggbb',
          name: 'electron-python-ai'
        },
        rerelease: true,
      }
    }
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-vite',
      config: {
        // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
        // ‘ build ’可以指定多条目构建，可以是主进程，预加载脚本，工作进程等。
        // If you are familiar with Vite configuration, it will look really familiar.
        // 如果您熟悉Vite配置，它看起来会非常熟悉。
        build: [
          {
            // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
            // ‘ entry ‘只是’ build.lib ’的别名。在相应的config文件中输入'。
            entry: 'src/main.js',
            config: 'vite.main.config.mjs',
            target: 'main',
          },
          {
            entry: 'src/preload.js',
            config: 'vite.preload.config.mjs',
            target: 'preload',
          },
        ],
        renderer: [
          {
            name: 'main_window',
            config: 'vite.renderer.config.mjs',
          },
        ],
      },
    },
    // Fuses are used to enable/disable various Electron functionality
    // 保险丝用于启用/禁用各种电子功能
    // at package time, before code signing the application
    // 在包时，在对应用程序进行代码签名之前
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
