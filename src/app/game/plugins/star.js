const Phaser = window.Phaser;

import addBooleanProp from '../../utils/bool-prop';

export default function build(game) {
  const {input} = game;

  const plugin = new Phaser.Plugin();

  let star;
  let wasd;

  addBooleanProp(plugin, 'enabled', true, enabled => {
    star.visible = enabled;
  });

  plugin.init = () => {
    // Add star
    star = game.add.sprite(800 / 2, 450 / 2, 'star');
    star.anchor.set(0.5);
    star.visible = plugin.enabled;

    // WASD Controller
    wasd = input.keyboard.createCursorKeys();
  };

  plugin.update = () => {
    const vector = getVector(wasd);
    vector.setMagnitude(200);

    const pos = new Phaser.Point(800 / 2, 450 / 2);
    Phaser.Point.add(pos, vector, pos);
    star.position.copyFrom(pos);
  };

  return plugin;
}

function getVector(wasd) {
  let yPos = wasd.up.isDown ? -1 : 0;
  yPos += wasd.down.isDown ? 1 : 0;

  let xPos = wasd.left.isDown ? -1 : 0;
  xPos += wasd.right.isDown ? 1 : 0;

  return new Phaser.Point(xPos, yPos);
}
