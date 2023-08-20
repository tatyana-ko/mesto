import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._elementImg = this._popup.querySelector(".popup__full-image");
    this._caption = this._popup.querySelector(".popup__image-title");
  }

  open(name, link) {
    super.open();
    this._elementImg.src = link;
    this._elementImg.alt = name;
    this._caption.textContent = name;
  }
}