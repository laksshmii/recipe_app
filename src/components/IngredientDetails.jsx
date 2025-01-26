import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Typography,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Card,
  CardMedia,
  Box,
  Button,
} from '@mui/material';

const IngredientDetails = () => {
  const location = useLocation(); // Access location state
  const { recipe } = location.state || {}; // Get the recipe data passed via state

  if (!recipe) {
    return <Typography variant="h6">Recipe details not found.</Typography>;
  }

  const totalNutrients = recipe.totalNutrients || {};
  const ingredients = recipe.ingredients || [];
  const servings = recipe.yield || 1; // Number of servings
  const calories = recipe.calories || 0; // Total calories

  const formatNutrient = (value) => {
    return value ? value.toFixed(2) : '0.00'; // Round to 2 decimal places or return 0 if no value
  };

  return (
    <Container sx={{ mt: 4 }}>
      {/* Recipe Image */}
      <Card sx={{ mb: 3 }}>
        <CardMedia
          component="img"
          image={recipe.image}
          alt={recipe.label}
          sx={{ width: '100%', height: 300, objectFit: 'cover' }}
        />
      </Card>

      {/* Recipe Title */}
      <Typography variant="h2" sx={{ mb: 2 }}>
        {recipe.label}
      </Typography>

      {/* Recipe Layout */}
      <Grid container spacing={4}>
        {/* Ingredients Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h3" sx={{ mb: 2,fontStyle:"bold" }}>
            Ingredients
          </Typography>
          <List>
            {ingredients.map((ingredient, index) => (
              <ListItem key={index}>
                <ListItemText primary={ingredient.text} />
              </ListItem>
            ))}
          </List>
          {/* Instructions Button */}
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              href={recipe.url}
              target="_blank"
              fullWidth
            >
              Instructions
            </Button>
          </Box>
        </Grid>

        {/* Nutrition Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h3" sx={{ mb: 2 ,fontStyle:"bold"}}>
            Nutrition
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h5">
              {Math.round(calories / servings)} <small>CALORIES / SERVING</small>
            </Typography>
            <Typography variant="subtitle1">Servings: {servings}</Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <List>
            {Object.keys(totalNutrients).map((key) => {
              const nutrient = totalNutrients[key];
              return (
                <ListItem key={key} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1">{nutrient.label}</Typography>
                  <Typography variant="body1">
                    {formatNutrient(nutrient.quantity)} {nutrient.unit}
                  </Typography>
                </ListItem>
              );
            })}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
};

export default IngredientDetails;
