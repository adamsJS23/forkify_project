import icons from 'url:../../img/icons.svg'
class SearchResultView {
  _ParenEl=document.querySelector('.search-results');
  _data;
  
  displaySearchResult(data){
    this._data=data;
    this._clear();
    this._generateMarkUp()

  }
  _clear(){
    this._ParenEl.querySelector('.results').innerHTML='';
  }
  _generateMarkUp() {
    this._data.forEach(recipe=>{
      const markUp = `<li class="preview">
              <a class="preview__link preview__link--active" href="#${recipe.id}">
                <figure class="preview__fig">
                  <img src="${recipe.imageUrl}" />
                </figure>
                <div class="preview__data">
                  <h4 class="preview__title">${recipe.title}</h4>
                  <p class="preview__publisher">${recipe.publisher}</p>
                  <div class="preview__user-generated">
                    <svg>
                      <use href="${icons}#icon-user"></use>
                    </svg>
                  </div>
                </div>
              </a>
          </li>`;
          this._ParenEl.querySelector('.results').insertAdjacentHTML('afterbegin',markUp)
    })
    this._previousNotActive()
  }

  _previousNotActive(){
    const previewLinks=document.querySelectorAll('.preview__link')
    previewLinks.forEach(link=>link.classList.remove('preview__link--active'))
  }
}

export default new SearchResultView();

if (state.search.result.length >= RESULT_PER_VIEW) {
  const resultPerPage=state.search.result.map(recipe => {
    return i >= currPage * 10 && i < currPage + 1 * (10 - 1);
  });
  console.log(resultPerPage)
  // const resultNumber = state.search.result.length;
  // console.log('Result Number', resultNumber);
  // const pageNumber = Math.ceil(resultNumber / RESULT_PER_VIEW);
  // console.log('PageNumber', pageNumber);
  // let firstPage = 1;
  // let lastPage = pageNumber;
  // let currPage = 0;
  // currPage = 0;
  // let resultPerPage = state.search.result.filter((result, i, arr) => {
  //   return i >= currPage * 10 && i < currPage + 1 * (10 - 1);
  // });
  // console.log(resultPerPage);
  // currPage = 1;
  // resultPerPage = state.search.result.filter((result, i, arr) => {
  //   return i >= currPage * 10 && i < currPage + 1 * (10 - 1);
  // });
  // console.log(resultPerPage);
  // console.log(state.search.result)
  // startIdx = endIdx - 1;
  // endIdx = 13;
}
// End implementatoin