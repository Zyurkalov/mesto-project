const body = document.querySelector('body')

const popupImg = document.querySelector('#popup-img');
const popupUser = document.querySelector('#popup-profile');
const popupPlace = document.querySelector('#popup-newCard');

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
  }
];

//добавление и закрытие модального окна редкактирования профиля
const popupUserClose = popupUser.querySelector('.popup__close-icon');
const popupUserOpen = document.querySelector('.profile__edit-button');
const popupUserSave = popupUser.querySelector('.button-submit');

popupUserOpen.addEventListener('click', function () {
  popupUser.classList.add('popup_opened');
});
popupUserClose.addEventListener('click', function () {
  popupUser.classList.remove('popup_opened');
});
popupUserSave.addEventListener('click', function () {
  popupUser.classList.remove('popup_opened');
});
body.addEventListener('keydown', function (event) {
  if (event.key == 'Escape') {
    popupUser.classList.remove('popup_opened')
    popupPlace.classList.remove('popup_opened')
    popupImg.classList.remove('popup_opened')
  };
});
//input получение и изменения значении
const nameInput = popupUser.querySelector('#first-name');
const jobInput = popupUser.querySelector('#prof');

nameInput.value = "Жак-Ив Кусто"; //значения по умолчанию, как если бы пользователь ввел и сохранил их раньше
jobInput.value = "Исследователь океана";  //значения по умолчанию, как если бы пользователь ввел и сохранил их раньше

function popupUserFormSubmit(evt) {
  evt.preventDefault();

  let nameValue = nameInput.value;
  let jobValue = jobInput.value;
  const nameElement = document.querySelector('.profile__name');
  const jobElement = document.querySelector('.profile__about-me');

  nameElement.textContent = nameValue; //новое значение
  jobElement.textContent = jobValue;   //новое значение
}
popupUser.addEventListener('submit', popupUserFormSubmit);

//добавление и закрытие модального окна создания карточек
const popupPlaceOpen = document.querySelector('.profile__big-button');
const popupPlaceClose = popupPlace.querySelector('.popup__close-icon');
const popupPlaceSave = popupPlace.querySelector('.button-submit')

const photoGrid = document.querySelector('.photo-grid');
const cardMesto = document.querySelector('#card').content;

function resetValue() {
  const nameInput = popupPlace.querySelector('#place');
  const jobInput = popupPlace.querySelector('#image');
  nameInput.value = ''; 
  jobInput.value = '';
}

popupPlaceOpen.addEventListener('click', function () {
  resetValue()
  popupPlace.classList.add('popup_opened');
});

body.addEventListener('keydown', function (event) {
  if (event.key == 'Enter') {
    popupPlace.classList.add('popup_opened')
    resetValue()
  };
});
popupPlaceClose.addEventListener('click', function () {
  popupPlace.classList.remove('popup_opened');
});

function popupPlaceFormSubmit(evt) {
  evt.preventDefault();
  const copyCardM = cardMesto.querySelector('.card-mesto').cloneNode(true);

  const placeInput = popupPlace.querySelector('#place');
  const imageInput = popupPlace.querySelector('#image');

  let place = placeInput.value;
  let image = imageInput.value;

  if (placeInput.value === '') {
    copyCardM.querySelector('.card-mesto__desc-header').textContent = 'В поиске места';
    copyCardM.querySelector('.card-mesto__img').alt = 'картинка';
  } else {
    copyCardM.querySelector('.card-mesto__desc-header').textContent = place;
    copyCardM.querySelector('.card-mesto__img').alt = place;
  }

  if (image == '') {
    copyCardM.querySelector('.card-mesto__img').src ='./Images/landscape.svg';
    // авторские права соблюдены 
  } else {
    copyCardM.querySelector('.card-mesto__img').src = image;
  }

  photoGrid.prepend(copyCardM);
  popupPlace.classList.remove('popup_opened');

  //кнопка - 🤍
  const heartLike = copyCardM.querySelector('.card-mesto__desc-like');
  heartLike.addEventListener('click', function (evt) {
    evt.target.classList.toggle('card-mesto__desc-like_active')
  });

  //кнопка - 🗑️
  const trashCard = copyCardM.querySelector('.card-mesto__trash');
  trashCard.addEventListener('click', function (evt) {
    copyCardM.remove(evt.target.parentElement.parentElement);
  });
  //картинка
  const imageCard = copyCardM.querySelector('.card-mesto__img');
  imageCard.addEventListener('click', function () {

    popupImg.classList.add('popup_opened')
    popupImg.querySelector('.popup__img').src = image;
    popupImg.querySelector('.popup__img').alt = place;
    popupImg.querySelector('.popup__caption').textContent = place;
  });
};
popupPlaceSave.addEventListener('click', popupPlaceFormSubmit);

//создание карточек из массива
initialCards.forEach(function (item) {
  const copyCardM = cardMesto.querySelector('.card-mesto').cloneNode(true);

  copyCardM.querySelector('.card-mesto__desc-header').textContent = item.name;
  copyCardM.querySelector('.card-mesto__img').alt = item.name;
  copyCardM.querySelector('.card-mesto__img').src = item.link;

  photoGrid.append(copyCardM);

  //кнопка - 🤍
  const heartLike = copyCardM.querySelector('.card-mesto__desc-like');
  heartLike.addEventListener('click', function (evt) {
    evt.target.classList.toggle('card-mesto__desc-like_active')
  });
  //кнопка - 🗑️
  const trashCard = copyCardM.querySelector('.card-mesto__trash');
  trashCard.addEventListener('click', function (evt) {
    copyCardM.remove(evt.target.parentElement.parentElement);
  });
  //картинка
  const imageCard = copyCardM.querySelector('.card-mesto__img');
  imageCard.addEventListener('click', function () {
    popupImg.classList.add('popup_opened')
    popupImg.querySelector('.popup__img').src = item.link;
    popupImg.querySelector('.popup__img').alt = item.name;
    popupImg.querySelector('.popup__caption').textContent = item.name;
  });
});
//закрытие попапа с увеличенной картинкой
const popupImgClose = popupImg.querySelector('.popup__close-icon');
popupImgClose.addEventListener('click', function () {
  popupImg.classList.remove('popup_opened')
});
