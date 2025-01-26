const initialState = {
    favorites: [], // Array to store favorite recipes
  };
  
  const favoritesReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_FAVORITES':
        // Check if the recipe is already in the favorites list
        if (!state.favorites.some((recipe) => recipe.label === action.payload.label)) {
          // Add the recipe only if it's not already in the list
          return {
            ...state,
            favorites: [...state.favorites, action.payload],
          };
        }
        return state; // Return the state as is if already in favorites
  
      case 'REMOVE_FROM_FAVORITES':
        // Remove the recipe from the favorites by its ID
        return {
          ...state,
          favorites: state.favorites.filter((recipe) => recipe.label !== action.payload),
        };
  
      case 'CLEAR_FAVORITES':
        // Clear the entire favorites list
        return {
          ...state,
          favorites: [],
        };
  
      default:
        return state;
    }
  };
  
  export default favoritesReducer;
  