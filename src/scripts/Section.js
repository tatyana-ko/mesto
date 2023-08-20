export default class Section {
  constructor({items, renderer} , containerSelector) {
    this._items = items; //items - массив данных, которые нужно добавить на страницу при инициализации класса
    this._renderer = renderer; //renderer - функция, которая отвечает за создание и отрисовку данных на странице
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach(item => this._renderer(item));
  }// метод, который отвечает за отрисовку всех элементов

  addItem(element) {
    this._container.prepend(element);
  } // метод, который принимает DOM-элемент и добавляет его в контейнер
}