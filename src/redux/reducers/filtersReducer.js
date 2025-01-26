

const initialState = {
    searchQuery: '', 
    category: 'All', 
  };
  
  const filtersReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_SEARCH_QUERY':
  
        return {
          ...state,
          searchQuery: action.payload,
        };
  
      case 'SET_CATEGORY_FILTER':

        return {
          ...state,
          category: action.payload,
        };
  
      case 'CLEAR_FILTERS':

        return initialState;
  
      default:
        return state;
    }
  };
  
  export default filtersReducer;
  