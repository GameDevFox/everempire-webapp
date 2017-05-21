import 'pixi';
import 'p2';
import Phaser from 'phaser';

import _ from 'lodash';
import {Commands} from '../../services/genesis';
import {getPos, getVelocity} from './math';

const {Plugin, Point} = Phaser;

export default function build(game, genesis) {
  const {debug, input, time} = game;

  const plugin = new Plugin();

  let wasd;

  let playerStar;
  let travelVector;

  const players = {};
  window.players = players;

  const createStar = function({x, y}) {
    const star = game.add.sprite(x, y, 'star');
    star.anchor.set(0.5);

    return star;
  };

  genesis.on(Commands.PLAYER_UPDATE, update => {
    console.log('Update:', update);

    const {pos, uid} = update;
    console.log('Player Update: ', uid);

    const playerData = players[uid];
    if(playerData === undefined) {
      const data = {};

      data.star = createStar(pos);
      _.assign(data, update);

      players[uid] = data;
    } else {
      _.assign(playerData, update);

      const {star, pos} = playerData;
      star.x = pos.x;
      star.y = pos.y;
    }
  });

  plugin.init = () => {
    // Coords
    const pos = {x: 800 / 2, y: 450 / 2};

    // Add playerStar
    playerStar = createStar(pos);
    window.star = playerStar;

    // WASD Controller
    wasd = input.keyboard.createCursorKeys();

    const curTime = time.time / 1000;
    travelVector = buildTravelVector(curTime, pos);
  };

  // Fancy movement
  plugin.update = () => {
    const curTime = time.time / 1000;

    const axis = getAxis(wasd);
    axis.setMagnitude(200);

    if(!axis.equals(travelVector.axis)) {
      const oldVel = getVelocity(curTime, travelVector);

      travelVector.time = curTime;
      travelVector.pos.copyFrom(playerStar);
      travelVector.velocity.copyFrom(oldVel);
      travelVector.axis.copyFrom(axis);

      genesis.cmd(Commands.PLAYER_UPDATE, travelVector);
    }

    updateStar(playerStar, curTime, travelVector);

    // Update other players
    _.each(players, playerData => updateStar(playerData.star, curTime, playerData));
  };

  plugin.render = () => {
    debug.text(`Star: [${playerStar.x}, ${playerStar.y}]`, 10, 40);
  };

  return plugin;
}

function buildTravelVector(time, {x, y}) {
  return {
    time,
    pos: new Point(x, y),
    velocity: new Point(),
    axis: new Point(),
    accel: 800
  };
}

function getAxis(wasd) {
  let yPos = wasd.up.isDown ? -1 : 0;
  yPos += wasd.down.isDown ? 1 : 0;

  let xPos = wasd.left.isDown ? -1 : 0;
  xPos += wasd.right.isDown ? 1 : 0;

  return new Point(xPos, yPos);
}

function updateStar(star, time, travelVector) {
  const pos = getPos(time, travelVector);
  star.x = pos.x;
  star.y = pos.y;
}
