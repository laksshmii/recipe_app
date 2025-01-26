

const initialState = {
    recipes: [], 
    isLoading: false, 
  };
  
  const recipesReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_RECIPES':
        return { ...state, recipes: action.payload, isLoading: false };
  
      case 'SET_LOADING':
        return { ...state, isLoading: true };
  
      case 'ADD_RECIPE':
        return { ...state, recipes: [...state.recipes, action.payload] };
  
      case 'REMOVE_RECIPE':
        return {
          ...state,
          recipes: state.recipes.filter((recipe) => recipe.id !== action.payload),
        };
  
      case 'CLEAR_RECIPES':
        return { ...state, recipes: [] };
  
      default:
        return state;
    }
  };
  
  export default recipesReducer;
  