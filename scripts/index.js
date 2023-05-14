//Карточки
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

//Для редактирования профиля
const profileEditButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_profile");
const closeButtons = document.querySelectorAll(".popup__button-close");
const formElement = document.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_about");
let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__description");

//Для формы добавления карточки

const addCardButton = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_type_add-card");

//Для формы открытия картинки
const popupFullImage = document.querySelector(".popup_type_full-image");

//Общая функция открытия

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

//Общая функция закрытия

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

//Редактирование профиля

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
  openPopup(popupEdit);
});

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;

  closePopup(popupEdit);
}

formElement.addEventListener("submit", handleFormSubmit);

//Форма добавления карточки открытие

addCardButton.addEventListener("click", () => {
  openPopup(popupAddCard);
});

//Слушатель на кнопки для закрытия попап

closeButtons.forEach((elm) => {
  elm.addEventListener('click', () => closePopup(elm.closest('.popup')));
})

// Открытие картинки для просмотра (full)

function openPopupForImage(evt) {
  const popupImage = popupFullImage.querySelector(".popup__full-image");
  const popupTitle = popupFullImage.querySelector(".popup__image-title");

  popupImage.src = evt.currentTarget.src;
  popupTitle.textContent = evt.currentTarget
    .closest(".element")
    .querySelector(".element__description").textContent;
}

// Функция удаление карточки
const deleteCard = (evt) => {
  const deleteElm = evt.target.closest(".element");
  deleteElm.remove();
};

const templateElm = document.querySelector(".template-card").content;
const cards = document.querySelector(".elements");

//Функция создания одной карточки

const createNewCard = (link, name) => {
  const cardElm = templateElm.cloneNode(true);

  cardElm.querySelector(".element__image").src = link;
  cardElm.querySelector(".element__description").textContent = name;
  cardElm
    .querySelector(".element__button-like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__button-like_active");
    });
  cardElm
    .querySelector(".element__delete")
    .addEventListener("click", deleteCard);
  cardElm.querySelector(".element__image").addEventListener("click", (evt) => {
    openPopupForImage(evt);
    openPopup(popupFullImage);
  });

  return cardElm;
};

//Добавление карточек из массива

initialCards.forEach((item) => {
  cards.append(createNewCard(item.link, item.name));
});

//Добавление карточки пользователем

const formAddCard = document.querySelector(".popup__form_add-card");
const cardName = document.querySelector(".popup__input_type_add-card_name");
const cardLink = document.querySelector(".popup__input_type_add-card_link");

formAddCard.addEventListener("submit", (evt) => {
  evt.preventDefault();

  cards.prepend(createNewCard(cardLink.value, cardName.value));

  closePopup(popupAddCard);
});