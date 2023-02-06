import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';
import { View } from './View.js';
class SearchResultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipe find for your query.Please try again';
  _message = '';
  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false));
  }
}

export default new SearchResultView();
