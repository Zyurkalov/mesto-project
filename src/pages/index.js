import './index.css';
import { requestUser, requestCards, checkRes, myId } from '../components/api.js'
import { submitAddCardForm, createCard, addCard } from '../components/card.js'
import { enableValidation, disableButton } from '../components/validate.js'
import { openPopup, closePopup, } from '../components/utils.js'
import { submitEditProfileForm, submitNewAvatar } from '../components/modal.js'

let userId

const formsCards = document.forms.card;
const formsProfile = document.forms.profile;
const formAvatar = document.forms.avatar;

const profile = document.querySelector('.profile');
const nameFormProfile = profile.querySelector('.profile__name')
const aboutFormProfile = profile.querySelector('.profile__about-me')

const popupProfile = document.querySelector('#popup-profile');
const nameInput = popupProfile.querySelector('#first-name');
const jobInput = popupProfile.querySelector('#prof');

const closeButtons = document.querySelectorAll('.popup__close-icon');
const popupProfileClose = popupProfile.querySelector('.popup__close-icon');
const popupProfileSave = popupProfile.querySelector('.button-submit');

const popupAddOneCard = document.querySelector('#popup-newCard');
const popupProfileOpen = document.querySelector('.profile__edit-button');
const popupAddOneCardOpen = document.querySelector('.profile__big-button');
const popupAddOneCardClose = popupAddOneCard.querySelector('.popup__close-icon');
const popupAddOneCardSub = popupAddOneCard.querySelector('.button-submit');
const popupViewImg = document.querySelector('#popup-img');
const popupViewImgClose = popupViewImg.querySelector('.popup__close-icon');

const popupAvatar = document.querySelector('#popup-avatar');
const popupAvatarBtn = popupAvatar.querySelector('.button-submit')
const popupAvatarClose = popupAvatar.querySelector('.popup__close-icon')
const avatar = profile.querySelector('.profile__avatar')
const avatarInput = popupAvatar.querySelector('#image');

const namePlaceholder = profile.querySelector('.profile__name');
const jobPlaceholder = profile.querySelector('.profile__about-me');
const userAvatar = profile.querySelector('.profile__avatar')


function reqUser() {
  return requestUser().then((res) => checkRes(res))
}
function reqCards() {
  return requestCards().then((res) => checkRes(res))
}
Promise.all([reqUser(), reqCards()])
  .then(([user, cards]) => {
    namePlaceholder.textContent = user.name;
    jobPlaceholder.textContent = user.about;
    userAvatar.src = user.avatar;
    userId = user._id;

    cards.forEach(function (data) {
      const firstOrder = false;
      const card = createCard(data.name, data.link, data.likes, data._id, userId, data.owner._id)
      addCard(card, firstOrder)
    })
  })
  .catch((err) => { console.log(err) })


popupProfile.addEventListener('submit', submitEditProfileForm);
popupAddOneCard.addEventListener('submit', submitAddCardForm);
popupAvatar.addEventListener('submit', submitNewAvatar);

popupProfileOpen.addEventListener('click', function () {
  disableButton(popupProfileSave, 'button-submit_inactive', 'button-submit_active')
  nameInput.value = nameFormProfile.textContent
  jobInput.value = aboutFormProfile.textContent
  openPopup(popupProfile);
});

popupAddOneCardOpen.addEventListener('click', function () {
  disableButton(popupAddOneCardSub, 'button-submit_inactive', 'button-submit_active')
  popupAddOneCardSub.textContent = 'Сохранить'
  formsCards.reset();
  openPopup(popupAddOneCard);
});

avatar.addEventListener('click', function () {
  disableButton(popupAvatarBtn, 'button-submit_inactive', 'button-submit_active')
  formAvatar.reset();
  openPopup(popupAvatar);
});

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});


enableValidation({
  formSelector: '.popup__edit-value',
  inputSelector: '.popup__input',
  inputSelectorError: 'popup__input_error',
  submitButtonSelector: '.button-submit',
  inactiveButtonClass: 'button-submit_inactive',
  activeButtonClass: 'button-submit_active',
})
