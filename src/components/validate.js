function showInputError(formElement, inputElement, errorMessage) {
  const formError = formElement.querySelector(`.${inputElement.id}-span-error`)
  inputElement.classList.add('popup__input_error');
  formError.classList.remove('popup__span-error_hide');
  formError.textContent = errorMessage;
}
function hideInputError(formElement, inputElement) {
  const formError = formElement.querySelector(`.${inputElement.id}-span-error`)
  inputElement.classList.remove('popup__input_error');
  formError.classList.add('popup__span-error_hide');
  formError.textContent = ''
}

function isValid(formElement, inputElement) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  }
  else if (inputElement.validity.tooShort) {
    inputElement.setCustomValidity("");
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('button-submit_inactive');
    buttonElement.classList.remove('button-submit_active');
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('button-submit_inactive');
    buttonElement.classList.add('button-submit_active');
  }
}
function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.button-submit');
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__edit-value'));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

export {enableValidation}