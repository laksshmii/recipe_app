import axios from 'axios';

const API_URL = 'https://api.edamam.com/search';
const APP_ID = 'a5de3521';
const APP_KEY = '28f8a20bd893e2740e68d4bbb349b977';
const API_URL1 = 'https://api.edamam.com/api/recipes/v2';
// Existing fetchRecipes action
export const fetchRecipes = (query) => async (dispatch) => {
    dispatch({ type: 'SET_LOADING' }); // Set loading to true

    try {
        const response = await axios.get(`${API_URL}?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=50`);
        dispatch({ type: 'SET_RECIPES', payload: response.data.hits });
    } catch (error) {
        console.error('Error fetching recipes:', error);
        dispatch({ type: 'SET_LOADING', isLoading: false }); // In case of an error, stop loading
    }
};

// New filterSearch action
export const filterSearch = (filters) => async (dispatch) => {
    dispatch({ type: 'SET_LOADING' });
  
    try {
      const params = new URLSearchParams();
      params.append('app_id', APP_ID);
      params.append('app_key', APP_KEY);
      params.append('type', 'public');  // Add 'type=public' to the query parameters
  
      // Add query parameters
      if (filters.query) params.append('q', filters.query);
  
      // Add calorie filters
      if (filters.caloriesFrom || filters.caloriesTo) {
        params.append('calories', `${filters.caloriesFrom || 0}-${filters.caloriesTo || 9999}`);
      }
  
      // Convert diet keys to the API format (e.g., 'highFiber' -> 'high-fiber') and append multiple diet filters
      Object.keys(filters.diet).forEach((key) => {
        const newKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();  // Convert camelCase to kebab-case
        if (filters.diet[key]) {
          params.append('diet', newKey);  // Append each selected diet filter as a separate 'diet' parameter
        }
      });
  
      Object.keys(filters.allergies).forEach((key) => {
        const newKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();  // Convert camelCase to kebab-case
        if (filters.allergies[key]) {
          params.append('health', newKey);  // Append each selected allergy filter as a separate 'health' parameter
        }
      });
      // Make the API call with the properly formatted params
      const response = await axios.get(`${API_URL1}?${params.toString()}`);
  
      const recipes = response.data.hits || [];
  
      if (recipes.length === 0) {
        console.warn('No recipes found with the applied filters.');
      }
  
      dispatch({ type: 'SET_RECIPES', payload: recipes });
    } catch (error) {
      console.error('Error applying filters:', error);
      dispatch({ type: 'SET_LOADING', isLoading: false });
    }
  };
  
  


