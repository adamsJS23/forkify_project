// import { format } from 'core-js/core/date';
import { API_KEY, API_URL, API_URL_QUERY, RESULT_PER_VIEW } from './config.js';
import { ajax } from './helper.js';
export const state = {
  recipe: {},
  search: {
    queries: [],
    result: [],
    page: 1,
    resultParPage: RESULT_PER_VIEW,
  },
  bookmarks: [],
};

export async function loadRecipe(id) {
  try {
    if (!id) throw new Error('there is no recipe');
    const data = await ajax(`${API_URL}${id}`);
    state.recipe = formatRecipe(data);
    // debugger
    if (state.bookmarks.length === 0) return;
    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
    console.log(state.recipe);
  } catch (err) {
    throw err;
  }
}

function formatRecipe(data) {
  let { recipe } = data.data;

  return {
    id: recipe.id,
    cookingTime: recipe.cooking_time,
    title: recipe.title,
    sourceUrl: recipe.source_url,
    servings: recipe.servings,
    publisher: recipe.publisher,
    imageUrl: recipe.image_url,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
}
//'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
//https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza&key=<insert your key>
export async function loadQueryResult(query) {
  try {
    const data = await ajax(`${API_URL_QUERY}${query}&key=${API_KEY}`);

    state.search.queries.push(query);

    state.search.result = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        imageUrl: recipe.image_url,
        publisher: recipe.publisher,
        ...(recipe.key && { key: recipe.key }),
      };
    });
  } catch (err) {
    throw err;
  } finally {
    state.search.page = 1;
  }
}

export function LoadResultperPage(page = 1) {
  state.search.page = page;
  state.search.pageNumber = Math.ceil(
    state.search.result.length / state.search.resultParPage
  );
  const start = (page - 1) * state.search.resultParPage;
  const end = page * state.search.resultParPage;

  return state.search.result.slice(start, end);
}
export function updateServings(newServings) {
  state.recipe.ingredients.forEach(ingredient => {
    if (ingredient.quantity) {
      ingredient.quantity =
        (ingredient.quantity * newServings) / state.recipe.servings;
    }
  });
  state.recipe.servings = newServings;
}

export async function addBookmark(recipe) {
  console.log('New bookmark added');
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) recipe.bookmarked = true;
  bookmarkPersist();
}

export function deleteBookmark(id) {
  const idx = state.bookmarks.findIndex(idx => idx === id);
  state.bookmarks.splice(idx, 1);
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  bookmarkPersist();
}

export async function uploadNewRecipe(newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ingr => {
        const ingrArr = ingr[1].split(',');
        if (ingrArr.length !== 3)
          throw new Error('Wrong ingredient, please use the correct format!');
        const [quantity, unit, description] = ingrArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };``

    const data = await ajax(`${API_URL}?key=${API_KEY}`, recipe);

    state.recipe = formatRecipe(data);
    console.log(state.recipe);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

function bookmarkPersist() {
  if (!state.bookmarks) return;
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}
function clearBookmarks() {
  localStorage.clear('bookmarks');
}
// clearBookmarks();

function greeting(){
  console.log('Morning')
}
function init() {
  const data = JSON.parse(localStorage.getItem('bookmarks'));
  if (!data) return;
  state.bookmarks = data;
  console.log(state.bookmarks);
  greeting();
  console.log('Morning again');
}
init();
