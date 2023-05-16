import './index.css';
import { submitAddCardForm } from '../components/card.js'
import {enableValidation} from '../components/validate.js'
import { openPopup, closePopup, disableButton} from '../components/utils.js'
import { submitEditProfileForm } from '../components/modal.js'

const formsCards = document.forms.card;
const formsProfile = document.forms.profile;
const popupProfile = document.querySelector('#popup-profile');

const nameInput = popupProfile.querySelector('#first-name');
const jobInput = popupProfile.querySelector('#prof');
const popupProfileClose = popupProfile.querySelector('.popup__close-icon');
const popupProfileSave = popupProfile.querySelector('.button-submit');
const popupAddOneCard = document.querySelector('#popup-newCard');
const popupProfileOpen = document.querySelector('.profile__edit-button');
const popupAddOneCardOpen = document.querySelector('.profile__big-button');
const popupAddOneCardClose = popupAddOneCard.querySelector('.popup__close-icon');
const popupViewImg = document.querySelector('#popup-img');
const popupViewImgClose = popupViewImg.querySelector('.popup__close-icon');

popupProfile.addEventListener('submit', submitEditProfileForm);
popupAddOneCard.addEventListener('submit', submitAddCardForm);

popupProfileOpen.addEventListener('click', function () {
  openPopup(popupProfile);
  disableButton(popupAddOneCard)
});
popupProfileClose.addEventListener('click', function () {
  formsProfile.reset()
  closePopup(popupProfile);
  disableButton(popupProfile)
});
popupProfileSave.addEventListener('click', function () {
  if (!nameInput.value == '' && !jobInput.value == '') {
    closePopup(popupProfile);
    //disableButton(popupProfile)
  }
});
popupAddOneCardOpen.addEventListener('click', function () {
  openPopup(popupAddOneCard);
  disableButton(popupAddOneCard)
});
popupAddOneCardClose.addEventListener('click', function () {
  closePopup(popupAddOneCard);
  formsCards.reset();
});
popupViewImgClose.addEventListener('click', function () {
  closePopup(popupViewImg);
});

enableValidation({
  formSelector:'.popup__edit-value',
  inputSelector:'.popup__input',
  inputSelectorError:'popup__input_error',
  submitButtonSelector:'.button-submit',
  inactiveButtonClass:'button-submit_inactive',
  activeButtonClass:'button-submit_active',
})

