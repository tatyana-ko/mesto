import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);

    this._popup = document.querySelector(popupSelector);
    this._submitCallback = submitCallback;
  }

  deleteCardCallback(callbackDelete) {
    this._submitCallback = callbackDelete;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitCallback();
    })
  }
}