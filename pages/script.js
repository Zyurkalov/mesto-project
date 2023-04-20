
const popupViewImg = document.querySelector('#popup-img');
const popupImageValueImg = popupViewImg.querySelector('.popup__img')
const popupImageValueText = popupViewImg.querySelector('.popup__caption')

const popupProfile = document.querySelector('#popup-profile');
const nameInput = popupProfile.querySelector('#first-name');
const jobInput = popupProfile.querySelector('#prof');

const popupAddOneCard = document.querySelector('#popup-newCard');
const placeInput = popupAddOneCard.querySelector('#place');
const imageInput = popupAddOneCard.querySelector('#image');
const placeInputPopupAddCard = popupAddOneCard.querySelector('#place');
const imageInputPopupAddCard = popupAddOneCard.querySelector('#image');
const namePlaceholder = document.querySelector('.profile__name');
const jobPlaceholde = document.querySelector('.profile__about-me');

const popupProfileClose = popupProfile.querySelector('.popup__close-icon');
const popupProfileSave = popupProfile.querySelector('.button-submit');
const popupProfileOpen = document.querySelector('.profile__edit-button');
const popupAddOneCardOpen = document.querySelector('.profile__big-button');
const popupAddOneCardClose = popupAddOneCard.querySelector('.popup__close-icon');
const popupAddOneCardSave = popupAddOneCard.querySelector('.button-submit');
const popupViewImgClose = popupViewImg.querySelector('.popup__close-icon');

const photoGrid = document.querySelector('.photo-grid');
const cardContent = document.querySelector('#card').content;
const templateCard = cardContent.querySelector('.card-mesto');

function togglePopup(namePopup) {
  namePopup.classList.toggle('popup_opened');
};

function resetValue() {
  placeInput.value = ''; 
  imageInput.value = '';
};

function submitEditProfileForm(evt) {
  evt.preventDefault();
  if (!nameInput.value == '' && !jobInput.value == '') {
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    namePlaceholder.textContent = nameValue; //новое значение
    jobPlaceholde.textContent = jobValue;   //новое значение
    };
};

function createCard(place, image) {
  const templateCard = cardContent.querySelector('.card-mesto');
  const copiedCard = templateCard.cloneNode(true);

  const likeCard = copiedCard.querySelector('.card-mesto__desc-like');
  const trashCard = copiedCard.querySelector('.card-mesto__trash');
  const imageCard = copiedCard.querySelector('.card-mesto__img');

  copiedCard.querySelector('.card-mesto__desc-header').textContent = place;
  imageCard.alt = place;
  imageCard.src = image;

  likeCard.addEventListener('click', function (evt) {
    evt.target.classList.toggle('card-mesto__desc-like_active')
  });
  trashCard.addEventListener('click', function (evt) {
    copiedCard.remove(evt.target.parentElement.parentElement);
  });
  imageCard.addEventListener('click', function () {
    popupViewImg.classList.toggle('popup_opened')
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
  // place и image перезаписываются, const выдаст ошибку.
  let place = placeInputPopupAddCard.value;
  let image = imageInputPopupAddCard.value;
  const firstOrder = true;

  if (placeInputPopupAddCard.value === '') {
    place  = 'В поиске места';
  }
  if (imageInputPopupAddCard.value === '') {
    image ='./Images/landscape.svg';
    // авторские права соблюдены 
  };
  const card= createCard(place, image)
  addCard(card, firstOrder)
  togglePopup(popupAddOneCard);
};

initialCards.forEach(function (valueArray) {
  const place = valueArray.name
  const image = valueArray.link;
  const firstOrder = false;
  const card= createCard(place, image)
  addCard(card, firstOrder)
});

popupProfileOpen.addEventListener('click', function () {
  togglePopup(popupProfile);
});
popupProfileClose.addEventListener('click', function () {
  togglePopup(popupProfile);
});
popupProfileSave.addEventListener('click', function () {
  if (!nameInput.value == '' && !jobInput.value == '') {
    togglePopup(popupProfile);
  }
});
popupAddOneCardOpen.addEventListener('click', function () {
  resetValue()
  togglePopup(popupAddOneCard);
});
popupAddOneCardClose.addEventListener('click', function () {
  togglePopup(popupAddOneCard);
});
popupViewImgClose.addEventListener('click', function () {
  togglePopup(popupViewImg);
});

popupProfile.addEventListener('submit', submitEditProfileForm);
popupAddOneCard.addEventListener('submit', submitAddCardForm);


