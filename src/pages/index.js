import "../pages/index.css";
//Импорт классов
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

import {
  objectForValidations,
  profileEditButton,
  popupEdit,
  profileName,
  profileAbout,
  addCardButton,
  popupAddCard,
  popupAddNewAvatar,
  avatarUpdateButton,
  saveButton,
} from "../components/constants.js";

//url 'https://mesto.nomoreparties.co/v1/cohort-74'
//токен '119d99d8-0a5d-4d7e-88d8-8e6173e18f3b'

//Валидация форм (FormValidator)
const profileFormValidator = new FormValidator(objectForValidations, popupEdit);
const addCardFormValidator = new FormValidator(objectForValidations, popupAddCard);
const newAvatarFormValidator = new FormValidator(objectForValidations, popupAddNewAvatar);

profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
newAvatarFormValidator.enableValidation();

//Создание экземпляра класса Api
const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-74",
  headers: {
    "Content-Type": "application/json",
    authorization: "119d99d8-0a5d-4d7e-88d8-8e6173e18f3b",
  },
});

// Редактирование профиля
const userInformation = new UserInfo({
  nameElement: ".profile__name",
  aboutElement: ".profile__description",
  avatarElement: ".profile__avatar",
});

//Создание экземпляра класса для подтверждения удаления карточки
const popupToConfirmDelition = new PopupWithConfirmation(".popup_type_delete-card", (data) => {
  handleCardDelete(data);
})

popupToConfirmDelition.setEventListeners();

let userId;
//Добавление на страницу карточек с сервера и получение информации о пользователе
Promise.all([api.getUserInfo(), api.getInitialCards()]).then(
  ([userData, cards]) => {
    userId = userData._id;
    userInformation.setUserInfo({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar,
    });

    section.renderItems(cards);
  }
);

//Создание экземпляра класса Section
const section = new Section(
  {
    renderer: (item) => {
      const cardElement = createNewCard(item);
      section.addItem(cardElement);
    },
  },
  ".elements"
);

//Функция создания карточки
function createNewCard(cardData) {
  const card = new Card(cardData, userId, ".template-card", {
    handleCardClick,
    handleCardDelete,
    handleCardLike,
  }).generateCard();

  return card;
}

// Для открытия просмотра картинки в полноразмерном формате
const fullImagePopup = new PopupWithImage(".popup_type_full-image");
fullImagePopup.setEventListeners();

//Функция для просмотра картинки в полноразмерном формате
function handleCardClick({ name, link }) {
  fullImagePopup.open(name, link);
}

//Функция для удаления карточки
function handleCardDelete(createdCard) {
  popupToConfirmDelition.open();
  popupToConfirmDelition.deleteCardCallback(() => {
    api.deleteCard(createdCard.getCardId())
      .then(() => {
        createdCard.removeCardFromPage();
        popupToConfirmDelition.close();
      })
      .catch(error => console.log(error))
  })
}

//Функция для лайка карточки
function handleCardLike(card) {
  if(card.isLiked()) {
    api.deleteLike(card.getCardId())
      .then((data) => {
        card.updateLike(data);
      })
      .catch((error) => console.log(error))
  } else {
    api.addLike(card.getCardId())
      .then((data) => {
        card.updateLike(data);
      })
      .catch((error) => console.log(error))
  }
}


//Создание экземпляра класса PopupWithForm для редактирования профиля
const userInformationPopup = new PopupWithForm(".popup_type_profile", {
  handleFormSubmit: (data) => {
    saveButton.textContent = "Сохранение...";
    api
      .editProfile(data)
      .then((response) => {
        userInformation.setUserInfo(response);
        userInformationPopup.close();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        saveButton.textContent = "Сохранить";
      });
  },
});

userInformationPopup.setEventListeners();

//Слушатель для кнопки редактирования профиля
profileEditButton.addEventListener("click", () => {
  userInformationPopup.open();

  profileName.value = userInformation.getUserInfo().name;
  profileAbout.value = userInformation.getUserInfo().about;

  profileFormValidator.disableSubmitButton();
});

//Создание экземпляра класса PopupWithForm для добавления карточки от пользователя
const newCardPopupForm = new PopupWithForm(".popup_type_add-card", {
  handleFormSubmit: (data) => {
    saveButton.textContent = "Сохранение...";
    api
      .addNewCard(data)
      .then((response) => {
        section.addItem(createNewCard(response));
        newCardPopupForm.close();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        saveButton.textContent = "Создать";
      });
  },
});

newCardPopupForm.setEventListeners();

// Слушатель для кнопки добавления карточки на страницу
addCardButton.addEventListener("click", () => {
  newCardPopupForm.open();
  addCardFormValidator.updateFieldMethod();
  addCardFormValidator.disableSubmitButton();
});

//Создание экземпляра класса PopupWithForm для изменения аватара
const newAvatarPopupForm = new PopupWithForm(".popup_type_update-avatar", {
  handleFormSubmit: (data) => {
    saveButton.textContent = "Сохранение...";
    api
      .updateUserAvatar(data)
      .then((response) => {
        userInformation.setUserInfo(response);
        newAvatarPopupForm.close();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        saveButton.textContent = "Сохранить";
      });
  },
});

newAvatarPopupForm.setEventListeners();

avatarUpdateButton.addEventListener("click", () => {
  newAvatarPopupForm.open();
});
