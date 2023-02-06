import 'core-js/stable'; // poliffiling every thing
import 'regenerator-runtime/runtime'; // poliffiling Async await
import * as model from './model.js';
import paginationView from './views/paginationView.js';
import recipeView from './views/recipeView.js';
import RecipeView from './views/recipeView.js';
import searchResultView from './views/searchResultView.js';
import searchView from './views/searchView.js';
import '../js/views/bookmarkView.js';
import bookmarkView from '../js/views/bookmarkView.js';
import BookmarkView from '../js/views/bookmarkView.js';
import { async } from 'regenerator-runtime';
import addRecipeView from './views/addRecipeView.js';
// import { MODAL_CLOSE_SEC } from './config.js';
//forkify-api.herokuapp.com/v2
https: if (module.hot) {
  module.hot.accept();
}
///////////////////////////////////////
/**
 * 
 */
async function controlRecipe() {
  try {
    //Getting the hash
    const id = window.location.hash.slice(1);
    // Rendering the loading spinner
    recipeView.renderSpinner();
    // 0 Udaptes search results
    searchResultView.update(model.LoadResultperPage());
    bookmarkView.render(model.state.bookmarks);
    // 1) Loading Recipe
    await model.loadRecipe(id);
    // 2) Rendering Recipe
    RecipeView.render(model.state.recipe);
    // 3) Handling servings events
    // recipeView.addHandlerServings(servingsControl);
  } catch (err) {
    console.error(err)
    recipeView.renderError();
  }
}

async function controlSearchResult() {
  try {
    // getting the query
    const query = searchView.getQuery();
    if (!query) return;
    // rendering the spinner
    searchResultView.renderSpinner();
    // Loading the data
    await model.loadQueryResult(query);
    // Render Search result
    // searchResultView.render(model.state.search.result);
    searchResultView.render(model.LoadResultperPage());
    // Render INITIAL pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
    searchResultView.renderError();
  }
}
function paginationControl(goToPage) {
  // Render NEW RESULT
  searchResultView.render(model.LoadResultperPage(goToPage));
  // Render NEW pagination
  paginationView.render(model.state.search);
}

function servingsControl(newServings) {
  // Updating recipe
  model.updateServings(newServings);
  // Rendering Recipe with servings updated
  recipeView.update(model.state.recipe);
}

function bookMarkControl() {
  // debugger
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  recipeView.render(model.state.recipe);
  bookmarkView.render(model.state.bookmarks);
}

function ControlBookmarkLoading() {
  bookmarkView.render(model.state.bookmarks);
}

async function controlAddrecipe(newRecipe) {
  try {
    //Function that will upload the recipe
    await model.uploadNewRecipe(newRecipe);
    addRecipeView.renderSpinner();
    addRecipeView.renderMessage();
    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, 2.5 * 1000);

    recipeView.render(model.state.recipe);
    window.history.pushState(null,'',`#${model.state.recipe.id}`)
    model.addBookmark(model.state.recipe);
    bookmarkView.render(model.state.bookmarks);

  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err);
  }
}
// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
//MVC ARCHITECTURE PUBLIC AND SUBCRIBER PATTERN: SUBSCRIBER
function init() {
  bookmarkView.addHandlerLoadBookmark(ControlBookmarkLoading);
  recipeView.addHandlerRender(controlRecipe);
  searchView.addhandlerSearch(controlSearchResult);
  paginationView.addhandlerClick(paginationControl);
  recipeView.addHandlerServings(servingsControl);
  recipeView.addHandlerbookmark(bookMarkControl);
  addRecipeView._addhandlerUploadRecipe(controlAddrecipe);
  // bookmarkView.addHandelerHover(controlBookmarkView);
  // bookmarkView.afterLoaded(controlAfterLoaded);
}
init();
