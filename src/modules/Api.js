
export default class Api {
    
    constructor({address, token, groupId}) {
        this.address = address;
        this.token = token;
        this.groupId = groupId;
    }

    // получает информацию о пользователе с сервера и вставляет полученную инф на страницу
    getInfo() {
        return fetch(`${this.address}/${this.groupId}/users/me`, {
            headers: {
                authorization: this.token
            }
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
          })
        .catch((err) => {
            window.alert(`Не удалось загрузить! ${err}`);
        })
    }


    // запрашивает с сервера инф о всех карточках и загружает их на страницу
    getCards() {
        return fetch(`${this.address}/${this.groupId}/cards`, {
            headers: {
                authorization: this.token
            }
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
          })
        .catch((err) => {
            window.alert(`Не удалось загрузить! ${err}`);
        })
    }

    // добавляет карточку на сервер  (=> вызван в PopupAddCard.js)
    addCardOnServer({name, link}) {
        return fetch(`${this.address}/${this.groupId}/cards`, {
            method: 'POST',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name.value,
                link: link.value
            })
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
          })
        .catch((err) => {
            window.alert(`Сохранение не выполнено! ${err}`);
        })
        .finally(() => {
            
            renderLoadingAddCard(false);
        })
    }


    // сохраняет информацию о пользователе на сервере (=> вызван в PopupEdit.js)
    saveUserInfo({name, about}) {
        return fetch(`${this.address}/${this.groupId}/users/me`, {
            method: 'PATCH',
            headers: {
              authorization: this.token,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              name: name.value,
              about: about.value
          })
        })
        .then(res => {
            if (res.ok) {
              return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`);
          })
        .catch((err) => {
            window.alert(`Сохранение не выполнено! ${err}`);
        })
        .finally(() => {
            
            renderLoadingEdit(false);
        })
    }

    // сохраняет новый аватар пользователя на сервере (=> вызван в PopupEditUserpic.js)
    saveNewUserpic(link) {
        return fetch(`${this.address}/${this.groupId}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: link.value
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json()
              }
              return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            window.alert(`Сохранение не выполнено! ${err}`);
        })
        .finally(() => {
            
            renderLoadingUserpic(false);
        })
    }

    // удаляет карточку с сервера (не доделано)
    deleteCard(cardId) {
        return fetch(`${this.address}/${this.groupId}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this.token
            },
        })
        .then(res => {
            if (res.ok) {
                return res.json()
              }
              return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            window.alert(`Удаление не выполнено! ${err}`);
        })
    }
}
