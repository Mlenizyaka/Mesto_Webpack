
class PopupEdit extends Popup {
    constructor(container, validation) {
      super(container);
      this.validation = validation;
    }

    open(e) {
        if (e.target.classList.contains('user-info__edit-button')) {
            this.container.classList.add('popup_is-opened');

            const [name, job] = this.form.elements;

            name.value = document.querySelector('.user-info__name').textContent;
            job.value = document.querySelector('.user-info__job').textContent;

            this.activateButton();    // кнопка активна, тк поля автозаполнены
           // this.removeErrors();
        }
    }

    close(e) {
        if (e.target.classList.contains('popup__close')) {
            this.container.classList.remove('popup_is-opened');
          }
        }


    submit(e) {
      e.preventDefault();

      const [name, about] = this.form.elements;

      renderLoadingEdit(true);
      api.saveUserInfo({name, about})
        .then((result) => {

          document.querySelector('.user-info__name').textContent = result.name;
          document.querySelector('.user-info__job').textContent = result.about;

          this.container.classList.remove('popup_is-opened');
        });


    }

  }



