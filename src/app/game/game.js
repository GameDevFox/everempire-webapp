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

function getVector(wasd) {
  let yPos = wasd.up.isDown ? -1 : 0;
  yPos += wasd.down.isDown ? 1 : 0;

  let xPos = wasd.left.isDown ? -1 : 0;
  xPos += wasd.right.isDown ? 1 : 0;

  return new Phaser.Point(xPos, yPos);
}

let star;
let wasd;

export function createGame(parent) {
  return new Phaser.Game(800, 450, Phaser.AUTO, parent, {
    preload: game => {
      game.load.image('star', 'assets/star.png');
    },

    create: game => {
      const {input, scale, stage} = game;

      // Set background color
      stage.backgroundColor = '#808080';

      // Fullscreen mode
      scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

      const {ALT, ENTER} = Phaser.KeyCode;
      const fullscreenKey = input.keyboard.addKey(ENTER);
      fullscreenKey.onDown.add(() => {
        if(!input.keyboard.isDown(ALT))
          return;

        if(scale.isFullScreen)
          scale.stopFullScreen();
        else
          scale.startFullScreen(true);
      });

      // Add star
      star = game.add.sprite(stage.width / 2, stage.height / 2, 'star');
      star.anchor.set(0.5);

      // WASD Controller
      wasd = input.keyboard.createCursorKeys();
    },

    update: game => {
      const {stage} = game;

      const vector = getVector(wasd);
      vector.setMagnitude(200);

      const pos = new Phaser.Point(stage.width / 2, stage.height / 2);
      Phaser.Point.add(pos, vector, pos);
      star.position.copyFrom(pos);
    },

    render: game => {
      game.debug.text(`Hello EverEmpire`, 10, 20);
    }
  });
}
