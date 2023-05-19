import { createCard, addCard} from './card.js'

const profile = document.querySelector('.profile');
const namePlaceholder = profile.querySelector('.profile__name');
const jobPlaceholder = profile.querySelector('.profile__about-me');

const popupAvatar = document.querySelector('#popup-avatar');
const avatarInput = popupAvatar.querySelector('#image');
const userAvatar = profile.querySelector('.profile__avatar')

const idKey = '237968ee-75dc-4a1c-917f-d4a72dcf6d28'

function getFetchCards() {
  return fetch('https://nomoreparties.co/v1/plus-cohort-24/cards', {
    headers: {
      authorization: idKey
    }
  })
}
function getFetchUser() {
  return fetch('https://nomoreparties.co/v1/plus-cohort-24/users/me', {
    headers: {
      authorization: idKey,
    }
  })
}
function patchUserName(user){
  return fetch('https://nomoreparties.co/v1/plus-cohort-24/users/me', {
    method: 'PATCH',
    headers: {
      authorization: idKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: user.name,
      about: user.about,
    })
  })
}
function putchAvatar(user) {
  return fetch('https://nomoreparties.co/v1/plus-cohort-24/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: idKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      avatar: user.avatar,
    })
  })
}

function getNewCard(card) {
  return fetch('https://nomoreparties.co/v1/plus-cohort-24/cards', {
    method: 'POST',
    headers: {
      authorization: idKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: card.name,
      link: card.image,
    }),
  })
}
///////////////////////////////////
///////////////////////////////////

function postNewCard(card){
  getNewCard(card)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }else{
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    })
    .then((data) => {
      print('получилось?') 
    })
    .catch(() => {
      console.log('Что то не так c postNewCard')
    })
}

///////////////////////////////////
///////////////////////////////////

function requestUser() {
  getFetchUser()
  .then((res) => {
    if (res.ok) {
      return res.json();
    }else{
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    }
  })
  .then((user) => {
    namePlaceholder.textContent = user.name; //новое значение
    jobPlaceholder.textContent = user.about;   //новое значение
    userAvatar.src = user.avatar
  })
  .catch(() => {
    console.log('Что то не так c requestUser')
  })
}



function updateUserName(user) {
  patchUserName(user)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }else{
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    })
    .then((res) => { 
      namePlaceholder.textContent = user.name; //новое значение
      jobPlaceholder.textContent = user.about;   //новое значение
    })
    .catch(() => {
      console.log('Что то не так c updateUser')
    })
}


function updateAvatar(user) {
  putchAvatar(user)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }else{
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    })
    .then((res) => { 
      userAvatar.src = user.avatar
    })
    .catch(() => {
      console.log('Что то не так c updateAvatar')
    })
}

function requestCards() {
  getFetchCards()
    .then((res) => {
      if (res.ok) {
        return res.json();
      }else{
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    })
    .then((res) => { 
      res.forEach((data) => { 

        //console.log(data.likes.length)
        const firstOrder = false;
        const card = createCard(data.name, data.link)
        addCard(card, firstOrder)
      })
    })
    .catch(() => {
      console.log('Что то не так c requestCards')
    })
}


requestCards()
requestUser()
export {updateUserName, updateAvatar, postNewCard}

