const objectForValidations = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error', //красная нижняя рамка
  errorClass: 'popup__form-error', //сообщение об ошибке
}

//Показывает элемент ошибки

const showInputError = (formElement, inputElement, errorMessage, validationObject) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(validationObject.inputErrorClass);
  errorElement.classList.add(validationObject.errorClass);
  errorElement.textContent = errorMessage;
};

//Скрывает элемент ошибки

const hideInputError = (formElement, inputElement, validationObject) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
  inputElement.classList.remove(validationObject.inputErrorClass);
  errorElement.classList.remove(validationObject.errorClass);
  errorElement.textContent = '';
}; 

//Проверяет валидность поля

const isValid = (formElement, inputElement, validationObject) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationObject);
  } else {
    hideInputError(formElement, inputElement, validationObject);
  }
}; 

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

const enableSubmitButton = (buttonElement, validationObject) => {
  buttonElement.removeAttribute('disabled');
  buttonElement.classList.remove(validationObject.inactiveButtonClass);
}

const disableSubmitButton = (buttonElement, validationObject) => {
  buttonElement.setAttribute('disabled', true);
  buttonElement.classList.add(validationObject.inactiveButtonClass);
}

//Функция для включения/выключения кнопки

const toggleButtonState = (inputList, buttonElement, validationObject) => {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, validationObject);
  } else {
    enableSubmitButton(buttonElement, validationObject);
  }
}; 

const setEventListeners = (formElement, validationObject) => {
  const inputList = Array.from(formElement.querySelectorAll(validationObject.inputSelector));
  const buttonElement = formElement.querySelector(validationObject.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, validationObject);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, validationObject);
      toggleButtonState(inputList, buttonElement, validationObject);
    });
  });
}; 

const enableValidation = (validationObject) => {
  const formList = Array.from(document.querySelectorAll(validationObject.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function(evt) {
      evt.preventDefault();
    })
    setEventListeners(formElement, validationObject);
  })
};

enableValidation(objectForValidations);

