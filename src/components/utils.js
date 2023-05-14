import { closePopupEvtEsc, closePopupEvtClick } from './modal.js'
import { createCard, addCard, imageInput } from './card.js'

const popupAddOneCard = document.querySelector('#popup-newCard');
const placeInput = popupAddOneCard.querySelector('#place');
const body = document.querySelector('body')

function checkImage(url, imageFound, imageNotFound) {
  const tester = new Image();
  tester.src = url;
  tester.onload = imageFound;
  tester.onerror = imageNotFound;
}

function loadCallback() {
  const place = placeInput.value;
  const image = imageInput.value;
  const firstOrder = true;

  const card = createCard(place, image)
  addCard(card, firstOrder)
}

function errorCallback() {
  const image = './Images/landscape.svg'
  const place = placeInput.value;
  const firstOrder = true;

  const card = createCard(place, image)
  addCard(card, firstOrder)
}

function togglePopup(namePopup) {
  if (!namePopup.classList.contains('popup_opened')) {
    namePopup.classList.add('popup_opened');
    body.addEventListener('keydown', closePopupEvtEsc)
    body.addEventListener('click', closePopupEvtClick)
  } else {
    namePopup.classList.remove('popup_opened');
    body.removeEventListener('keydown', closePopupEvtEsc)
    body.removeEventListener('click', closePopupEvtClick)
  }
};

export { checkImage, loadCallback, errorCallback, togglePopup }