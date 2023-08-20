//Код класса Card

// import { openPopup } from "./index.js";
// import { popupFullImage, popupImage, popupTitle } from "./constants.js";

export class Card {
  constructor(cardData, templateSelector, handleCardClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._title = cardData.name;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const templateElm = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return templateElm;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementImg = this._element.querySelector(".element__image");
    this._elementLikeBtn = this._element.querySelector(".element__button-like");

    this._setEventListeners();

    this._elementImg.src = this._link;
    this._elementImg.alt = this._name;
    this._element.querySelector(".element__description").textContent =
      this._title;

    return this._element;
  }

  _setEventListeners() {
    //Слушатель лайк карточки
    this._elementLikeBtn.addEventListener("click", () => {
      this._handleLikeClick();
    });

    //Слушатель удаления карточки
    this._element
      .querySelector(".element__delete")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    //Слушатель открытия картинки
    this._elementImg.addEventListener("click", () => {
      this._handleCardClick({name: this._name, link: this._link});
    });
  }

  _handleLikeClick() {
    this._elementLikeBtn.classList.toggle("element__button-like_active");
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

}
