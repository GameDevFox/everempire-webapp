import 'pixi';
import 'p2';
import Phaser from 'phaser';

import $ from '../factory/my-query';

import buildDebugPlugin from './plugins/debug';
import buildFullscreenPlugin from './plugins/fullscreen';
import buildStarPlugin from './plugins/star';

export function init(parent, genesis) {
  const parentId = $(`#${parent}`).length ? parent : 'hidden-game';
  window.game = createGame(parentId, genesis);
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

export function createGame(parent, genesis) {
  return new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, parent, {
    preload: game => {
      game.load.image('star', 'assets/star.png');
    },

    create: game => {
      const {input, plugins, stage, physics} = game;
      const {TILDE} = Phaser.KeyCode;

      // Set game properties
      stage.backgroundColor = '#808080';
      stage.disableVisibilityChange = true;
      physics.startSystem(Phaser.Physics.P2JS);

      // Fullscreen
      const fullscreenPlugin = buildFullscreenPlugin(game);
      plugins.add(fullscreenPlugin);

      // Debug plugin
      const debugPlugin = buildDebugPlugin(game);
      plugins.add(debugPlugin);
      debugPlugin.position.set(10, 60);
      debugPlugin.visible = false;
      const debugKey = input.keyboard.addKey(TILDE);
      debugKey.onDown.add(() => {
        debugPlugin.visible = !debugPlugin.visible;
      });

      // Star plugin
      const starPlugin = buildStarPlugin(game, genesis);
      plugins.add(starPlugin);
    },

    render: game => {
      game.debug.text(`Hello EverEmpire`, 10, 20);
    }
  });
}
