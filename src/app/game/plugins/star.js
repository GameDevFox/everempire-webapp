import 'pixi';
import 'p2';
import Phaser from 'phaser';

import _ from 'lodash';
import {Commands} from '../../services/genesis';
import VectorPath from '../util/vector-path';

const {Plugin, Point} = Phaser;

export default function build(game, genesis) {
  const {debug, input, time} = game;

  const plugin = new Plugin();

  const wasd = input.keyboard.createCursorKeys();
  const players = {};

  let playerStar;
  let vectorPath;

  genesis.on(Commands.PLAYER_UPDATE, update => {
    const {uid} = update;
    console.log('Player Update: ', uid);

    const playerData = players[uid];
    if(playerData === undefined) {
      const data = {
        star: createStar(game),
        vectorPath: new VectorPath(update.vectorPath)
      };
      players[uid] = data;
    } else
      playerData.vectorPath.copyFrom(update.vectorPath);
  });

  plugin.init = () => {
    // Add playerStar
    playerStar = createStar(game);

    const curTime = time.time / 1000;
    const pos = {x: 800 / 2, y: 450 / 2};
    vectorPath = new VectorPath({time: curTime, pos});
  };

  plugin.update = () => {
    const curTime = time.time / 1000;

    const axis = getAxis(wasd);
    axis.setMagnitude(200);
    if(!axis.equals(vectorPath.finalVel)) {
      vectorPath.updateFinalVel(curTime, axis);
      genesis.cmd(Commands.PLAYER_UPDATE, vectorPath);
    }

    // Update stars
    updateStar(playerStar, curTime, vectorPath);
    _.each(players, playerData => updateStar(playerData.star, curTime, playerData.vectorPath));
  };

  plugin.render = () => {
    debug.text(`Star: [${playerStar.x.toFixed(1)}, ${playerStar.y.toFixed(1)}]`, 10, 40);
  };

  return plugin;
}

function createStar(game) {
  const star = game.add.sprite(0, 0, 'star');
  star.anchor.set(0.5);

  return star;
}

function getAxis(wasd) {
  let yPos = wasd.up.isDown ? -1 : 0;
  yPos += wasd.down.isDown ? 1 : 0;

  let xPos = wasd.left.isDown ? -1 : 0;
  xPos += wasd.right.isDown ? 1 : 0;

  const result = new Point(xPos, yPos);
  return result;
}

function updateStar(star, time, vectorPath) {
  const pos = vectorPath.getPos(time);
  pos.copyTo(star);
}
