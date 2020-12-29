import { Action, Character, CharacterData, Enemy } from "./data-types";
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
    if (enemy.visible) { elEnemyButton.classList.add("show"); }
    elEnemyButton.onclick = onclick;
    elRoot.appendChild(elEnemyButton);
  }

  static renderBattleSheet(elRoot: HTMLElement, char: Character, enemy: Character, carActions: Action[]) {
    const elBattleWrap = document.createElement("div");
    elBattleWrap.classList.add("battle-wrap", "battle-bg", `env-bg-${enemy.characterData.id}`);

    this.renderBattleCharacterSheet(elBattleWrap, enemy);
    this.renderAction(elBattleWrap, carActions);
    this.renderBattleCharacterSheet(elBattleWrap, char);

    elRoot.appendChild(elBattleWrap);
  }

  static renderBattleCharacterSheet(elRoot: HTMLElement, char: Character) {
    const elBattleChar = document.createElement("div");
    elBattleChar.classList.add("battle-character");

    const elHealth = this.getProgressBar(char.hp, char.hpMax, "green", "Health");
    elBattleChar.appendChild(elHealth);

    const elMana = this.getProgressBar(char.mp, char.mpMax, "blue", "Mana");
    elBattleChar.appendChild(elMana);

    const elStamina = this.getProgressBar(char.sp, char.spMax, "yellow", "Stamina");
    elBattleChar.appendChild(elStamina);

    // const elImage = document.createElement("div");
    // elImage.classList.add("character-image", char.characterData.id);
    // elBattleChar.appendChild(elImage);

    this.renderCharacterSheet(elBattleChar, char.characterData, false);

    elRoot.appendChild(elBattleChar);
  }

  static renderAction(elRoot: HTMLElement, actions: Action[]) {
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
    elActionButton.classList.add("action", `action-${action.name}`);
    elActionButton.disabled = action.disabled;
    // elActionButton.onclick = () => { GameLogic.fight(action) }
    elRoot.appendChild(elActionButton);
  }

  static getProgressBar(val: number, max: number, color: string, text: string) {
    const elProgressBar = document.createElement("div");
    elProgressBar.classList.add("progress-bar");

    const elProgressBarInner = document.createElement("span");
    elProgressBarInner.classList.add(color);
    elProgressBarInner.style.width = `${val * 100 / max}%`;

    const elText = document.createElement("span");
    elText.classList.add("bar-text");
    elText.textContent = `${text}: ${val}/${max}`;
    elProgressBar.appendChild(elText);

    elProgressBar.appendChild(elProgressBarInner);
    return elProgressBar;
  }
}
