import { closePopup } from './utils.js'
import { patchUserName, putchAvatar, checkRes } from './api.js'

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
  evt.submitter.textContent = 'Сохранение...'

  patchUserName({
    name: name.value,
    about: about.value,
  })
    .then((res) => checkRes(res))
    .then((res) => {
      namePlaceholder.textContent = name.value; //новое значение
      jobPlaceholder.textContent = about.value;   //новое значение
      closePopup(popupProfile)
    })
    .finally(() => {
      evt.submitter.textContent = 'Сохранить';
    })
};
function submitNewAvatar(evt) {
  evt.preventDefault();
  evt.submitter.textContent = 'Сохранение...'
  const { avatar } = evt.target.elements;

  putchAvatar({
    avatar: avatar.value
  })
    .then((res) => checkRes(res))
    .then((res) => {
      userAvatar.src = avatar.value
      closePopup(popupAvatar)
    })
    .finally(() => {
      evt.submitter.textContent = 'Сохранить';
    })
  //updateAvatar({
  //avatar: avatar.value})
}
export { closePopupEvtEsc, closePopupEvtClick, submitEditProfileForm, submitNewAvatar }
