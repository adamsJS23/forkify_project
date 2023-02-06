import { View } from './View.js';
import { icons } from '../../img/icons.svg';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _overlay = document.querySelector('.overlay');
  _window = document.querySelector('.add-recipe-window');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _message='Your new recipe uploaded successfully';
  constructor() {
    super();
    this._displayAddRecipeView();
    this._hideAddRecipeView();
  }
  toggleWindow() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }
  _displayAddRecipeView() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }
  _hideAddRecipeView() {
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
  }
  _addhandlerUploadRecipe(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataEntries = [...new FormData(this)];
      const data = Object.fromEntries(dataEntries);
      handler(data);
    });
  }
}

export default new AddRecipeView();
