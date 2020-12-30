import { GAME_DATA } from './data-game.js';
import { GameLogic } from './game-logic.js';
import { Modal } from './modal.js';

// Expose global functions
(window as any).newGame = newGame;
(window as any).enterCheatCode = enterCheatCode;
(window as any).hideModal = Modal.hide;

/** To be executed when page loads */
function onInit() {
  newGame();
}

function newGame() {
  GameLogic.newGame();
}

function enterCheatCode(form: HTMLFormElement) {
  const elFormInput = form.elements[0] as HTMLInputElement;
  const cheatCode = elFormInput.value;
  parseCheatCode(cheatCode);
}


function parseCheatCode(code: string) {
  if (code === GAME_DATA.cheatList.cheatShowEnemies) {

  } else if (code === GAME_DATA.cheatList.cheatShowEnemies) {

  } if (code === GAME_DATA.cheatList.cheatShowEnemies) {

  } else {
    Modal.show("Invalid Code")
  }
}

// Run script
onInit();
