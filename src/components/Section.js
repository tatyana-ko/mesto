export default class Section {
  constructor({renderer} , containerSelector) {
    this._renderer = renderer; //renderer - функция, которая отвечает за создание и отрисовку данных на странице
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.forEach(item => this._renderer(item));
  }// метод, который отвечает за отрисовку всех элементов

  addItem(element) {
    this._container.prepend(element);
  } // метод, который принимает DOM-элемент и добавляет его в контейнер
}