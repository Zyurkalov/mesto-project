import { createCard, addCard} from './card.js'

const profile = document.querySelector('.profile');
const namePlaceholder = profile.querySelector('.profile__name');
const jobPlaceholder = profile.querySelector('.profile__about-me');

const popupAvatar = document.querySelector('#popup-avatar');
const avatarInput = popupAvatar.querySelector('#image');
const userAvatar = profile.querySelector('.profile__avatar')

const idKey = '237968ee-75dc-4a1c-917f-d4a72dcf6d28'
const myId = '462e4876dc9bbf55564f6ab8'

const myConfig = {
  adress: 'https://nomoreparties.co/v1/plus-cohort-24',
  headers: {
    authorization: idKey,
    'Content-Type': 'application/json',
  }
}
function checkRes(res) {
  if (res.ok) {
    return res.json();
  }else{
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }
}
function getFetchCards() {
  return fetch(`${myConfig.adress}/cards`, {
    headers: myConfig.headers
  })
}
function getFetchUser() {
  return fetch(`${myConfig.adress}/users/me`, {
    headers: myConfig.headers
  })
}
function patchUserName(user){
  return fetch(`${myConfig.adress}/users/me`, {
    method: 'PATCH',
    headers: myConfig.headers,
    body: JSON.stringify({
      name: user.name,
      about: user.about,
    })
  })
}
function putchAvatar(user) {
  return fetch(`${myConfig.adress}/users/me/avatar`, {
    method: 'PATCH',
    headers: myConfig.headers,
    body: JSON.stringify({
      avatar: user.avatar,
    })
  })
}

function getNewCard(card) {
  return fetch(`${myConfig.adress}/cards`, {
    method: 'POST',
    headers: myConfig.headers,
    body: JSON.stringify({
      name: card.name,
      link: card.image,
    }),
  })
}
function likeCard(cardId) {
  return fetch(`${myConfig.adress}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: myConfig.headers,
})
} 
function deleteLikeCard(cardId) {
  return fetch(`${myConfig.adress}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: myConfig.headers,
})
} 

function deleteCard(cardId) {
  return fetch(`${myConfig.adress}/cards/${cardId}`, {
    method: 'DELETE',
    headers: myConfig.headers,
})
}



function postNewCard(card){
  getNewCard(card)
    .then((res) => checkRes(res))
    .then((data) => {
      //console.log(data) 
    })
    .catch(() => {
      console.log(`Что то не так c postNewCard${(card)}`)
    })
}

function requestUser() {
  getFetchUser()
  .then((res) => checkRes(res))
  .then((user) => {
    //console.log(user._id)
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
    .then((res) => checkRes(res))
    .then((res) => { 
      namePlaceholder.textContent = user.name; //новое значение
      jobPlaceholder.textContent = user.about;   //новое значение
    })
    .catch(() => {
      console.log(`Что то не так c updateUserName${(user)}`)
    })
}

function updateAvatar(user) {
  putchAvatar(user)
    .then((res) => checkRes(res))
    .then((res) => { 
      userAvatar.src = user.avatar
    })
    .catch(() => {
      console.log(`Что то не так c updateAvatar${(user)}`)
    })
}

function requestCards() {
  getFetchCards()
    .then((res) => checkRes(res))
    .then((res) => { 
      res.forEach((data) => { 
        //console.log(data.likes.length)
        const firstOrder = false;
        const card = createCard(data.name, data.link, data.likes, data._id, data.owner)

        if (data.owner._id !== myId) {
          card.children[1].hidden = true
        }
        addCard(card, firstOrder)
        //console.dir(card.children[1].hidden)
      })
    })
    .catch(() => {
      console.log('Что то не так c requestCards')
    })
}

requestUser()
requestCards()

export {updateUserName, updateAvatar, postNewCard, deleteCard, likeCard, deleteLikeCard, checkRes, myId}

