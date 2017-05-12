import 'pixi';
import 'p2';
import Phaser from 'phaser';

import $ from '../factory/my-query';

export function init(parent) {
  const parentId = $(`#${parent}`).length ? parent : 'hidden-game';
  window.game = createGame(parentId);
}

export function load(parent) {
  if($('#hidden-game canvas').length) {
    const gameCanvas = $('#hidden-game canvas').detach();
    gameCanvas.appendTo(`#${parent}`);
  }
}

export function unload(parent) {
  const gameCanvas = $(`#${parent} canvas`).detach();
  gameCanvas.appendTo('#hidden-game');
}

export function createGame(parent) {
  return new Phaser.Game(800, 450, Phaser.AUTO, parent, {
    preload: game => {
      game.load.image('star', 'assets/star.png');
    },

    create: game => {
      const {stage} = game;

      // Set background color
      stage.backgroundColor = '#808080';

      // Add star
      const star = game.add.sprite(stage.width / 2, stage.height / 2, 'star');
      star.anchor.set(0.5);
    },

    render: game => {
      game.debug.text(`Hello EverEmpire`, 10, 20);
    }
  });
}
