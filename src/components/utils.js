import { closePopupEvtEsc, closePopupEvtClick } from './modal.js'
import { createCard, addCard, imageInput } from './card.js'

const imgLandscape = new URL('../Images/landscape.svg', import.meta.url);
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
  const image = imgLandscape;
  const place = placeInput.value;
  const firstOrder = true;

  const card = createCard(place, image)
  addCard(card, firstOrder)
}

function openPopup(namePopup) {
  namePopup.classList.add('popup_opened');
  body.addEventListener('keydown', closePopupEvtEsc)
  body.addEventListener('click', closePopupEvtClick)
}

function closePopup(namePopup) {
  namePopup.classList.remove('popup_opened');
  body.removeEventListener('keydown', closePopupEvtEsc)
  body.removeEventListener('click', closePopupEvtClick)
}
function disableButton(buttonSubElement, inactiveClass ='button-submit_inactive', activeClass ='button-submit_active') {
  buttonSubElement.disabled = true;
  buttonSubElement.classList.add(inactiveClass);
  buttonSubElement.classList.remove(activeClass);
}
/*function disableButton(namePopup) {
  const buttonElement = namePopup.querySelector('.button-submit')
  buttonElement.disabled = true;
  buttonElement.classList.add('button-submit_inactive');
  buttonElement.classList.remove('button-submit_active');
}*/
function activeButton(buttonSubElement, inactiveClass ='button-submit_inactive', activeClass ='button-submit_active') {
  buttonSubElement.disabled = false;
  buttonSubElement.classList.remove(inactiveClass);
  buttonSubElement.classList.add(activeClass);
}

export { checkImage, loadCallback, errorCallback, openPopup, closePopup, disableButton, activeButton }

