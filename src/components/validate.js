import {disableButton, activeButton} from './utils.js'
disableButton, activeButton
function showInputError(formElement, inputElement, errorMessage, { inputSelectorError }) {
  const formError = formElement.querySelector(`.${inputElement.id}-span-error`)
  inputElement.classList.add(inputSelectorError);
  formError.textContent = errorMessage;
}
function hideInputError(formElement, inputElement, { inputSelectorError }) {
  const formError = formElement.querySelector(`.${inputElement.id}-span-error`)
  inputElement.classList.remove(inputSelectorError);
  formError.textContent = ''
}

function checkInputValidity(formElement, inputElement, { ...rest }) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  }
  else if (inputElement.validity.tooShort) {
    inputElement.setCustomValidity("");
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, rest);
  } else {
    hideInputError(formElement, inputElement, rest);
  }
};

function toggleButtonState(inputList, buttonElement, inactiveButtonClass, activeButtonClass) {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, inactiveButtonClass, activeButtonClass)
    //buttonElement.disabled = true;
    //buttonElement.classList.add(inactiveButtonClass);
    //buttonElement.classList.remove(activeButtonClass);
  } else {
    activeButton(buttonElement, inactiveButtonClass, activeButtonClass)
    //buttonElement.disabled = false;
    //buttonElement.classList.remove(inactiveButtonClass);
    //buttonElement.classList.add(activeButtonClass);
  }
}
function setEventListeners(formElement, { inputSelector, submitButtonSelector, inactiveButtonClass, activeButtonClass, ...rest }) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  //toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    ////
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, rest);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass, activeButtonClass);
    });
    ////
  });
};

function enableValidation({ formSelector, ...rest }) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, rest);
  });
};
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
export { enableValidation, setEventListeners, toggleButtonState , disableButton}
