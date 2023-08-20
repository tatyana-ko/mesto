import '../pages/index.css';

import { Card } from "../scripts/Card.js";
import { FormValidator } from "../scripts/FormValidator.js";
// import { Popup } from "./Popup.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import Section from "../scripts/Section.js";
import UserInfo from "../scripts/UserInfo.js";
import { initialCards } from "../scripts/cards.js";
import {
  objectForValidations,
  profileEditButton,
  popupEdit,
  profileName,
  profileAbout,
  addCardButton,
  popupAddCard,
  cardName,
  cardLink,
} from "../scripts/constants.js";

//Валидация форм (FormValidator)
const profileFormValidator = new FormValidator(objectForValidations, popupEdit);
const addCardFormValidator = new FormValidator(objectForValidations, popupAddCard);

profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

// Для открытия просмотра картинки в полноразмерном формате

const fullImagePopup = new PopupWithImage(".popup_type_full-image");
fullImagePopup.setEventListeners();

function handleCardClick({ name, link }) {
  fullImagePopup.open(name, link);
}

//
const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createNewCard(item);
      section.addItem(cardElement);
    },
  },
  ".elements"
);

section.renderItems();

// Добавление карточки от пользователя

function addCard() {
  const newCardData = { link: cardLink.value, name: cardName.value };
  section.addItem(createNewCard(newCardData));
  newCardPopupForm.close();
  addCardFormValidator.disableSubmitButton();
}

const newCardPopupForm = new PopupWithForm(".popup_type_add-card", addCard);
newCardPopupForm.setEventListeners();

// Редактирование профиля
const userInformation = new UserInfo({
  nameElement: ".profile__name",
  aboutElement: ".profile__description",
});

const userInformationPopup = new PopupWithForm(".popup_type_profile", ({name, about}) => {
  userInformation.setUserInfo({name, about});
  userInformationPopup.close();
});

userInformationPopup.setEventListeners();

// Слушатель для кнопки редактирования профиля
profileEditButton.addEventListener("click", () => {
  userInformationPopup.open();

  profileName.value = userInformation.getUserInfo().name;
  profileAbout.value = userInformation.getUserInfo().about;
  
  profileFormValidator.disableSubmitButton();
});

//Функция создания экземпляра класса Card

function createNewCard(cardData) {
  const card = new Card(
    cardData,
    ".template-card",
    handleCardClick
  ).generateCard();

  return card;
}

// Слушатель для кнопки добавления карточки на страницу
addCardButton.addEventListener("click", () => {
  newCardPopupForm.open();
  addCardFormValidator.fieldUpdateMethod();
});