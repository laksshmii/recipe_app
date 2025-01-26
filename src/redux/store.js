import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk'; // Import 'thunk' as a named export
import recipesReducer from './reducers/recipesReducer';
import favoritesReducer from './reducers/favoritesReducer';
import filtersReducer from './reducers/filtersReducer';

// Ensure all reducers are valid functions
const rootReducer = combineReducers({
  recipes: recipesReducer || (() => ({})),
  favorites: favoritesReducer || (() => ({})),
  filters: filtersReducer || (() => ({})),
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
