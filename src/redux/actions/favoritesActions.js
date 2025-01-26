export const addToFavorites = (recipe) => ({
    type: 'ADD_TO_FAVORITES',
    payload: recipe,
  });
  
  export const removeFromFavorites = (recipeId) => ({
    type: 'REMOVE_FROM_FAVORITES',
    payload: recipeId,
  });
  