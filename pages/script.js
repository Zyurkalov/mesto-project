
const popupViewImg = document.querySelector('#popup-img');
const popupProfile = document.querySelector('#popup-profile');
const nameInput = popupProfile.querySelector('#first-name');
const jobInput = popupProfile.querySelector('#prof');
const popupAddOneCard = document.querySelector('#popup-newCard');
const placeInput = popupAddOneCard.querySelector('#place');
const imageInput = popupAddOneCard.querySelector('#image');

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
  const nameInput = popupAddOneCard.querySelector('#place');
  const jobInput = popupAddOneCard.querySelector('#image');
  nameInput.value = ''; 
  jobInput.value = '';
};

function popupProfileFormSubmit(evt) {
  evt.preventDefault();
  if (!nameInput.value == '' && !jobInput.value == '') {
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    namePlaceholder.textContent = nameValue; //новое значение
    jobPlaceholde.textContent = jobValue;   //новое значение
    };
};

function addOneCard(place, image, firstOrder) {
  const templateCard = cardContent.querySelector('.card-mesto');
  const copiedCard = templateCard.cloneNode(true);

  const likeCard = copiedCard.querySelector('.card-mesto__desc-like');
  const trashCard = copiedCard.querySelector('.card-mesto__trash');
  const imageCard = copiedCard.querySelector('.card-mesto__img');

  copiedCard.querySelector('.card-mesto__desc-header').textContent = place;
  copiedCard.querySelector('.card-mesto__img').alt = place;
  copiedCard.querySelector('.card-mesto__img').src = image;

  likeCard.addEventListener('click', function (evt) {
    evt.target.classList.toggle('card-mesto__desc-like_active')
  });
  trashCard.addEventListener('click', function (evt) {
    copiedCard.remove(evt.target.parentElement.parentElement);
  });
  imageCard.addEventListener('click', function () {
    popupViewImg.classList.add('popup_opened')
    popupViewImg.querySelector('.popup__img').src = image;
    popupViewImg.querySelector('.popup__img').alt = place;
    popupViewImg.querySelector('.popup__caption').textContent = place;
  });
  firstOrder === false ? photoGrid.append(copiedCard) : photoGrid.prepend(copiedCard);
};

function byUserAddCard(evt) {
  evt.preventDefault();
  let place = placeInput.value;
  let image = imageInput.value;
  const firstOrder = true;
  
  if (placeInput.value === '') {
    place  = 'В поиске места';
  }
  if (imageInput.value == '') {
    image ='./Images/landscape.svg';
    // авторские права соблюдены 
  };

  addOneCard(place, image, firstOrder)
  togglePopup(popupAddOneCard);
};

initialCards.forEach(function (valueArray) {
  const place = valueArray.name
  const image = valueArray.link;
  const firstOrder = false;
  addOneCard(place, image, firstOrder)
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

popupProfile.addEventListener('submit', popupProfileFormSubmit);
popupAddOneCardSave.addEventListener('click', byUserAddCard);


