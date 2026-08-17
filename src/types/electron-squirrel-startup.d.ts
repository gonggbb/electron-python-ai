/**
 * electron-squirrel-startup 的模块类型声明。
 * 该包没有内置类型，且通过 CommonJS module.exports 直接导出一个布尔值，
 * 用于判断当前是否为 Squirrel.Windows 的安装/卸载/更新事件。
 * src/electron-squirrel-startup.d.ts，通过 declare module 声明 started: boolean 默认导出，与包的实际 CJS 行为一致。消除了类型隐患并带来编译期校验
 */
declare module 'electron-squirrel-startup' {
  /**
   * true 表示当前进程由 Squirrel 安装/卸载脚本触发，主进程应直接退出。
   */
  const started: boolean;
  export default started;
}
