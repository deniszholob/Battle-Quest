export const GAME_DATA = {
    actionList: {
        magic: {
            id: 0,
            name: "magic",
        },
        melee: {
            id: 1,
            name: "melee",
        },
        block: {
            id: 2,
            name: "block",
        },
    },
    characterList: {
        characterMage: {
            id: "char-mage",
            name: "Wizard",
            stats: {
                magic: 40,
                strength: 1,
                defence: 2,
            }
        },
        characterWarrior: {
            id: "char-warrior",
            name: "Warrior",
            stats: {
                magic: 1,
                strength: 4,
                defence: 2,
            }
        },
        characterGuardian: {
            id: "char-guardian",
            name: "Guardian",
            stats: {
                magic: 1,
                strength: 2,
                defence: 4,
            }
        },
    },
    enemyList: {
        enemy1: {
            id: "enemy-lvl1",
            name: "Forest Creature",
            stats: {
                magic: 0,
                strength: 3,
                defence: 2,
            },
            xp: 1,
            visible: true,
        },
        enemy2: {
            id: "enemy-lvl2",
            name: "Guard",
            stats: {
                magic: 3,
                strength: 6,
                defence: 4,
            },
            xp: 3,
            visible: false,
        },
        enemy3: {
            id: "enemy-lvl3",
            name: "Sorcerer",
            stats: {
                magic: 9,
                strength: 12,
                defence: 9,
            },
            xp: 5,
            visible: false,
        },
        enemy4: {
            id: "enemy-lvl4",
            name: "Brute",
            stats: {
                magic: 15,
                strength: 25,
                defence: 25,
            },
            xp: 8,
            visible: false,
        },
        enemyDragon: {
            id: "enemy-dragon",
            name: "Dragon",
            stats: {
                magic: 60,
                strength: 50,
                defence: 50,
            },
            xp: 10,
            visible: false,
        },
        enemySephiroth: {
            id: "enemy-sephiroth",
            name: "Sephiroth",
            stats: {
                magic: 1,
                strength: 2,
                defence: 3,
            },
            xp: 20,
            visible: false,
        },
    },
    cheatList: {
        cheatShowEnemies: "revealmap",
        cheatBoostCharacter: "powerup",
        cheatBonusBoss: "Sephiroth",
        cheatBoostCharacterStats: {
            magic: 75,
            strength: 70,
            defence: 80,
        },
        cheatBonusBossCharacterStats: {
            magic: 300,
            strength: 250,
            defence: 350,
        },
        cheatBonusBossStats: {
            magic: 300,
            strength: 350,
            defence: 300,
        },
    }
};
