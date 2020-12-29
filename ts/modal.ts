import { ELEMENTS } from "./data-elements.js";

export class Modal {
  static show(message: string) {
    ELEMENTS.elModalMessageContent.textContent = message;
    ELEMENTS.elModalMessage.classList.add("show");
  }

  static hide() {
    ELEMENTS.elModalMessage.classList.remove("show");
  }
}
