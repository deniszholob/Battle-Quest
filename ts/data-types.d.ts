
export interface GameData {
  characterList: CharacterList;
  enemyList: EnemyList;
  actionList: ActionList;
  cheatList: CheatList;
}

export interface CharacterList {
  characterMage: CharacterData;
  characterWarrior: CharacterData;
  characterGuardian: CharacterData;
}

export interface EnemyList {
  enemy1: Enemy;
  enemy2: Enemy;
  enemy3: Enemy;
  enemy4: Enemy;
  enemyDragon: Enemy;
  enemySephiroth: Enemy;
}

export interface ActionList {
  magic: ActionType;
  melee: ActionType;
  block: ActionType;
}

export interface CheatList {
  cheatShowEnemies: string;
  cheatBoostCharacter: string;
  cheatBoostCharacterStats: CharacterStats;
  cheatBonusBoss: string;
  cheatBonusBossStats: CharacterStats;
  cheatBonusBossCharacterStats: CharacterStats;
}

export interface CharacterData {
  name: string;
  id: string;
  stats: CharacterStats;
}

export interface CharacterStats {
  magic: number;
  strength: number;
  defence: number;
}

export interface Enemy extends CharacterData {
  visible: boolean;
  xp: number;
}

export interface ActionType {
  id: number;
  name: string;
}

// =========

export interface GameMap {
  enemies: Enemy[];
}

export interface ProgressBarStat {
  val: number;
  max: number;
  color: string;
  caption: string;
  change: number;
}

export interface BattleState {
  char: Entity;
  charPrev: Entity;
  enemy: Entity;
  enemyPrev: Entity;
  charActionType: ActionType;
  enemyActionType: ActionType;
  actions: Action[];
}

export interface Entity {
  characterData: CharacterData;
  hpMax: number;
  mpMax: number;
  spMax: number;
  hp: number;
  mp: number;
  sp: number;
}

export interface Action {
  actionType: ActionType;
  disabled: boolean
}
