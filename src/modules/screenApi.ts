import { screen } from 'electron';

// ========== 2. Screen 屏幕信息API ==========
export const getScreenInfo = () => {
  const primaryDisplay = screen.getPrimaryDisplay();
  console.log('主屏幕分辨率：', primaryDisplay.size);
  const displays = screen.getAllDisplays();
  const screenInfo = displays.map((display) => {
    return {
      id: display.id,
      bounds: display.bounds,
      workArea: display.workArea,
      size: display.size,
      scaleFactor: display.scaleFactor,
      rotation: display.rotation,
      touchSupport: display.touchSupport,
    };
  });
  return screenInfo;
};
