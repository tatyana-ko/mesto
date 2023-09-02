export class Card {
  constructor(cardData, userId, templateSelector, { handleCardClick, handleCardDelete, handleCardLike })
   {
    this._name = cardData.name;
    this._link = cardData.link;
    this._title = cardData.name;
    this._id = cardData._id;
    this._likes = cardData.likes;

    this._templateSelector = templateSelector;

    this._userId = userId;
    this._ownerId = cardData.owner._id;

    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
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
    this._elementDeleteBtn = this._element.querySelector(".element__delete");
    this._elementLikeBtn = this._element.querySelector(".element__button-like");
    this._likeCounter = this._element.querySelector(".element__number-likes");

    this._setEventListeners();
    this._displayLike();

    this._elementImg.src = this._link;
    this._elementImg.alt = this._name;
    this._element.querySelector(".element__description").textContent =
      this._title;

    return this._element;
  }

  _setEventListeners() {
    //Слушатель лайк карточки
    this._elementLikeBtn.addEventListener("click", () => {
      this._handleCardLike(this);
    });

    //Слушатель удаления карточки
    if (this._userId === this._ownerId) {
      this._elementDeleteBtn.addEventListener("click", () => {
        this._handleCardDelete(this);
      });
    } else {
      this._elementDeleteBtn.remove();
    }

    //Слушатель открытия картинки
    this._elementImg.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
  }

  removeCardFromPage() {
    this._element.remove();
    this._element = null;
  }

  getCardId() {
    return this._id;
  }

  //Для лайков
  //Проверка лайка от текущего пользователя
  isLiked()  {
    return this._likes.some((card) => {
        return card._id === this._userId;
    })
}

  //Отображение лайков
  _displayLike() {
    this._likeCounter.textContent = this._likes.length;

    if(this.isLiked()) {
      this._elementLikeBtn.classList.add("element__button-like_active");
    } else {
      this._elementLikeBtn.classList.remove("element__button-like_active");
    }
  }

  //Обновление лайков
  updateLike(data) {
    this._likes = data.likes;
    this._displayLike();
  }
}
