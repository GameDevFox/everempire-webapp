import 'file-loader?name=[name].[ext]&outputPath=libs/!pixi';
import 'file-loader?name=[name].[ext]&outputPath=libs/!p2';
import 'file-loader?name=[name].[ext]&outputPath=libs/!phaser';

const Phaser = window.Phaser;

import $ from '../factory/my-query';

import buildDebugPlugin from './plugins/debug-plugin';
import buildStarPlugin from './plugins/star-plugin';

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

const GAME_WIDTH = 800;
const GAME_HEIGHT = 450;

export function createGame(parent) {
  return new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, parent, {
    preload: game => {
      game.load.image('star', 'assets/star.png');
    },

    create: game => {
      const {input, plugins, scale, stage} = game;
      const {ALT, ENTER, SPACEBAR, TILDE} = Phaser.KeyCode;

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

      // Debug plugin
      const debugPlugin = buildDebugPlugin(game);
      plugins.add(debugPlugin);
      debugPlugin.position.set(10, 40);
      debugPlugin.visible = false;
      const debugKey = input.keyboard.addKey(TILDE);
      debugKey.onDown.add(() => {
        debugPlugin.visible = !debugPlugin.visible;
      });

      // Star plugin
      const starPlugin = buildStarPlugin(game);
      plugins.add(starPlugin);
      const starKey = input.keyboard.addKey(SPACEBAR);
      starKey.onDown.add(() => {
        starPlugin.enabled = !starPlugin.enabled;
      });
    },

    render: game => {
      game.debug.text(`Hello EverEmpire`, 10, 20);
    }
  });
}
