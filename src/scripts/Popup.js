export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__button-close');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    window.addEventListener("keydown", this._handleEscClose);
  } //метод, отвечающий за открытие попапа

  close() {
    this._popup.classList.remove("popup_opened");
    window.removeEventListener("keydown", this._handleEscClose);
  } //метод, отвечающий за закрытие попапа

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
        this.close();
      }
  } 

  setEventListeners() {
    this._closeButton.addEventListener('click', this.close.bind(this));
    
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('.popup_opened')) {
          this.close();
      }
  });
  }
}