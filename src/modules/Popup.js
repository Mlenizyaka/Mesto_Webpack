
export default class Popup {
    constructor(container) {
        this.container = container;
        this.button = this.container.querySelector('button');
        this.form = this.container.querySelector('form');
    }

    deactivateButton() {
        this.button.setAttribute('disabled', true);
        this.button.classList.remove('popup__button_active');
      }
    
    activateButton() {
        this.button.removeAttribute('disabled');
        this.button.classList.add('popup__button_active');
      }

      removeErrors() {
        this.form.querySelectorAll(".error-message").forEach(error => {
          error.textContent = "";
        });
      }
}












