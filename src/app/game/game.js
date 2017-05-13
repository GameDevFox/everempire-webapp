import 'pixi';
import 'p2';
import Phaser from 'phaser';

import $ from '../factory/my-query';

import debugPlugin from './plugins/debug-plugin';

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

const GAME_WIDTH = 800;
const GAME_HEIGHT = 450;

export function createGame(parent) {
  return new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, parent, {
    preload: game => {
      game.load.image('star', 'assets/star.png');
    },

    create: game => {
      const {debug, input, plugins, scale, stage, time} = game;
      const {ALT, ENTER, TILDE} = Phaser.KeyCode;

      // Set background color
      stage.backgroundColor = '#808080';

      // Fullscreen mode
      scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

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
      star = game.add.sprite(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'star');
      star.anchor.set(0.5);

      // WASD Controller
      wasd = input.keyboard.createCursorKeys();

      // Debug
      const dbPlugin = debugPlugin({debug, time});
      dbPlugin.position.set(10, 40);
      plugins.add(dbPlugin);
      const debugKey = input.keyboard.addKey(TILDE);
      debugKey.onDown.add(() => {
        dbPlugin.visible = !dbPlugin.visible;
      });
    },

    update: () => {
      const vector = getVector(wasd);
      vector.setMagnitude(200);

      const pos = new Phaser.Point(GAME_WIDTH / 2, GAME_HEIGHT / 2);
      Phaser.Point.add(pos, vector, pos);
      star.position.copyFrom(pos);
    },

    render: game => {
      game.debug.text(`Hello EverEmpire`, 10, 20);
    }
  });
}
