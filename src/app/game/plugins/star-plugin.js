const Phaser = window.Phaser;

import addBooleanProp from '../../utils/bool-prop';

export default function build(game) {
  const {input} = game;

  const starPlugin = new Phaser.Plugin();

  let star;
  let wasd;

  addBooleanProp(starPlugin, 'enabled', true, enabled => {
    star.visible = enabled;
  });

  starPlugin.init = () => {
    // Add star
    star = game.add.sprite(800 / 2, 450 / 2, 'star');
    star.anchor.set(0.5);
    star.visible = starPlugin.enabled;

    // WASD Controller
    wasd = input.keyboard.createCursorKeys();
  };

  starPlugin.update = () => {
    const vector = getVector(wasd);
    vector.setMagnitude(200);

    const pos = new Phaser.Point(800 / 2, 450 / 2);
    Phaser.Point.add(pos, vector, pos);
    star.position.copyFrom(pos);
  };

  return starPlugin;
}

function getVector(wasd) {
  let yPos = wasd.up.isDown ? -1 : 0;
  yPos += wasd.down.isDown ? 1 : 0;

  let xPos = wasd.left.isDown ? -1 : 0;
  xPos += wasd.right.isDown ? 1 : 0;

  return new Phaser.Point(xPos, yPos);
}
