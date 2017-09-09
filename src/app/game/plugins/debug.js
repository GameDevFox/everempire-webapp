import 'pixi';
import 'p2';
import Phaser from 'phaser';

export default function build({ debug, time, genesisService }) {
  const plugin = new Phaser.Plugin();

  const pos = new Phaser.Point();
  plugin.position = pos;

  plugin.init = () => {
    time.advancedTiming = true;
  };

  plugin.render = () => {
    debug.text(`FPS: ${time.fps}`, pos.x, pos.y);
    debug.text(`Ping: ${genesisService.pingTime()}`, pos.x, pos.y + 20);
    debug.text(`Offset: ${genesisService.offset()}`, pos.x, pos.y + 40);
  };

  return plugin;
}
