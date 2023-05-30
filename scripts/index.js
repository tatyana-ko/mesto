//Для редактирования профиля
const profileEditButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_profile");
const closeButtons = document.querySelectorAll(".popup__button-close");
const formElementProfile = document.querySelector(".popup__form_profile");
const nameInput = formElementProfile.querySelector(".popup__input_type_name");
const jobInput = formElementProfile.querySelector(".popup__input_type_about");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__description");
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
const popups = document.querySelectorAll(".popup");

//Template элементы
const templateElm = document
  .querySelector(".template-card")
  .content.querySelector(".element");
const cardsContainer = document.querySelector(".elements");

//Общая функция открытия

function openPopup(popup) {
  popup.classList.add("popup_opened");
  window.addEventListener("keydown", closePopupByClickOnEscape);
}

//Общая функция закрытия

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  window.removeEventListener("keydown", closePopupByClickOnEscape);
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

const handleLikeClick = (evt) => {
  evt.target.classList.toggle("element__button-like_active");
};

//Функция создания одной карточки

const createNewCard = (cardData) => {
  const cardElm = templateElm.cloneNode(true);
  const imageElm = cardElm.querySelector(".element__image");

  imageElm.src = cardData.link;
  imageElm.alt = cardData.name;
  cardElm.querySelector(".element__description").textContent = cardData.name;
  cardElm
    .querySelector(".element__button-like")
    .addEventListener("click", handleLikeClick);
  cardElm
    .querySelector(".element__delete")
    .addEventListener("click", handleDeleteCard);
  imageElm.addEventListener("click", openPopupForImage);

  return cardElm;
};

//Функция закрытия попапа при нажатии на оверлей

function closePopupByClickOnOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

//Функция закрытия попапа при нажатии на Esc

function closePopupByClickOnEscape(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}

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

  const newCardData = { link: cardLink.value, name: cardName.value };

  cardsContainer.prepend(createNewCard(newCardData));

  closePopup(popupAddCard);

  formAddCard.reset();
});

//Слушатель для закрытия попапов по клику на оверлей

popups.forEach((popup) => {
  popup.addEventListener("click", closePopupByClickOnOverlay);
});
