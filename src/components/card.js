import { checkImage, loadCallback, errorCallback, openPopup, closePopup, disableButton} from './utils.js'
import {initialCards} from './constants.js'

const photoGrid = document.querySelector('.photo-grid');
const cardContent = document.querySelector('#card').content;
const templateCard = cardContent.querySelector('.card-mesto');
const popupViewImg = document.querySelector('#popup-img');
const popupImageValueImg = popupViewImg.querySelector('.popup__img')
const popupImageValueText = popupViewImg.querySelector('.popup__caption')
const popupAddOneCard = document.querySelector('#popup-newCard');
const imageInput = popupAddOneCard.querySelector('#image');
const submitOneCard = popupAddOneCard.querySelector('.button-submit')


function createCard(place, image) {
  const copiedCard = templateCard.cloneNode(true);

  const buttonLike = copiedCard.querySelector('.card-mesto__desc-like');
  const buttonTrash = copiedCard.querySelector('.card-mesto__trash');
  const imageCard = copiedCard.querySelector('.card-mesto__img');

  copiedCard.querySelector('.card-mesto__desc-header').textContent = place;
  imageCard.alt = place;
  imageCard.src = image;

  buttonLike.addEventListener('click', function (evt) {
      evt.target.classList.toggle('card-mesto__desc-like_active')
    });

  buttonTrash.addEventListener('click', function (evt) {
      copiedCard.remove();
  });
  imageCard.addEventListener('click', function (evt) {
    openPopup(popupViewImg)
      popupImageValueImg.src = image;
      popupImageValueImg.alt = place;
      popupImageValueText.textContent = place;
});
  return copiedCard
};

function addCard(card, firstOrder) {
  firstOrder === false ? photoGrid.append(card) : photoGrid.prepend(card);
}
const creationCard = initialCards.forEach(function (valueArray) {
  const place = valueArray.name
  const image = valueArray.link;
  const firstOrder = false;
  const card = createCard(place, image)
  addCard(card, firstOrder)
});

function submitAddCardForm(evt) {
  evt.preventDefault();
  closePopup(popupAddOneCard);
  disableButton(submitOneCard)
  //submitOneCard.classList.add('button-submit_inactive');
  //submitOneCard.classList.remove('button-submit_active');
  checkImage(imageInput.value, loadCallback, errorCallback)
};

export { creationCard, createCard, addCard, submitAddCardForm, imageInput }
