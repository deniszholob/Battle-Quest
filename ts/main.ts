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
  console.log(code, GAME_DATA.cheatList.cheatShowEnemies, code === GAME_DATA.cheatList.cheatShowEnemies)
  if (code === GAME_DATA.cheatList.cheatShowEnemies) {
    Modal.show("Map revealed!")
    GameLogic.revealMap();
  } else if (code === GAME_DATA.cheatList.cheatBoostCharacter) {
    Modal.show("Character stats boosted!")
    GameLogic.setCharacterStats(GAME_DATA.cheatList.cheatBoostCharacterStats)
  } else if (code === GAME_DATA.cheatList.cheatBonusBoss) {
    Modal.show("Not yet implemented")
    // Modal.show("Bonus Boss unveiled!")
  } else {
    Modal.show(`Invalid Code: ${code}`)
  }
}

// Run script
onInit();
