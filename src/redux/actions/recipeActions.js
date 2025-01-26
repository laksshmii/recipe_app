import axios from 'axios';

const API_URL = 'https://api.edamam.com/search';
const APP_ID = 'a5de3521';
const APP_KEY = '28f8a20bd893e2740e68d4bbb349b977';
const API_URL1 = 'https://api.edamam.com/api/recipes/v2';

export const fetchRecipes = (query) => async (dispatch) => {
    dispatch({ type: 'SET_LOADING' }); 

    try {
        const response = await axios.get(`${API_URL}?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=50`);
        dispatch({ type: 'SET_RECIPES', payload: response.data.hits });
    } catch (error) {
        console.error('Error fetching recipes:', error);
        dispatch({ type: 'SET_LOADING', isLoading: false }); 
    }
};


export const filterSearch = (filters) => async (dispatch) => {
    dispatch({ type: 'SET_LOADING' });
  
    try {
      const params = new URLSearchParams();
      params.append('app_id', APP_ID);
      params.append('app_key', APP_KEY);
      params.append('type', 'public'); 
  
      
      if (filters.query) params.append('q', filters.query);
  
      
      if (filters.caloriesFrom || filters.caloriesTo) {
        params.append('calories', `${filters.caloriesFrom || 0}-${filters.caloriesTo || 9999}`);
      }
  
     
      Object.keys(filters.diet).forEach((key) => {
        const newKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();  
        if (filters.diet[key]) {
          params.append('diet', newKey);
        }
      });
  
      Object.keys(filters.allergies).forEach((key) => {
        const newKey = key.replace(/([A-Z])/g, '-$1').toLowerCase(); 
        if (filters.allergies[key]) {
          params.append('health', newKey);  
        }
      });
      
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
  
  


