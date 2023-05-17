import {closePopup} from './utils.js'
import {disableButton} from './validate.js'

const formsCards = document.forms.card;
const formsProfile = document.forms.profile;
const popup = Array.from(document.querySelectorAll('.popup'))
const popupProfile = document.querySelector('#popup-profile');
const popupProfileSub = popupProfile.querySelector('button-submit');
const nameInput = popupProfile.querySelector('#first-name');
const jobInput = popupProfile.querySelector('#prof');
const namePlaceholder = document.querySelector('.profile__name');
const jobPlaceholder = document.querySelector('.profile__about-me');

function closePopupEvtEsc(evt) {
  if (evt.key === 'Escape') {
    popup.forEach((popupElement) => {
      if (popupElement.classList.contains('popup_opened')) {
      closePopup(popupElement)
        /*if (popupElement.classList.contains('button-submit')) {
          disableButton(popupElement)
          formsProfile.reset()
          formsCards.reset()
        }*/
      }
    });
    //body.removeEventListener('keydown', closePopupEvtEsc)
  }
}
function closePopupEvtClick(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target)
    /*if (evt.target.classList.contains('button-submit')) {
      disableButton(evt.target)
      formsProfile.reset()
      formsCards.reset()
    }*/
  }
}

function submitEditProfileForm(evt) {
  evt.preventDefault();
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;
    namePlaceholder.textContent = nameValue; //новое значение
    jobPlaceholder.textContent = jobValue;   //новое значение
    //disableButton(popupProfileSub)
};

export { closePopupEvtEsc, closePopupEvtClick, submitEditProfileForm, disableButton }
