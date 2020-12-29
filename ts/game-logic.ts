import { ELEMENTS } from "./data-elements.js";
import { GAME_DATA } from './data-game.js';
import { Action, Actions, Character, CharacterData, CharacterStats, Enemy, GameMap } from "./data-types";
import { Renderer } from "./renderer.js";

const CHARACTERS_AVAILABLE = [
  GAME_DATA.characterMage,
  GAME_DATA.characterWarrior,
  GAME_DATA.characterGuardian
];
const ENEMIES_AVAILABLE = [
  GAME_DATA.enemy1,
  GAME_DATA.enemy2,
  GAME_DATA.enemy3,
  GAME_DATA.enemy4,
  GAME_DATA.enemyDragon,
];


export class GameLogic {

  static character: Character;
  static enemy: Character;
  static map: GameMap;

  static newGame() {
    this.showCharacterSelectionScreen();
  }

  static showCharacterSelectionScreen() {
    this.hideAllSections();
    Renderer.clearElement(ELEMENTS.elScreenCharacterSelection);
    Renderer.showElement(ELEMENTS.elScreenCharacterSelection);
    Renderer.renderCharacterSelectionGrid(ELEMENTS.elScreenCharacterSelection, CHARACTERS_AVAILABLE);
  }

  static showMapScreen() {
    this.hideAllSections();
    Renderer.showElement(ELEMENTS.elCheatForm);
    Renderer.showElement(ELEMENTS.elScreenMap);
    Renderer.clearElement(ELEMENTS.elMap);
    Renderer.renderEnemies(ELEMENTS.elMap, ENEMIES_AVAILABLE)
    Renderer.clearElement(ELEMENTS.elCharacterSheet);
    Renderer.renderCharacterSheet(ELEMENTS.elCharacterSheet, this.character.characterData);
  }

  static showBattleScreen(enemy: Enemy) {
    this.hideAllSections();
    Renderer.clearElement(ELEMENTS.elScreenBattle);
    Renderer.showElement(ELEMENTS.elScreenBattle);
    this.enemy = this.getNewCharacter(enemy);
    const charActions = [
      GAME_DATA.actions.magic,
      GAME_DATA.actions.melee,
      GAME_DATA.actions.block,
    ]
    charActions[0].disabled = this.character.mp <= 0;
    charActions[1].disabled = this.character.sp <= 0;
    Renderer.renderBattleSheet(ELEMENTS.elScreenBattle, this.character, this.enemy, charActions);
  }

  static hideAllSections() {
    Renderer.hideElement(ELEMENTS.elScreenCharacterSelection);
    Renderer.hideElement(ELEMENTS.elScreenMap);
    Renderer.hideElement(ELEMENTS.elScreenBattle);
    Renderer.hideElement(ELEMENTS.elCheatForm);
  }

  static chooseCharacter(characterData: CharacterData) {
    this.character = this.getNewCharacter(characterData);
    this.showMapScreen();
  }

  static getNewCharacter(characterData: CharacterData) {
    return {
      characterData: characterData,
      hpMax: this.getMaxHp(characterData.stats),
      mpMax: this.getMaxMp(characterData.stats),
      spMax: this.getMaxSp(characterData.stats),
      hp: this.getMaxHp(characterData.stats),
      mp: this.getMaxMp(characterData.stats),
      sp: this.getMaxSp(characterData.stats),
    };
  }

  static getMaxHp(stats: CharacterStats): number {
    return 10 * (stats.defence / 2);
  }

  static getMaxMp(stats: CharacterStats): number {
    return Math.floor(Math.sqrt(stats.magic));
  }

  static getMaxSp(stats: CharacterStats): number {
    return Math.floor(Math.sqrt(stats.strength));
  }

  // static fight(actionChar: Action) {
  //   const actionEnemy: Action = this.getEnemyAction(this.enemy);

  //   if (actionChar == Actions.Magic && actionEnemy == Action.Magic) {
  //     this.character.mp -= 1;
  //     this.enemy.hp -= this.character.characterData.stats.magic;
  //     this.enemy.mp -= 1;
  //     this.character.hp -= this.enemy.characterData.stats.magic;
  //   } else if (actionChar == Action.Magic && actionEnemy == Action.Melee) {
  //     this.character.mp -= 1;
  //     this.enemy.hp -= this.character.characterData.stats.magic;
  //     this.enemy.sp -= 1;
  //     this.character.hp -= this.enemy.characterData.stats.strength;
  //   }

  // }

  // static getEnemyAction(enemy: Character) {
  //   const actionCount = ACTIONS.length;
  //   if (enemy.mp <= 0 && enemy.sp <= 0) {
  //     // Block
  //     return Action.Defence;

  //   } else if (enemy.mp <= 0) {
  //     // Melee, Block
  //     return this.rollDice(actionCount - 1) + 1 == Action.Defence ? Action.Defence : Action.Magic
  //   } else if (enemy.sp <= 0) {
  //     // Magic, Block
  //     return this.rollDice(actionCount - 1) + 1 == Action.Defence ? Action.Defence : Action.Magic
  //   }
  //   // Magic, Melee, Block
  //   return this.rollDice(actionCount);
  // }

  static rollDice(num: number) {
    return Math.floor(Math.random() * num) + 1;
  }
}
