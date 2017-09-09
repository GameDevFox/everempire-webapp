import 'pixi';
import 'p2';
import Phaser from 'phaser';

export default function build({ input, scale }) {
  const plugin = new Phaser.Plugin();

  const { ALT, ENTER } = Phaser.KeyCode;

  plugin.init = () => {
    scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

    const fullscreenKey = input.keyboard.addKey(ENTER);
    fullscreenKey.onDown.add(() => {
      if(!input.keyboard.isDown(ALT))
        return;

      if(scale.isFullScreen)
        scale.stopFullScreen();
      else
        scale.startFullScreen(true);
    });
  };

  return plugin;
}
