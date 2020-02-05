
const root = document.querySelector('.root');


const errorMessage = { ru: {
  emptyInput: 'Это обязательное поле',
  wrongLength: 'Должно быть от 2 до 30 символов',
  wrongType: 'Здесь должна быть ссылка',
  correctInput: ''
  }
};


const card = new Card();

const cardList = new CardList(document.querySelector('.places-list'), card);  // контейнер с карточками

const validation = new Validation(errorMessage.ru);

const popupAddCard = new PopupAddCard(document.querySelector('.popup_type_place'), validation, cardList);
const popupEdit = new PopupEdit(document.querySelector('.popup_type_edit'), validation);
const popupImage = new PopupImage(document.querySelector('.popup_type_picture'));

const popupEditUserpic = new PopupEditUserpic(document.querySelector('.popup_type_edit-userpic'), validation);


const api = new Api({
  address: 'http://95.216.175.5',
  groupId: `cohort6`,
  token: `730bf123-865a-4e15-9fe2-146cc3f3cc14`,
});

// вставляет инф о пользователе с сервера на страницу
api.getInfo()
  .then((result) => {
    document.querySelector('.user-info__name').textContent = result.name;
    document.querySelector('.user-info__job').textContent = result.about;
    document.querySelector('.user-info__photo').setAttribute('style', `background-image: url(${result.avatar})`);
  });

// загружает карточки с сервера на страницу
api.getCards()
  .then((result) => {
    console.log(result.length);
    cardList.render(result);

  });



// слушатели событий

root.addEventListener('click', e => {
  popupEdit.open(e);
  popupEdit.close(e);

  popupImage.open(e);
  popupImage.close(e);

  popupAddCard.open(e);
  popupAddCard.close(e);

  popupEditUserpic.open(e);
  popupEditUserpic.close(e);

})


cardList.container.addEventListener('click', e => {
  card.like(e);
  card.remove(e);
});


// валидация формы Изменить профиль
popupEdit.form.addEventListener('input', e => {
  popupEdit.validation.isValid(e);
});
popupEdit.form.addEventListener('submit', e => {
  popupEdit.submit(e);
});


// валидация формы Добавить карточку
popupAddCard.form.addEventListener('input', e => {
  popupAddCard.validation.isValid(e);
});
popupAddCard.form.addEventListener('submit', e => {
  popupAddCard.submit(e);
});

// валидация формы Изменить Юзерпик
popupEditUserpic.form.addEventListener('input', e => {
  popupEditUserpic.validation.isValid(e);
});
popupEditUserpic.form.addEventListener('submit', e => {
  popupEditUserpic.submit(e);
})



// отображает загрузку при изменении профиля
function renderLoadingEdit(isLoading) {
  if (isLoading) {
    document.querySelector('.popup__button_edit').textContent = 'Загрузка...'
  } else {
    document.querySelector('.popup__button_edit').textContent = 'Сохранить'
  }
}

// отображает загрузку при добавлении карточки
function renderLoadingAddCard(isLoading) {
  if (isLoading) {
    document.querySelector('.popup__button_add').textContent = 'Загрузка...'
  } else {
    document.querySelector('.popup__button_add').textContent = '+'
  }
}

// отображает загрузку при изменении аватара
function renderLoadingUserpic(isLoading) {
  if (isLoading) {
    document.querySelector('.popup__button_edit-userpic').textContent = 'Загрузка...'
  } else {
    document.querySelector('.popup__button_edit-userpic').textContent = 'Сохранить'
  }
}

