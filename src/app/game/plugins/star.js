import 'pixi';
import 'p2';
import Phaser from 'phaser';

import _ from 'lodash';
import Commands from '../../common/commands';
import VectorPath from '../util/vector-path';

const {Plugin, Point} = Phaser;

const TWEEN_TIME = 1;
const easeOutCubic = t => ((--t) * t * t) + 1;

export default function build(game, genesis) {
  const {debug, input, time} = game;

  const plugin = new Plugin();

  const wasd = input.keyboard.createCursorKeys();
  const players = {};

  let playerStar;
  let vectorPath;

  genesis.on(Commands.PLAYER_UPDATE, update => {
    const {sid, vectorPath: newVectorPath} = update;

    // Adjust time for offset
    newVectorPath.time -= genesis.offset;

    const playerData = players[sid];
    if(playerData === undefined) {
      const data = {
        star: createStar(game),
        vectorPath: new VectorPath(newVectorPath),
        lagVectorPath: new VectorPath(newVectorPath)
      };
      players[sid] = data;
    } else {
      const {star, vectorPath, lagVectorPath} = playerData;
      const curTime = time.time / 1000;

      vectorPath.copyFrom(newVectorPath);

      lagVectorPath.copyFrom(newVectorPath);
      lagVectorPath.time = curTime;
      lagVectorPath.pos.copyFrom(star);
    }
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

      // Adjust time for offset
      const finalVactorPath = new VectorPath(vectorPath);
      finalVactorPath.time += genesis.offset;

      genesis.cmd(Commands.PLAYER_UPDATE, finalVactorPath);
    }

    // Update player star
    const pos = vectorPath.getPos(curTime);
    pos.copyTo(playerStar);

    // Update remote stars
    _.each(players, playerData => {
      const {star, vectorPath, lagVectorPath} = playerData;

      const pos = vectorPath.getPos(curTime);
      const lagPos = lagVectorPath.getPos(curTime);

      let theta = Math.min(curTime - lagVectorPath.time, TWEEN_TIME) / TWEEN_TIME;
      theta = easeOutCubic(theta);

      Point.interpolate(lagPos, pos, theta).copyTo(star);
    });
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
