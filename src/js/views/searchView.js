// import { search } from "core-js/fn/symbol";

class SearchView {
  #parentEl = document.querySelector('.search');
  // #searchButton = document.querySelector('.search__btn');

  getQuery() {
    const query=this.#parentEl.querySelector('.search__field').value;
    this.#clearSearchField()
    return query;
  }
  #clearSearchField() {
    this.#parentEl.querySelector('.search__field').value = '';
  }
  addhandlerSearch(handler) {
    this.#parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
