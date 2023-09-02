export default class UserInfo {
  constructor({ nameElement, aboutElement, avatarElement }) {
    this._name = document.querySelector(nameElement);
    this._about = document.querySelector(aboutElement);
    this._avatar = document.querySelector(avatarElement);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src,
    };
  } //метод, который возвращает объект с данными пользователя

  setUserInfo({ name, about, avatar }) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.src = avatar;
  } //метод, который принимает новые данные пользователя и добавляет их на страницу.
}
