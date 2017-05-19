const Phaser = window.Phaser;
const {Plugin, Point} = Phaser;

import addBooleanProp from '../../utils/bool-prop';
import DirectionPad from '../tools/direction-pad';

export default function build(game) {
  const {debug, input, physics, time} = game;

  const plugin = new Plugin();

  let wasd;
  let dPad;
  let playerStar;

  addBooleanProp(plugin, 'enabled', true, enabled => {
    playerStar.visible = enabled;
  });

  plugin.init = () => {
    // Add playerStar
    playerStar = game.add.sprite(800 / 2, 450 / 2, 'star');
    playerStar.anchor.set(0.5);
    playerStar.visible = plugin.enabled;

    // Enable physics
    physics.p2.enable(playerStar);
    playerStar.body.fixedRotation = true;

    // WASD Controller
    wasd = input.keyboard.createCursorKeys();
    dPad = new DirectionPad({limit: 200, speed: 800});
  };

  // Simple movement
  // plugin.update = () => {
  //   const speed = 200;
  //
  //   const vector = getAxis(wasd);
  //   vector.setMagnitude(speed);
  //
  //   // const pos = new Point(800 / 2, 450 / 2);
  //   // Point.add(pos, vector, pos);
  //   // playerStar.body.x = pos.x;
  //   // playerStar.body.y = pos.y;
  //
  //   playerStar.body.velocity.x = vector.x;
  //   playerStar.body.velocity.y = vector.y;
  // };

  // Fancy movement
  plugin.update = () => {
    const axis = getAxis(wasd);
    dPad.axis.copyFrom(axis);

    dPad.update(time.physicsElapsed);

    playerStar.body.velocity.x = dPad.position.x;
    playerStar.body.velocity.y = dPad.position.y;
  };

  plugin.render = () => {
    const velocity = playerStar.body.velocity;
    debug.text(`Star Vel: [${velocity.x}, ${velocity.y}]`, 10, 40);
  };

  return plugin;
}

function getAxis(wasd) {
  let yPos = wasd.up.isDown ? -1 : 0;
  yPos += wasd.down.isDown ? 1 : 0;

  let xPos = wasd.left.isDown ? -1 : 0;
  xPos += wasd.right.isDown ? 1 : 0;

  return new Point(xPos, yPos);
}
