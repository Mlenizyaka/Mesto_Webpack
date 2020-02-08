import Popup from "../modules/Popup";
import {api} from "../index";


class PopupAddCard extends Popup {
    constructor(container, validation, cardList) {
      super(container);
      this.validation = validation;
      this.cardList = cardList;
    }

    open(e) {
        if (e.target.classList.contains('user-info__button')) {
            this.container.classList.add('popup_is-opened');

            this.deactivateButton();
            this.form.reset();
            this.removeErrors();
          }
    }

    close(e) {
        if (e.target.classList.contains('popup__close')) {
            this.container.classList.remove('popup_is-opened');
          }
    }


    submit(e) {
      e.preventDefault();

      const [name, link] = this.form.elements;
      renderLoadingAddCard(true);

        api.addCardOnServer({name, link})
          .then((result) => {
            this.cardList.addCard(result.name, result.link);
            this.container.classList.remove('popup_is-opened');
          })


    }
  }

   // отображает загрузку при добавлении карточки
export function renderLoadingAddCard(isLoading) {
  if (isLoading) {
    document.querySelector('.popup__button_add').textContent = 'Загрузка...'
  } else {
    document.querySelector('.popup__button_add').textContent = '+'
  }
} 

export {PopupAddCard}; 

