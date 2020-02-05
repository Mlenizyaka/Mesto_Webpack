class Card {
    constructor() {
      
    }
  
    template(name, link) {
  
      return `
          <div class="place-card">
            <div class="place-card__image" style="background-image: url(${link});">
              <button class="place-card__delete-icon"></button>
            </div>
            <div class="place-card__description">
              <h3 class="place-card__name">${name}</h3>
              <button class="place-card__like-icon"></button>
            </div>
          </div>`;
    }
  
  
    remove(e) {
        if (e.target.classList.contains('place-card__delete-icon')) {
            e.target.closest('.place-card').remove();
        }
    }

    like(e) {
        if (e.target.classList.contains('place-card__like-icon')) {
            event.target.classList.toggle('place-card__like-icon_liked');
        }
    }
  }