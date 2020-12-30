import { GAME_DATA } from './data-game.js';
import { GameLogic } from './game-logic.js';
import { Modal } from './modal.js';
// Expose global functions
window.newGame = newGame;
window.enterCheatCode = enterCheatCode;
window.hideModal = Modal.hide;
/** To be executed when page loads */
function onInit() {
    newGame();
}
function newGame() {
    GameLogic.newGame();
}
function enterCheatCode(form) {
    const elFormInput = form.elements[0];
    const cheatCode = elFormInput.value;
    parseCheatCode(cheatCode);
}
function parseCheatCode(code) {
    if (code === GAME_DATA.cheatList.cheatShowEnemies) {
    }
    else if (code === GAME_DATA.cheatList.cheatShowEnemies) {
    }
    if (code === GAME_DATA.cheatList.cheatShowEnemies) {
    }
    else {
        Modal.show("Invalid Code");
    }
}
// Run script
onInit();
