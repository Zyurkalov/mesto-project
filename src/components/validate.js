
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
////
function disableButton(buttonSubElement, inactiveClass, activeClass) {
  buttonSubElement.disabled = true;
  buttonSubElement.classList.add(inactiveClass);
  buttonSubElement.classList.remove(activeClass);
}
function activeButton(buttonSubElement, inactiveClass, activeClass) {
  buttonSubElement.disabled = false;
  buttonSubElement.classList.remove(inactiveClass);
  buttonSubElement.classList.add(activeClass);
}
////
function toggleButtonState(inputList, buttonElement, inactiveButtonClass, activeButtonClass) {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, inactiveButtonClass, activeButtonClass)
  } else {
    activeButton(buttonElement, inactiveButtonClass, activeButtonClass)
  }
}
function setEventListeners(formElement, { inputSelector, submitButtonSelector, inactiveButtonClass, activeButtonClass, ...rest }) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
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
