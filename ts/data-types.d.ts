
export interface GameData {
  characterMage: CharacterData;
  characterWarrior: CharacterData;
  characterGuardian: CharacterData;

  enemy1: Enemy;
  enemy2: Enemy;
  enemy3: Enemy;
  enemy4: Enemy;
  enemyDragon: Enemy;
  enemySephiroth: Enemy;

  actions: Actions;

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

export interface Character {
  characterData: CharacterData;
  hpMax: number;
  mpMax: number;
  spMax: number;
  hp: number;
  mp: number;
  sp: number;
}

export interface Enemy extends CharacterData {
  visible: boolean;
  xp: number;
}

export interface GameMap {
  enemies: Enemy[];
}

export interface Action {
  id: number;
  name: string;
  disabled: boolean;
}

export interface Actions {
  magic: Action;
  melee: Action;
  block: Action;
}
