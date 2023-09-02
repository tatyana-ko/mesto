export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__button-close');
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClick = this._handleOverlayClick.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    window.addEventListener("keydown", this._handleEscClose);
    window.addEventListener('click', this._handleOverlayClick);
  } //метод, отвечающий за открытие попапа

  close() {
    this._popup.classList.remove("popup_opened");
    window.removeEventListener("keydown", this._handleEscClose);
    window.removeEventListener('click', this._handleOverlayClick);
  } //метод, отвечающий за закрытие попапа

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
        this.close();
      }
  } 

  _handleOverlayClick(evt) {
    if (evt.target === this._popup) {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', this.close.bind(this));
  }
}