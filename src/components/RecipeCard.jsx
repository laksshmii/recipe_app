import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Stack, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../redux/actions/favoritesActions';

const RecipeCard = ({ recipe }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log('recipe', recipe);
  // Access the favorites list from Redux store
  const favorites = useSelector((state) => state.favorites.favorites);

  // Check if the current recipe is already in favorites
  const isFavorite = favorites.some((fav) => fav.label === recipe.label);

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(recipe.label)); // Remove from favorites
    } else {
      dispatch(addToFavorites(recipe)); // Add to favorites
    }
  };

  const handleIngredientClick = () => {
    navigate('/ingredient', { state: { recipe } }); // Navigate to ingredient page with recipe data
  };

  return (
    <Card
      sx={{
        cursor: 'pointer',
        height: 300,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardMedia component="img" height="140" image={recipe.image} alt={recipe.label} />
      <CardContent>
        {/* Ensure the label is truncated to a single line */}
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontSize: '1rem', // Adjust font size for better fit
          }}
          title={recipe.label} // Show full label on hover
        >
          {recipe.label}
        </Typography>

        <Stack direction="row" spacing={2} alignItems="center">
          <Tooltip
            title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            sx={{ fontSize: '20px', fontWeight: 'bold' }}
          >
            <Button
              variant="outlined"
              color={isFavorite ? 'error' : 'primary'}
              onClick={handleFavorite}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </Button>
          </Tooltip>

          {/* Ingredient Count Button */}
          <Button
            variant="outlined"
            color="primary"
            onClick={handleIngredientClick}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Typography variant="body2" sx={{ ml: 1 }}>
              {recipe.ingredientLines.length} Ingredients
            </Typography>
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
