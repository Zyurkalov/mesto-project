import { checkImage, loadCallback, errorCallback, openPopup, closePopup} from '../components/utils.js'

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
      copiedCard.remove(evt.target.closest('#card'));
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
  checkImage(imageInput.value, loadCallback, errorCallback)
  closePopup(popupAddOneCard);
  //////
  submitOneCard.classList.add('button-submit_inactive');
  submitOneCard.classList.remove('button-submit_active');
};

export { creationCard, createCard, addCard, submitAddCardForm, imageInput }
