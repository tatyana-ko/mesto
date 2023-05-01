const profileEditButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup');
const buttonEditClose = document.querySelector('.popup__button-close');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_about');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__description');

profileEditButton.addEventListener ('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;
    popupEdit.classList.add('popup_opened');
});

function closePopup() {
    popupEdit.classList.remove('popup_opened');
}

buttonEditClose.addEventListener ('click', closePopup);

function handleFormSubmit (evt) {
    evt.preventDefault(); 

    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;

    closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);