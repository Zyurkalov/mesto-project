import { checkImage, loadCallback, errorCallback, togglePopup } from './utils.js'

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
];
//const body = document.querySelector('body')
//const popup = Array.from(document.querySelectorAll('.popup'))
const photoGrid = document.querySelector('.photo-grid');
const cardContent = document.querySelector('#card').content;
const templateCard = cardContent.querySelector('.card-mesto');
const popupViewImg = document.querySelector('#popup-img');
const popupImageValueImg = popupViewImg.querySelector('.popup__img')
const popupImageValueText = popupViewImg.querySelector('.popup__caption')
const popupAddOneCard = document.querySelector('#popup-newCard');
const imageInput = popupAddOneCard.querySelector('#image');

function createCard(place, image) {
  const copiedCard = templateCard.cloneNode(true);

  const imageCard = copiedCard.querySelector('.card-mesto__img');
  copiedCard.querySelector('.card-mesto__desc-header').textContent = place;
  imageCard.alt = place;
  imageCard.src = image;

  copiedCard.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('card-mesto__desc-like')) {
      evt.target.classList.toggle('card-mesto__desc-like_active')
    }

  });
  copiedCard.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('card-mesto__trash')) {
      copiedCard.remove(evt.target.parentElement.parentElement);
    }
  });
  copiedCard.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('card-mesto__img')) {
      togglePopup(popupViewImg)
      popupImageValueImg.src = image;
      popupImageValueImg.alt = place;
      popupImageValueText.textContent = place;
    };
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
  checkImage(imageInput.value, loadCallback, errorCallback)
  togglePopup(popupAddOneCard);
};

export { creationCard, createCard, addCard, submitAddCardForm, imageInput }
