import 'pixi';
import 'p2';
import Phaser from 'phaser';

export default function build({debug, time, genesis}) {
  const plugin = new Phaser.Plugin();

  const pos = new Phaser.Point();
  plugin.position = pos;

  plugin.init = () => {
    time.advancedTiming = true;
  };

  plugin.render = () => {
    debug.text(`FPS: ${time.fps}`, pos.x, pos.y);
    debug.text(`Ping: ${genesis.ping}`, pos.x, pos.y + 20);
    debug.text(`Offset: ${genesis.offset}`, pos.x, pos.y + 40);
  };

  return plugin;
}
