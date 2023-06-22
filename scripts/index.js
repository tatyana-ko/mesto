import {Card} from './Card.js'
import { FormValidator } from './FormValidator.js';

//Валидация форм
const profileFormValidator = new FormValidator(objectForValidations, popupEdit);
const addCardFormValidator = new FormValidator(objectForValidations, popupAddCard);

profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

//Добавление карточек из массива

initialCards.forEach((cardData) => {
  const card = new Card(cardData, '.template-card').generateCard();
  cardsContainer.append(card);
})

//Общая функция открытия

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  window.addEventListener("keydown", closePopupByClickOnEscape);
}

//Общая функция закрытия

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  window.removeEventListener("keydown", closePopupByClickOnEscape);
}

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

//Функция редактирование профиля

function handleFormSubmitProfile(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;

  closePopup(popupEdit);
}

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
  
  const card = new Card(newCardData, '.template-card').generateCard();
  cardsContainer.prepend(card);

  closePopup(popupAddCard);

  formAddCard.reset();
  addCardFormValidator.disableSubmitButton();
});

//Слушатель для закрытия попапов по клику на оверлей

popups.forEach((popup) => {
  popup.addEventListener("click", closePopupByClickOnOverlay);
});