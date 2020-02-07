import Popup from "../modules/Popup";

class PopupImage extends Popup {
    constructor(container) {
        super(container);
    }

    open(e) {
        if (e.target.classList.contains('place-card__image')) {
            this.container.classList.add('popup_is-opened');
            this.container.querySelector('.popup__picture').setAttribute(`src`,
                `${e.target.style.backgroundImage.slice(5, -2)}`
            );
        }
    }

    close(e) {
        if (e.target.classList.contains('popup__close')) {
            this.container.classList.remove('popup_is-opened');
          }
    }
}

export {PopupImage};