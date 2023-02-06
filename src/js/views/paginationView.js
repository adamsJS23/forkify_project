import { View } from './View';
import icons from '../../img/icons.svg';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _generateMarkup(data) {
    const page = this._data.page;
    const pageNumber = this._data.pageNumber;
    if (page === 1 && pageNumber > 1)
      return `<button data-page="${
        page + 1
      }" class="btn--inline pagination__btn--next">
              <span>Page ${page + 1}</span>
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
              </svg>
            </button>`;
    if (page === pageNumber && pageNumber > 1)
      return `<button data-page="${
        page - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${page - 1}</span>
          </button>`;

    if (page > 1 && pageNumber > 1)
      return `<button data-page="${
        page + 1
      }" class="btn--inline pagination__btn--next">
                        <span>Page ${page + 1}</span>
                        <svg class="search__icon">
                          <use href="${icons}#icon-arrow-right"></use>
                        </svg>
                      </button>
              <button data-page="${
                page - 1
              }" class="btn--inline pagination__btn--prev">
                  <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                  </svg>
                  <span>Page ${page - 1}</span>
              </button>`;
    return '';
  }
  addhandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.page;
      handler(goToPage);
    });
  }
}

export default new PaginationView();
