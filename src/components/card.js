import { checkImage, loadCallback, errorCallback, openPopup, closePopup} from './utils.js'
import {initialCards} from './constants.js'
import {disableButton} from './validate.js'
import {postNewCard, deleteCard, likeCard, deleteLikeCard, checkRes, liked, myId, getNewCard} from './api.js'

const photoGrid = document.querySelector('.photo-grid');
const cardContent = document.querySelector('#card').content;
const templateCard = cardContent.querySelector('.card-mesto');

const popupViewImg = document.querySelector('#popup-img');
const popupImageValueImg = popupViewImg.querySelector('.popup__img')
const popupImageValueText = popupViewImg.querySelector('.popup__caption')
const popupAddOneCard = document.querySelector('#popup-newCard');
const imageInput = popupAddOneCard.querySelector('#image');
const submitOneCard = popupAddOneCard.querySelector('.button-submit')

function createCard(place, image, likes, id, owner) {
  const copiedCard = templateCard.cloneNode(true);
  const buttonLike = copiedCard.querySelector('.card-mesto__desc-like');
  const buttonTrash = copiedCard.querySelector('.card-mesto__trash');
  const imageCard = copiedCard.querySelector('.card-mesto__img');
  const likeCount = copiedCard.querySelector('.card-mesto__like-count');
  
  copiedCard.querySelector('.card-mesto__desc-header').textContent = place;
  imageCard.alt = place;
  imageCard.src = image;
    likeCount.textContent = likes.length
    
    likes.forEach(function (user) {
      if (user._id === myId) {
        buttonLike.classList.add('card-mesto__desc-like_active')
      }
    })
    
  buttonLike.addEventListener('click', function (evt) {
  if (buttonLike.classList.contains('card-mesto__desc-like_active')) {
      deleteLikeCard(id)
      .then((res) => checkRes(res))
        .then((res) => {
          const cardLike = res.likes.length;
          likeCount.textContent = cardLike;
          evt.target.classList.remove('card-mesto__desc-like_active')
        })
        .catch((err) => {console.log(err)})
        .finally(() => {})
    }else{
      likeCard(id)
      .then((res) => checkRes(res))
        .then((res) => {
          const cardLike = res.likes.length;
          likeCount.textContent = cardLike;
          evt.target.classList.add('card-mesto__desc-like_active')
        })
        .catch((err) => {console.log(err)})
        .finally(() => {})
      }
      });

  buttonTrash.addEventListener('click', function (evt) {
    const cardId = id
    deleteCard(cardId)
      .then((res) => checkRes(res))
      .then((data) => {
        copiedCard.remove(); 
      })
      .catch((err) => {console.log(err)})
      .finally(() => {})
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
function submitAddCardForm(evt) {
  evt.preventDefault();
  const { image, name } = evt.target.elements;
  evt.submitter.textContent = 'Сохранение...'

  getNewCard({
    image: image.value,
    name: name.value,
  })
    .then((res) => checkRes(res))
    .then((data) => {
      console.log(data)
      closePopup(popupAddOneCard);
      disableButton(submitOneCard)
      checkImage(imageInput.value, loadCallback, errorCallback)
    })
    .catch((err) => {console.log(err)})
    .finally(() => {
      evt.submitter.textContent = 'Сохранить'
    })
  //closePopup(popupAddOneCard);
  //disableButton(submitOneCard)
};

export {createCard, addCard, submitAddCardForm, imageInput }
