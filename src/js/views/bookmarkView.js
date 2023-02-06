import { mark } from 'regenerator-runtime';
import { View } from './View.js';
import PreviewView from './previewView.js';
import previewView from './previewView.js';
class BookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'There is no recipe yet, please find a nice recipe and bookmarked it well';
  _message = 'Your recipe bookmarked successffully';
  _generateMarkup() {
    // debugger
    if (this._data.length === 0) return 'There is no bookmark';
    const markUp = this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
    return markUp;
  }
  
  addHandlerLoadBookmark(handler) {
    window.addEventListener('load', handler);
  }
  
}
export default new BookmarkView();
