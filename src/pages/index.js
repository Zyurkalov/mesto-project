import './index.css';
import { submitAddCardForm } from '../components/card.js'
import { enableValidation, disableButton } from '../components/validate.js'
import { openPopup, closePopup,  } from '../components/utils.js'
import { submitEditProfileForm } from '../components/modal.js'

const formsCards = document.forms.card;
const formsProfile = document.forms.profile;

const profile = document.querySelector('.profile');
const nameFormProfile = profile.querySelector('.profile__name')
const aboutFormProfile = profile.querySelector('.profile__about-me')

const popupProfile = document.querySelector('#popup-profile');
const nameInput = popupProfile.querySelector('#first-name');
const jobInput = popupProfile.querySelector('#prof');
const popupProfileClose = popupProfile.querySelector('.popup__close-icon');
const popupProfileSave = popupProfile.querySelector('.button-submit');

const popupAddOneCard = document.querySelector('#popup-newCard');
const popupProfileOpen = document.querySelector('.profile__edit-button');
const popupAddOneCardOpen = document.querySelector('.profile__big-button');
const popupAddOneCardClose = popupAddOneCard.querySelector('.popup__close-icon');
const popupAddOneCardSub = popupAddOneCard.querySelector('.button-submit');
const popupViewImg = document.querySelector('#popup-img');
const popupViewImgClose = popupViewImg.querySelector('.popup__close-icon');


popupProfile.addEventListener('submit', submitEditProfileForm);
popupAddOneCard.addEventListener('submit', submitAddCardForm);


popupProfileOpen.addEventListener('click', function () {
  disableButton(popupProfileSave, 'button-submit_inactive', 'button-submit_active')
  nameInput.value = nameFormProfile.textContent
  jobInput.value = aboutFormProfile.textContent
  openPopup(popupProfile);
});
popupProfileClose.addEventListener('click', function () {
  closePopup(popupProfile);
});
popupProfileSave.addEventListener('click', function () {
  if (!nameInput.value == '' && !jobInput.value == '') {
    closePopup(popupProfile);
  }
});

popupAddOneCardOpen.addEventListener('click', function () {
  disableButton(popupAddOneCardSub, 'button-submit_inactive', 'button-submit_active')
  formsCards.reset();
  openPopup(popupAddOneCard);
});
popupAddOneCardClose.addEventListener('click', function () {
  formsCards.reset();
  closePopup(popupAddOneCard);
});
popupViewImgClose.addEventListener('click', function () {
  closePopup(popupViewImg);
});

enableValidation({
  formSelector: '.popup__edit-value',
  inputSelector: '.popup__input',
  inputSelectorError: 'popup__input_error',
  submitButtonSelector: '.button-submit',
  inactiveButtonClass: 'button-submit_inactive',
  activeButtonClass: 'button-submit_active',
})
