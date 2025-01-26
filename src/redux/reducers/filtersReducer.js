// reducers/filtersReducer.js

const initialState = {
    searchQuery: '', // Stores the search input
    category: 'All', // Default category filter
  };
  
  const filtersReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_SEARCH_QUERY':
        // Update the search query
        return {
          ...state,
          searchQuery: action.payload,
        };
  
      case 'SET_CATEGORY_FILTER':
        // Update the category filter
        return {
          ...state,
          category: action.payload,
        };
  
      case 'CLEAR_FILTERS':
        // Reset filters to their initial state
        return initialState;
  
      default:
        return state;
    }
  };
  
  export default filtersReducer;
  