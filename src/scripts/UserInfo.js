export default class UserInfo {
  constructor({ nameElement, aboutElement }) {
    this._name = document.querySelector(nameElement);
    this._about = document.querySelector(aboutElement);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
    };
  } //метод, который возвращает объект с данными пользователя

  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._about.textContent = about;
  } //метод, который принимает новые данные пользователя и добавляет их на страницу.
}
