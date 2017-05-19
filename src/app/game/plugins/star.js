import _ from 'lodash';

import addBooleanProp from '../../utils/bool-prop';
import {Commands} from '../../services/genesis';
import DirectionPad from '../tools/direction-pad';

const Phaser = window.Phaser;
const {Plugin, Point} = Phaser;

export default function build(game, genesis) {
  const {debug, input, physics, time} = game;

  const plugin = new Plugin();

  let wasd;
  let dPad;
  let playerStar;

  const players = {};
  window.players = players;

  const createStar = function({x, y}) {
    const star = game.add.sprite(x, y, 'star');
    star.anchor.set(0.5);
    star.visible = plugin.enabled;

    // Enable physics
    physics.p2.enable(star);
    star.body.fixedRotation = true;
    star.body.kinematic = true;

    return star;
  };

  genesis.on(Commands.PLAYER_UPDATE, update => {
    const {axis, dPadPos, pos, uid} = update;
    console.log('Player Update: ', uid);

    const playerData = players[uid];
    if(playerData === undefined) {
      const data = {};

      data.star = createStar(pos);
      data.dPad = createDPad({axis, position: dPadPos});

      players[uid] = data;
    } else {
      _.assign(playerData, update);

      const {star, dPad} = playerData;
      star.body.x = pos.x;
      star.body.y = pos.y;

      dPad.axis.copyFrom(axis);
      dPad.position.copyFrom(dPadPos);
    }
  });

  addBooleanProp(plugin, 'enabled', true, enabled => {
    playerStar.visible = enabled;
  });

  plugin.init = () => {
    // Add playerStar
    playerStar = createStar({x: 800 / 2, y: 450 / 2});
    window.star = playerStar;

    // WASD Controller
    wasd = input.keyboard.createCursorKeys();
    dPad = createDPad();
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
  const lastAxis = new Point();
  plugin.update = () => {
    const axis = getAxis(wasd);
    const elapsed = time.physicsElapsed;

    // Update lastAxis
    if(!axis.equals(lastAxis)) {
      lastAxis.copyFrom(axis);
      genesis.cmd(Commands.PLAYER_UPDATE, {
        pos: {x: playerStar.body.x, y: playerStar.body.y},
        axis: {x: axis.x, y: axis.y},
        dPadPos: {x: dPad.position.x, y: dPad.position.y}
      });
    }

    dPad.axis.copyFrom(axis);
    dPad.update(elapsed);

    setVelocity(playerStar, dPad.position);

    // Update other players
    _.each(players, player => {
      const {dPad, star} = player;

      dPad.update(elapsed);

      setVelocity(star, dPad.position);
    });
  };

  plugin.render = () => {
    const velocity = playerStar.body.velocity;
    debug.text(`Star Vel: [${velocity.x}, ${velocity.y}]`, 10, 40);
  };

  return plugin;
}

function setVelocity(star, {x, y}) {
  star.body.velocity.x = x;
  star.body.velocity.y = y;
}

function createDPad(props = {}) {
  const {axis, position} = props;
  const dPad = new DirectionPad({limit: 200, speed: 800});

  if(axis)
    dPad.axis.copyFrom(axis);
  if(position)
    dPad.position.copyFrom(position);

  return dPad;
}

function getAxis(wasd) {
  let yPos = wasd.up.isDown ? -1 : 0;
  yPos += wasd.down.isDown ? 1 : 0;

  let xPos = wasd.left.isDown ? -1 : 0;
  xPos += wasd.right.isDown ? 1 : 0;

  return new Point(xPos, yPos);
}
