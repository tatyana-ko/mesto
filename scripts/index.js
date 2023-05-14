//Для редактирования профиля
const profileEditButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_profile");
const closeButtons = document.querySelectorAll(".popup__button-close");
const formElementProfile = document.querySelector(".popup__form_profile");
const nameInput = formElementProfile.querySelector(".popup__input_type_name");
const jobInput = formElementProfile.querySelector(".popup__input_type_about");
let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__description");
//Для формы добавления карточки
const addCardButton = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_type_add-card");
//Для формы открытия картинки
const popupFullImage = document.querySelector(".popup_type_full-image");
const popupImage = popupFullImage.querySelector(".popup__full-image");
const popupTitle = popupFullImage.querySelector(".popup__image-title");
//Добавление карточки пользователем
const formAddCard = document.querySelector(".popup__form_add-card");
const cardName = document.querySelector(".popup__input_type_add-card-name");
const cardLink = document.querySelector(".popup__input_type_add-card-link");
//Template элементы
const templateElm = document.querySelector(".template-card").content.querySelector('.element');
const cardsContainer = document.querySelector(".elements");

//Общая функция открытия

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

//Общая функция закрытия

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

//Функция редактирование профиля

function handleFormSubmitProfile(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;

  closePopup(popupEdit);
}

// Открытие картинки для просмотра (full)

function openPopupForImage(evt) {
  openPopup(popupFullImage);
  popupImage.src = evt.currentTarget.src;
  popupImage.alt = evt.currentTarget.alt;
  popupTitle.textContent = evt.currentTarget
    .closest(".element")
    .querySelector(".element__description").textContent;
}

// Функция удаление карточки
const handleDeleteCard = (evt) => {
  const deleteElm = evt.target.closest(".element");
  deleteElm.remove();
};

//Функция добавления/снятия лайка с карточки

const addLikeForCard = (evt) => {
  evt.target.classList.toggle("element__button-like_active");
}

//Функция создания одной карточки

const createNewCard = (cardData) => {
  const cardElm = templateElm.cloneNode(true);
  const imageElm = cardElm.querySelector(".element__image");

  imageElm.src = cardData.link;
  imageElm.alt = cardData.name;
  cardElm.querySelector(".element__description").textContent = cardData.name;
  cardElm
    .querySelector(".element__button-like")
    .addEventListener("click", addLikeForCard);
  cardElm
    .querySelector(".element__delete")
    .addEventListener("click", handleDeleteCard);
  imageElm.addEventListener("click", openPopupForImage);

  return cardElm;
};

//Добавление карточек из массива

initialCards.forEach((cardData) => {
  cardsContainer.append(createNewCard(cardData));
});

//Обработчики событий

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
  openPopup(popupEdit);
});

formElementProfile.addEventListener("submit", handleFormSubmitProfile);

addCardButton.addEventListener("click", () => {
  openPopup(popupAddCard);
});

//Слушатель на кнопки для закрытия попап

closeButtons.forEach((closeButton) => {
  closeButton.addEventListener("click", () =>
    closePopup(closeButton.closest(".popup"))
  );
});

//Добавление карточки пользователем

formAddCard.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const newCardData = {link: cardLink.value, name: cardName.value};
  
    cardsContainer.prepend(createNewCard(newCardData));
  
    closePopup(popupAddCard);

    cardLink.value = '';
    cardName.value = '';
  });