const profileEditButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup');
const buttonEditClose = document.querySelector('.popup__button-close');

const togglePopupState = (popupToToggle) => popupToToggle.classList.toggle('popup_opened');

profileEditButton.addEventListener('click', () => togglePopupState(popupEdit));

buttonEditClose.addEventListener('click', () => togglePopupState(popupEdit));

popupEdit.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
        togglePopupState(popupEdit);
    }
})

const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_name');
const jobInput = formElement.querySelector('.popup__input_about');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__description');

function handleFormSubmit (evt) {
    evt.preventDefault(); 

    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;

    togglePopupState(popupEdit);
}

formElement.addEventListener('submit', handleFormSubmit);