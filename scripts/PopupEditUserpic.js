
class PopupEditUserpic extends Popup {
    constructor(container, validation) {
      super(container);
      this.validation = validation;
    }

    open(e) {
      if (e.target.classList.contains('user-info__photo')) {
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
      const [link] = this.form.elements;
      
      renderLoadingUserpic(true);
      api.saveNewUserpic(link)
        .then(res => {
          console.log(res);
          document.querySelector('.user-info__photo').setAttribute('style', `background-image: url(${res.avatar})`);
          this.container.classList.remove('popup_is-opened');
        })
      
    }
  }