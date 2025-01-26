import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk'; 
import recipesReducer from './reducers/recipesReducer';
import favoritesReducer from './reducers/favoritesReducer';
import filtersReducer from './reducers/filtersReducer';

const rootReducer = combineReducers({
  recipes: recipesReducer || (() => ({})),
  favorites: favoritesReducer || (() => ({})),
  filters: filtersReducer || (() => ({})),
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
