import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Card, CardMedia, CardContent, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { removeFromFavorites } from '../redux/actions/favoritesActions';

const FavoritesPage = () => {
  const favorites = useSelector((state) => state.favorites.favorites); // Access favorites from Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleIngredientClick = (recipe) => {
    // Navigate to ingredient details page
    navigate('/ingredient', { state: { recipe } });
  };

  const handleRemoveFavorite = (recipeLabel) => {
    // Dispatch action to remove the recipe from favorites
    dispatch(removeFromFavorites(recipeLabel));
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Favorite Recipes
      </Typography>

      {/* Check if there are favorites */}
      {favorites.length === 0 ? (
        <Typography variant="body1">You have no favorite recipes yet!</Typography>
      ) : (
        <Grid container spacing={2}>
          {favorites.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <Card>
                <CardMedia component="img" height="140" image={recipe.image} alt={recipe.label} />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {recipe.label}
                  </Typography>

                  <Stack direction="row" spacing={2}>
                    {/* Ingredient Count Button */}
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleIngredientClick(recipe)}
                    >
                      {recipe.ingredientLines.length} Ingredients
                    </Button>

                    {/* Remove from Favorites Button */}
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleRemoveFavorite(recipe.label)}
                    >
                      Remove
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default FavoritesPage;
