import { ELEMENTS } from "./data-elements.js";
import { GAME_DATA } from './data-game.js';
import { Action, ActionType, BattleState, CharacterData, CharacterStats, Enemy, Entity, GameMap } from "./data-types";
import { Renderer } from "./renderer.js";
import { Util } from "./util.js";

const CHARACTERS_AVAILABLE: CharacterData[] = [
  GAME_DATA.characterList.characterMage,
  GAME_DATA.characterList.characterWarrior,
  GAME_DATA.characterList.characterGuardian,
];
const ENEMIES_AVAILABLE: Enemy[] = [
  Util.deepCopy(GAME_DATA.enemyList.enemy1),
  Util.deepCopy(GAME_DATA.enemyList.enemy2),
  Util.deepCopy(GAME_DATA.enemyList.enemy3),
  Util.deepCopy(GAME_DATA.enemyList.enemy4),
  Util.deepCopy(GAME_DATA.enemyList.enemyDragon),
];
const ACTIONS_AVAILABLE: ActionType[] = [
  GAME_DATA.actionList.magic,
  GAME_DATA.actionList.melee,
  GAME_DATA.actionList.block,
]

export class GameLogic {

  static character: Entity;
  static enemy: Entity;
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
    this.restCharacter();
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
    this.enemy = this.getNewEntity(enemy);
    const battleState: BattleState = {
      actions: this.getCharacterBattleActions(),
      char: this.character,
      enemy: this.enemy,
      charActionType: GAME_DATA.actionList.block,
      enemyActionType: GAME_DATA.actionList.block,
      charPrev: this.character,
      enemyPrev: this.enemy,
    }
    Renderer.renderBattleSheet(ELEMENTS.elScreenBattle, battleState);
  }

  static hideAllSections() {
    Renderer.hideElement(ELEMENTS.elScreenCharacterSelection);
    Renderer.hideElement(ELEMENTS.elScreenMap);
    Renderer.hideElement(ELEMENTS.elScreenBattle);
    Renderer.hideElement(ELEMENTS.elCheatForm);
  }

  static chooseCharacter(characterData: CharacterData) {
    this.character = this.getNewEntity(characterData);
    this.showMapScreen();
  }

  // TODO: Fix type issues
  static getNewEntity(characterData: CharacterData): Entity {
    return {
      characterData: Util.deepCopy(characterData),
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

  static upgradeCharacter(stats: CharacterStats) {
    this.character.characterData.stats.magic += stats.magic;
    this.character.characterData.stats.strength += stats.strength;
    this.character.characterData.stats.defence += stats.defence;
  }

  static restCharacter() {
    this.character = this.getNewEntity(this.character.characterData);
  }

  // Original Battle logic from High School... not very nice...
  static fight(actionChar: ActionType) {
    const actionEnemy: ActionType = this.getEnemyAction(this.enemy);
    const charPrev = Object.assign({}, this.character);
    const enemyPrev = Object.assign({}, this.enemy);

    // Magic
    if (actionChar == GAME_DATA.actionList.magic && actionEnemy == GAME_DATA.actionList.magic) {
      console.log("magic - magic");
      this.character.hp -= this.enemy.characterData.stats.magic / 2;
      this.character.mp -= 1;
      this.enemy.hp -= this.character.characterData.stats.magic / 2;
      this.enemy.mp -= 1;
    } else if (actionChar == GAME_DATA.actionList.magic && actionEnemy == GAME_DATA.actionList.melee) {
      console.log("magic - melee");
      this.character.hp -= this.enemy.characterData.stats.strength;
      this.character.mp -= 1;
      this.enemy.hp -= this.character.characterData.stats.magic / 2;
      this.enemy.mp += 1;
    } else if (actionChar == GAME_DATA.actionList.magic && actionEnemy == GAME_DATA.actionList.block) {
      console.log("magic - block");
      // this.character.hp -= this.enemy.characterData.stats.magic;
      this.character.mp -= 1;
      this.enemy.hp -= this.character.characterData.stats.magic / 4;
      this.enemy.mp += 2;
    }
    // === Melee
    else if (actionChar == GAME_DATA.actionList.melee && actionEnemy == GAME_DATA.actionList.magic) {
      console.log("melee - magic");
      this.character.hp -= this.enemy.characterData.stats.magic / 2;
      this.character.mp += 1;
      this.enemy.hp -= this.character.characterData.stats.strength;
      this.enemy.mp -= 1;
    } else if (actionChar == GAME_DATA.actionList.melee && actionEnemy == GAME_DATA.actionList.melee) {
      console.log("melee - melee");
      this.character.hp -= this.enemy.characterData.stats.strength;
      this.character.mp += 1;
      this.enemy.hp -= this.character.characterData.stats.strength;
      this.enemy.mp += 1;
    } else if (actionChar == GAME_DATA.actionList.melee && actionEnemy == GAME_DATA.actionList.block) {
      console.log("melee - block");
      // this.character.hp -= this.enemy.characterData.stats.strength;
      this.character.mp += 1;
      // this.enemy.hp -= this.character.characterData.stats.magic / 2;
      this.enemy.mp += 2;
    }
    // === Block
    else if (actionChar == GAME_DATA.actionList.block && actionEnemy == GAME_DATA.actionList.magic) {
      console.log("block - magic");
      this.character.hp -= this.enemy.characterData.stats.magic / 4;
      this.character.mp += 2;
      // this.enemy.hp -= this.character.characterData.stats.strength;
      this.enemy.mp -= 1;
    } else if (actionChar == GAME_DATA.actionList.block && actionEnemy == GAME_DATA.actionList.melee) {
      console.log("block - melee");
      // this.character.hp -= this.enemy.characterData.stats.strength;
      this.character.mp += 2;
      // this.enemy.hp -= this.character.characterData.stats.strength;
      this.enemy.mp += 1;
    } else if (actionChar == GAME_DATA.actionList.block && actionEnemy == GAME_DATA.actionList.block) {
      console.log("block - block");
      this.character.hp += this.character.characterData.stats.defence / 2;
      this.character.mp += 2;
      this.enemy.hp += this.enemy.characterData.stats.defence / 2;
      this.enemy.mp += 2;
    } else {
      throw Error(`Unknown combination? ${actionChar.id}${actionChar.name} - ${actionEnemy.id}${actionEnemy.name}`);
    }

    this.safeEntityStats(this.character);
    this.safeEntityStats(this.enemy);

    const battleState: BattleState = {
      actions: this.getCharacterBattleActions(),
      char: this.character,
      enemy: this.enemy,
      charActionType: actionChar,
      enemyActionType: actionEnemy,
      charPrev: charPrev,
      enemyPrev: enemyPrev,
    }

    Renderer.clearElement(ELEMENTS.elScreenBattle);
    Renderer.renderBattleSheet(ELEMENTS.elScreenBattle, battleState);

  }

  static safeEntityStats(char: Entity) {
    char.hp = this.safeStat(char.hp, char.hpMax);
    char.sp = this.safeStat(char.sp, char.spMax);
    char.mp = this.safeStat(char.mp, char.mpMax);
  }

  static safeStat(stat: number, max: number): number {
    let safeValue = stat <= 0 ? 0 : stat;
    safeValue = safeValue >= max ? max : safeValue;
    return safeValue;
  }

  static getCharacterBattleActions(): Action[] {
    return [
      {
        actionType: GAME_DATA.actionList.magic,
        disabled: this.character.mp <= 0,
      },
      {
        actionType: GAME_DATA.actionList.melee,
        disabled: this.character.sp <= 0,
      },
      {
        actionType: GAME_DATA.actionList.block,
        disabled: false,
      },
    ];
  }

  static getEnemyAction(enemy: Entity): ActionType {
    const actionCount = Object.getOwnPropertyNames(GAME_DATA.actionList).length;
    if (enemy.mp <= 0 && enemy.sp <= 0) {
      // Block is always available
      return GAME_DATA.actionList.block;

    } else if (enemy.mp <= 0) {
      // Melee, Block
      return this.rollDice(actionCount - 1) + 1 == GAME_DATA.actionList.block.id ? GAME_DATA.actionList.block : GAME_DATA.actionList.melee;
    } else if (enemy.sp <= 0) {
      // Magic, Block
      return this.rollDice(actionCount - 1) + 1 == GAME_DATA.actionList.block.id ? GAME_DATA.actionList.block : GAME_DATA.actionList.magic;
    }
    // Magic, Melee, Block
    return ACTIONS_AVAILABLE[this.rollDice(actionCount)];
  }

  static rollDice(num: number) {
    return Math.floor(Math.random() * num);
  }

  static showNextEnemy(defeatedEnemy: Enemy) {
    if (defeatedEnemy.id.endsWith("1"))
      ENEMIES_AVAILABLE[1].visible = true;
    else if (defeatedEnemy.id.endsWith("2"))
      ENEMIES_AVAILABLE[2].visible = true;
    else if (defeatedEnemy.id.endsWith("3"))
      ENEMIES_AVAILABLE[3].visible = true;
    else if (defeatedEnemy.id.endsWith("4"))
      ENEMIES_AVAILABLE[4].visible = true;
    // else if (defeatedEnemy.id.endsWith("dragon"))
    //   ENEMIES_AVAILABLE[5].visible = true

  }
}
