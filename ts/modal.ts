import { ELEMENTS } from "./data-elements.js";
import { INTRO_MONOLOGUE } from "./intro.js";

export class Modal {
  static show(message: string) {
    ELEMENTS.elModalMessageContent.textContent = message;
    ELEMENTS.elModalMessage.classList.add("show");
  }

  static hide() {
    ELEMENTS.elModalMessage.classList.remove("show");
  }

  // static startIntro() {
  //   INTRO_MONOLOGUE.forEach(element => {

  //   });
  // }
}
