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
  
  const favorites = useSelector((state) => state.favorites.favorites);

  
  const isFavorite = favorites.some((fav) => fav.label === recipe.label);

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(recipe.label)); 
    } else {
      dispatch(addToFavorites(recipe)); 
    }
  };

  const handleIngredientClick = () => {
    navigate('/ingredient', { state: { recipe } })
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
        
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontSize: '1rem', 
          }}
          title={recipe.label} 
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
