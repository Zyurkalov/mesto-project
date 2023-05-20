import {closePopup} from './utils.js'
import {updateUserName, updateAvatar} from './api.js'

const popup = Array.from(document.querySelectorAll('.popup'))
const popupProfile = document.querySelector('#popup-profile');
const nameInput = popupProfile.querySelector('#first-name');
const jobInput = popupProfile.querySelector('#prof');
const profile = document.querySelector('.profile');
const userAvatar = profile.querySelector('.profile__avatar')
const namePlaceholder = profile.querySelector('.profile__name');
const jobPlaceholder = profile.querySelector('.profile__about-me');
const popupAvatar = document.querySelector('#popup-avatar');
const avatarInput = popupAvatar.querySelector('#image');


function closePopupEvtEsc(evt) {
  if (evt.key === 'Escape') {
    popup.forEach((popupElement) => {
      if (popupElement.classList.contains('popup_opened')) {
      closePopup(popupElement)
      }
    });
  }
}
function closePopupEvtClick(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target)
  }
}

function submitEditProfileForm(evt) {
  evt.preventDefault();
  const { name, about } = evt.target.elements;
  //console.log(evt.target.elements)
  //console.log({ name, about })
  evt.submitter.textContent = 'Сохранение...'
  updateUserName({
    name: name.value,
    about: about.value,
  })
};
function submitNewAvatar(evt) {
  evt.preventDefault();
  evt.submitter.textContent = 'Сохранение...'
  const {avatar} = evt.target.elements;
  //console.log({avatar})
  updateAvatar({
  avatar: avatar.value})
} 
export { closePopupEvtEsc, closePopupEvtClick, submitEditProfileForm, submitNewAvatar}
