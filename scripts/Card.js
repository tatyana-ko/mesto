//Код класса Card

import { openPopup } from "./index.js";
import { popupFullImage, popupImage, popupTitle } from "./constants.js";

export class Card {
  constructor(cardData, templateSelector) {
    this._src = cardData.link;
    this._alt = cardData.name;
    this._title = cardData.name;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const templateElm = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(".element")
      .cloneNode(true);

    return templateElm;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementImg = this._element.querySelector(".element__image");
    this._elementLikeBtn = this._element.querySelector(".element__button-like");

    this._setEventListeners();

    this._elementImg.src = this._src;
    this._elementImg.alt = this._alt;
    this._element.querySelector(".element__description").textContent = this._title;

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

    //Слушатель открытия картинки в фулл размере
    this._elementImg.addEventListener("click", () => {
      this._handleOpenPopup();
    });
  }

  _handleLikeClick() {
    this._elementLikeBtn.classList.toggle("element__button-like_active");
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handleOpenPopup() {
    openPopup(popupFullImage);
    popupImage.src = this._src;
    popupImage.alt = this._alt;
    popupTitle.textContent = this._title;
  }
}

