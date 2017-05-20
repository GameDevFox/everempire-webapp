import 'pixi';
import 'p2';
import Phaser from 'phaser';

export default function build({debug, time}) {
  const plugin = new Phaser.Plugin();

  const pos = new Phaser.Point();
  plugin.position = pos;

  plugin.init = () => {
    time.advancedTiming = true;
  };

  plugin.render = () => {
    debug.text(`FPS: ${time.fps}`, pos.x, pos.y);
    debug.text(`Physics Elapsed: ${time.physicsElapsed}`, pos.x, pos.y + 20);
  };

  return plugin;
}
