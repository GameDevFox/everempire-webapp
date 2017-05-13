import Phaser from 'phaser';

export default function build({debug, time}) {
  const debugPlugin = new Phaser.Plugin();

  const pos = new Phaser.Point();
  debugPlugin.position = pos;

  debugPlugin.init = () => {
    time.advancedTiming = true;
  };

  debugPlugin.render = () => {
    debug.text(`FPS: ${time.fps}`, pos.x, pos.y);
    debug.text(`Physics Elapsed: ${time.physicsElapsed}`, pos.x, pos.y + 20);
  };

  return debugPlugin;
}
