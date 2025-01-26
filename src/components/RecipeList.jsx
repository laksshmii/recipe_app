import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RecipeCard from './RecipeCard';
import { Grid, Typography, CircularProgress } from '@mui/material';
import { fetchRecipes } from '../redux/actions/recipeActions'; // Adjust the path as needed

const RecipeList = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.recipes);
  const isLoading = useSelector((state) => state.recipes.isLoading);
  const error = useSelector((state) => state.recipes.error); // Assuming error state exists

  useEffect(() => {
    dispatch(fetchRecipes('chicken')); // Replace 'chicken' with the query you want
  }, [dispatch]);

  if (isLoading) {
    return (
      <Grid container justifyContent="center" sx={{ mt: 4 }}>
        <CircularProgress />
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid container justifyContent="center" sx={{ mt: 4 }}>
        <Typography variant="h6" color="error">
          Something went wrong: {error.message}
        </Typography>
      </Grid>
    );
  }

  if (!recipes.length) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        No recipes found!
      </Typography>
    );
  }

  return (
    <Grid container spacing={3} sx={{ mt: 2 }}>
      {recipes.map((recipeData) => (
        <Grid item xs={12} sm={6} md={2.4} key={recipeData.recipe.uri}> {/* Adjust to 2.4 for 5 cards in a row */}
          <RecipeCard recipe={recipeData.recipe} />
        </Grid>
      ))}
    </Grid>
  );
};

export default RecipeList;
