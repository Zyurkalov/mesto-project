import { submitAddCardForm } from './card.js'
import {enableValidation} from './validate.js'
import { togglePopup } from './utils.js'
import { submitEditProfileForm } from './modal.js'

const forms = document.forms.card;
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
  togglePopup(popupProfile);
});
popupProfileClose.addEventListener('click', function () {
  togglePopup(popupProfile);
});
popupProfileSave.addEventListener('click', function () {
  if (!nameInput.value == '' && !jobInput.value == '') {
    togglePopup(popupProfile);
  }
});
popupAddOneCardOpen.addEventListener('click', function () {
  forms.reset();
  togglePopup(popupAddOneCard);
});
popupAddOneCardClose.addEventListener('click', function () {
  togglePopup(popupAddOneCard);
});
popupViewImgClose.addEventListener('click', function () {
  togglePopup(popupViewImg);
});

enableValidation()