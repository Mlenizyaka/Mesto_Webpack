export default class Validation {
    constructor(errorMessage) {
        this.errorMessage = errorMessage;
    }

    //поле пустое?
    isInputEmpty(e, ...inputs) {

        if (e.target.value.length === 0) {
            inputs.forEach(input => {
              if (e.target.name === input.name) {
                document.querySelector(`#${input.name}`).textContent = this.errorMessage.emptyInput;
              }
            });
          }
    }

    // длина поля достаточна?
    isLengthValid(e, ...inputs) {
        if (e.target.value.length < 3 || e.target.value.length > 30) {
            inputs.forEach(input => {
              if (e.target.name === input.name) {
                document.querySelector(`#${input.name}`).textContent = this.errorMessage.wrongLength;
              }
            });
          }
    }

    // тип указан верно?
    isTypeValid(e, ...inputs) {
      if (!e.target.validity.valid && e.target.value.length === 0) {
        inputs.forEach(input => {
          if (e.target.name === input.name) {
            document.querySelector(
              `#${input.name}`
            ).textContent = this.errorMessage.emptyInput;
          }
        });
      } else if (!e.target.validity.valid && e.target.name === 'link') {
            inputs.forEach(input => {
              if (e.target.name === input.name) {
                document.querySelector(`#${input.name}`).textContent = this.errorMessage.wrongType;
              }
            });
        }
    }

    // поле корректно?
    isInputCorrect(e, ...inputs) {
        if (e.target.validity.valid) {
          inputs.forEach(input => {
            if (e.target.name === input.name) {
              document.querySelector(
                `#${input.name}`
              ).textContent = this.errorMessage.correctInput;
            }
          });
        }
      }

    removeErrorMessage(e) {
        e.currentTarget.querySelectorAll('.error-message').forEach(error => {
            error.textContent = '';
          });
    }

    activateButton(e) {
        const button = e.currentTarget.querySelector('button');
        button.removeAttribute('disabled');
        button.classList.add('popup__button_active');
    }

    deactivateButton(e) {
        const button = e.currentTarget.querySelector('button');
        button.setAttribute('disabled', true);
        button.classList.remove('popup__button_active');
    }

    // валидно по всем признакам?
    isValid(e) {
        const [name, link] = e.currentTarget.elements;

        if (!name.validity.valid || !link.validity.valid) {
            this.isInputEmpty(e, name, link);
            this.isLengthValid(e, name, link);
            this.isTypeValid(e, name, link);
            this.isInputCorrect(e, name, link);
            this.deactivateButton(e);
          } else {
            this.removeErrorMessage(e);
            this.activateButton(e);
          }
    }
}