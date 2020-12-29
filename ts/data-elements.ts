
export interface HtmlElements {
  elScreenCharacterSelection: HTMLElement;
  elScreenMap: HTMLElement;
  elScreenBattle: HTMLElement;

  elCharacterSheet: HTMLElement;
  elMap: HTMLElement;


  elModalMessage: HTMLElement;
  elModalMessageContent: HTMLElement;
  elCheatForm: HTMLElement;
  // elCharacterName: HTMLElement;
  // elCharacterImage: HTMLElement;
  // elCharacterPowerMagic: HTMLElement;
  // elCharacterPowerStrength: HTMLElement;
  // elCharacterPowerDefence: HTMLElement;
}

export const ELEMENTS: HtmlElements = {
  elScreenCharacterSelection: document.getElementById("screenCharacterSelection") as HTMLElement,
  elScreenMap: document.getElementById("screenMap") as HTMLElement,
  elScreenBattle: document.getElementById("screenBattle") as HTMLElement,

  elCharacterSheet: document.getElementById("characterSheet") as HTMLElement,
  elMap: document.getElementById("map") as HTMLElement,

  elModalMessage: document.getElementById("modalMessage") as HTMLElement,
  elModalMessageContent: document.getElementById("modalMessageContent") as HTMLElement,
  elCheatForm: document.getElementById("cheatForm") as HTMLElement,
  // elCharacterName: document.getElementById("characterName") as HTMLElement,
  // elCharacterImage: document.getElementById("characterImage") as HTMLElement,
  // elCharacterPowerMagic: document.getElementById("characterPowerMagic") as HTMLElement,
  // elCharacterPowerStrength: document.getElementById("characterPowerStrength") as HTMLElement,
  // elCharacterPowerDefence: document.getElementById("characterPowerDefence") as HTMLElement,
}
