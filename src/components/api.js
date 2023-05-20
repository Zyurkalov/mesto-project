
const idKey = '237968ee-75dc-4a1c-917f-d4a72dcf6d28'
//const myId = '462e4876dc9bbf55564f6ab8'

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
  } else {
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }
}

function requestUser() {
  return fetch(`${myConfig.adress}/users/me`, {
    headers: myConfig.headers
  })
}

function requestCards() {
  return fetch(`${myConfig.adress}/cards`, {
    headers: myConfig.headers
  })
}

function patchUserName(user) {
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


/*
function request(url, options) {
  return fetch(url, options).then(checkRes())
}

function requestCards() {
  return request(`${myConfig.adress}/cards`, {headers: myConfig.headers})
}


function requestUser() {
  return fetch(`${myConfig.adress}/users/me`, {
    headers: myConfig.headers
  })
}
*/
/*
  getNewCard(card)
    .then((res) => checkRes(res))
    .then((data) => {
      //console.log(data) 
    })

requestUser()
  .then((res) => checkRes(res))
  .then((user) => {
    //console.log(user._id)
    namePlaceholder.textContent = user.name; //новое значение
    jobPlaceholder.textContent = user.about;   //новое значение
    userAvatar.src = user.avatar
  })

  patchUserName(user)
    .then((res) => checkRes(res))
    .then((res) => { 
      namePlaceholder.textContent = user.name; //новое значение
      jobPlaceholder.textContent = user.about;   //новое значение
    })

  putchAvatar(user)
    .then((res) => checkRes(res))
    .then((res) => { 
      userAvatar.src = user.avatar
    })

  requestCards()
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

    /*
requestUser()
.then((res) => checkRes(res))
  .then((user) => {
    //console.log(user._id)
    namePlaceholder.textContent = user.name; //новое значение
    jobPlaceholder.textContent = user.about;   //новое значение
    userAvatar.src = user.avatar
  })
  
*/
export {
  deleteCard, likeCard, deleteLikeCard,
  checkRes, putchAvatar, patchUserName, getNewCard, requestUser, requestCards
}

