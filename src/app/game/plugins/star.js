const Phaser = window.Phaser;

import addBooleanProp from '../../utils/bool-prop';

export default function build(game) {
  const {debug, input, physics, time} = game;

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

    // Enable physics
    physics.p2.enable(star);
    star.body.fixedRotation = true;

    // WASD Controller
    wasd = input.keyboard.createCursorKeys();
  };

  // Simple movement
  // plugin.update = () => {
  //   const speed = 200;
  //
  //   const vector = getVector(wasd);
  //   vector.setMagnitude(speed);
  //
  //   // const pos = new Phaser.Point(800 / 2, 450 / 2);
  //   // Phaser.Point.add(pos, vector, pos);
  //   // star.body.x = pos.x;
  //   // star.body.y = pos.y;
  //
  //   star.body.velocity.x = vector.x;
  //   star.body.velocity.y = vector.y;
  // };

  // Fancy movement
  const starVelocity = new Phaser.Point();
  plugin.update = () => {
    const limit = 200;
    const accelerate = time.physicsElapsed * 800;

    const vector = getVector(wasd);
    vector.setMagnitude(limit);

    // Move velocity towards point
    const diff = Phaser.Point.subtract(vector, starVelocity);
    const clippedAcc = diff.getMagnitude() < accelerate ? diff.getMagnitude() : accelerate;
    diff.setMagnitude(clippedAcc);
    Phaser.Point.add(starVelocity, diff, starVelocity);

    // Max limit
    const mag = starVelocity.getMagnitude();
    starVelocity.setMagnitude(Math.min(mag, limit));

    // const pos = new Phaser.Point(800 / 2, 450 / 2);
    // Phaser.Point.add(pos, starVelocity, pos);
    // star.body.x = pos.x;
    // star.body.y = pos.y;

    star.body.velocity.x = starVelocity.x;
    star.body.velocity.y = starVelocity.y;
  };

  plugin.render = () => {
    const velocity = star.body.velocity;
    debug.text(`Star Vel: [${velocity.x}, ${velocity.y}]`, 10, 40);
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
