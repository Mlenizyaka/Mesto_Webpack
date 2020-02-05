class CardList {
  constructor(container, cardElement) {
    this.container = container;
    this.cardElement = cardElement;
  }

  addCard(name, link) {     //для добавления карточки в список

    const card = this.cardElement.template(name, link);
    this.container.insertAdjacentHTML('beforeend', card);

  }


  render(arr) {   //для отрисовки карточек при загрузке страницы
    for (let item of arr) {
      this.addCard(item.name, item.link);
    }
  }

} 