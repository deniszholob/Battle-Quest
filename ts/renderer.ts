import { Action, BattleState, CharacterData, Enemy, Entity, ProgressBarStat } from "./data-types";
import { GameLogic } from "./game-logic.js";

export class Renderer {
  static showElement(elRoot: HTMLElement) {
    elRoot.classList.add(`show`);
    elRoot.classList.remove(`hide`);
  }

  static hideElement(elRoot: HTMLElement) {
    elRoot.classList.add(`hide`);
    elRoot.classList.remove(`show`);
  }

  static clearElement(elRoot: HTMLElement) {
    elRoot.innerHTML = "";
  }

  static renderCharacterSelectionGrid(elRoot: HTMLElement, characterData: CharacterData[]) {
    const elText = document.createElement("h1");
    elText.textContent = "Chose your character to start the adventure!";
    elRoot.appendChild(elText);

    const charactersTotal = characterData.length;
    const gridRow = document.createElement("div");
    gridRow.classList.add("grid-row");

    for (let i = 0; i < charactersTotal; i++) {
      const gridCol = document.createElement("div");
      gridCol.classList.add("grid-col", `col-1_${charactersTotal}`)
      Renderer.renderCharacterSheet(gridCol, characterData[i]);
      Renderer.renderCharacterSelectButton(gridCol, () => {
        GameLogic.chooseCharacter(characterData[i])
      });
      gridRow.appendChild(gridCol);
    }
    elRoot.appendChild(gridRow);
  }

  static renderCharacterSheet(el: HTMLElement, char: CharacterData, renderStats = true) {
    const elContainer = document.createElement("div");
    elContainer.classList.add("character-sheet");

    const elTitle = document.createElement("h1");
    elContainer.classList.add("text-center");
    elTitle.textContent = char.name;
    elContainer.appendChild(elTitle);

    const elImage = document.createElement("div");
    elImage.classList.add("character-image", char.id);
    elContainer.appendChild(elImage);

    if (renderStats) {
      const elTitleStats = document.createElement("h1");
      elContainer.classList.add("text-center");
      elTitleStats.textContent = "Stats";
      elContainer.appendChild(elTitleStats);

      const elStatMagic = document.createElement("div");
      elStatMagic.textContent = `Magical Power = ${char.stats.magic}`;
      elContainer.appendChild(elStatMagic);

      const elStatStrength = document.createElement("div");
      elStatStrength.textContent = `Strength Power = ${char.stats.strength}`;
      elContainer.appendChild(elStatStrength);

      const elStatDefence = document.createElement("div");
      elStatDefence.textContent = `Defence Power = ${char.stats.defence}`;
      elContainer.appendChild(elStatDefence);
    }
    el.appendChild(elContainer);
  }

  static renderCharacterSelectButton(elRoot: HTMLElement, onclick: ((this: GlobalEventHandlers, ev: MouseEvent) => any)) {
    const elSelectButton = document.createElement("button");
    elSelectButton.classList.add("button", "full-width", "margin-center");
    elSelectButton.textContent = "Select Character";
    elSelectButton.onclick = onclick;
    elRoot.appendChild(elSelectButton);
  }


  static renderEnemies(elRoot: HTMLElement, enemies: Enemy[]) {
    for (let i = 0; i < enemies.length; i++) {
      this.renderEnemy(elRoot, enemies[i], () => {
        GameLogic.showBattleScreen(enemies[i]);
      })
    }
  }

  static renderEnemy(elRoot: HTMLElement, enemy: Enemy, onclick: ((this: GlobalEventHandlers, ev: MouseEvent) => any)) {
    const elEnemyButton = document.createElement("button");
    elEnemyButton.classList.add("button-enemy", `${enemy.id}`);
    if (enemy.visible) {
      this.showElement(elEnemyButton);
    }else {
      this.hideElement(elEnemyButton);
    }
    elEnemyButton.onclick = onclick;
    elRoot.appendChild(elEnemyButton);
  }

  static renderBattleSheet(elRoot: HTMLElement, battleState: BattleState) {
    const elBattleWrap = document.createElement("div");
    elBattleWrap.classList.add("battle-wrap", "battle-bg", `env-bg-${battleState.enemy.characterData.id}`);

    this.renderBattleCharacterSheet(elBattleWrap, battleState.enemy, battleState.enemyPrev);
    if (battleState.char.hp > 0 && battleState.enemy.hp > 0) {
      this.renderActionStates(elBattleWrap, battleState.actions);
    } else if (battleState.char.hp > 0 && battleState.enemy.hp <= 0) {
      // TODO: Fix type issues
      this.renderOutcomeWon(elBattleWrap, battleState.enemy.characterData);
    } else {
      this.renderOutcomeLost(elBattleWrap);
    }

    this.renderBattleCharacterSheet(elBattleWrap, battleState.char, battleState.charPrev);

    elRoot.appendChild(elBattleWrap);
  }
  static renderOutcomeLost(elRoot: HTMLElement) {
    const elActionBar = document.createElement("div");
    elActionBar.classList.add("battle-action");

    const elText = document.createElement("h1");
    elText.textContent = "You lost :(";
    elActionBar.appendChild(elText);

    const elSelectButton = document.createElement("button");
    elSelectButton.classList.add("button", "full-width", "margin-center");
    elSelectButton.textContent = "Load Map";
    elSelectButton.onclick = () => {GameLogic.showMapScreen();};
    elActionBar.appendChild(elSelectButton);

    elRoot.appendChild(elActionBar);
  }

  static renderOutcomeWon(elRoot: HTMLElement, enemy: Enemy) {
    const elActionBar = document.createElement("div");
    elActionBar.classList.add("battle-action");

    const elText = document.createElement("h1");
    elText.textContent = "You Won!";
    elActionBar.appendChild(elText);

    const elButtonMagic = document.createElement("button");
    elButtonMagic.classList.add("button", "full-width", "margin-center");
    elButtonMagic.textContent = "Upgrade Magic";
    elButtonMagic.onclick = () => {
      GameLogic.upgradeCharacter({
        magic: enemy.xp,
        strength: 0,
        defence: 0,
      });
      GameLogic.showNextEnemy(enemy);
      GameLogic.showMapScreen();
    };
    elActionBar.appendChild(elButtonMagic);

    const elButtonStrength = document.createElement("button");
    elButtonStrength.classList.add("button", "full-width", "margin-center");
    elButtonStrength.textContent = "Upgrade Strength";
    elButtonStrength.onclick = () => {
      GameLogic.upgradeCharacter({
        magic: 0,
        strength: enemy.xp,
        defence: 0,
      });
      GameLogic.showNextEnemy(enemy);
      GameLogic.showMapScreen();
    };
    elActionBar.appendChild(elButtonStrength);

    const elButtonDefence = document.createElement("button");
    elButtonDefence.classList.add("button", "full-width", "margin-center");
    elButtonDefence.textContent = "Upgrade Defence";
    elButtonDefence.onclick = () => {
      GameLogic.upgradeCharacter({
        magic: 0,
        strength: 0,
        defence: enemy.xp,
      });
      GameLogic.showNextEnemy(enemy);
      GameLogic.showMapScreen();
    };
    elActionBar.appendChild(elButtonDefence);


    elRoot.appendChild(elActionBar);
  }

  static renderBattleCharacterSheet(elRoot: HTMLElement, char: Entity, charLast: Entity) {
    const elBattleChar = document.createElement("div");
    elBattleChar.classList.add("battle-character");

    const elHealth = this.getProgressBar({
      caption: "Health",
      change: char.hp - charLast.hp,
      color: "green",
      max: char.hpMax,
      val: char.hp,
    });
    elBattleChar.appendChild(elHealth);

    const elMana = this.getProgressBar({
      caption: "Mana",
      change: char.mp - charLast.mp,
      color: "blue",
      max: char.mpMax,
      val: char.mp,
    });
    elBattleChar.appendChild(elMana);

    const elStamina = this.getProgressBar({
      caption: "Stamina",
      change: char.sp - charLast.sp,
      color: "yellow",
      max: char.spMax,
      val: char.sp,
    });
    // TODO: Stamina was not in the original game, thought of adding it in for more balanced fights but dont have a solid plan yet
    // elBattleChar.appendChild(elStamina);

    // const elImage = document.createElement("div");
    // elImage.classList.add("character-image", char.characterData.id);
    // elBattleChar.appendChild(elImage);

    this.renderCharacterSheet(elBattleChar, char.characterData);

    elRoot.appendChild(elBattleChar);
  }

  static renderActionStates(elRoot: HTMLElement, actions: Action[]) {
    const elActionBar = document.createElement("div");
    elActionBar.classList.add("battle-action");
    this.renderActionBar(elRoot, actions);
  }

  static renderActionBar(elRoot: HTMLElement, actions: Action[]) {
    const elActionBar = document.createElement("div");
    elActionBar.classList.add("action-bar");

    for (let i = 0; i < actions.length; i++) {
      this.renderActionButton(elActionBar, actions[i]);
    }
    elRoot.appendChild(elActionBar);
  }

  static renderActionButton(elRoot: HTMLElement, action: Action) {
    const elActionButton = document.createElement("button");
    elActionButton.classList.add("action", `action-${action.actionType.name}`);
    elActionButton.disabled = action.disabled;
    elActionButton.onclick = () => { GameLogic.fight(action.actionType) }
    elRoot.appendChild(elActionButton);
  }

  static getProgressBar(stat: ProgressBarStat) {
    const elProgressBar = document.createElement("div");
    elProgressBar.classList.add("progress-bar");

    const elProgressBarInner = document.createElement("span");
    elProgressBarInner.classList.add(stat.color);
    elProgressBarInner.style.width = `${stat.val * 100 / stat.max}%`;

    const elText = document.createElement("span");
    elText.classList.add("bar-text");
    elText.textContent = `${stat.caption}: ${stat.val}/${stat.max}`;
    elProgressBar.appendChild(elText);

    // TODO: css needs work here...
    // if(stat.change !== 0) {
    //   const changeContent = (stat.change > 0 ? "+" : "") + stat.change;
    //   const color = stat.change > 0 ? "green" : "red"

    //   const elChange = document.createElement("span");
    //   elChange.classList.add("bar-change", `text-${color}`);
    //   elChange.textContent = changeContent;
    //   elProgressBar.appendChild(elChange);
    // }

    elProgressBar.appendChild(elProgressBarInner);
    return elProgressBar;
  }
}
