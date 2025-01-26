const initialState = {
    favorites: [],
  };
  
  const favoritesReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_FAVORITES':
        
        if (!state.favorites.some((recipe) => recipe.label === action.payload.label)) {
      
          return {
            ...state,
            favorites: [...state.favorites, action.payload],
          };
        }
        return state; 
  
      case 'REMOVE_FROM_FAVORITES':
        
        return {
          ...state,
          favorites: state.favorites.filter((recipe) => recipe.label !== action.payload),
        };
  
      case 'CLEAR_FAVORITES':

        return {
          ...state,
          favorites: [],
        };
  
      default:
        return state;
    }
  };
  
  export default favoritesReducer;
  