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
  const location = useLocation(); 
  const { recipe } = location.state || {}; 

  if (!recipe) {
    return <Typography variant="h6">Recipe details not found.</Typography>;
  }

  const totalNutrients = recipe.totalNutrients || {};
  const ingredients = recipe.ingredients || [];
  const servings = recipe.yield || 1; 
  const calories = recipe.calories || 0; 

  const formatNutrient = (value) => {
    return value ? value.toFixed(2) : '0.00'; 
  };

  return (
    <Container sx={{ mt: 4 }}>
     
      <Card sx={{ mb: 3 }}>
        <CardMedia
          component="img"
          image={recipe.image}
          alt={recipe.label}
          sx={{ width: '100%', height: 300, objectFit: 'cover' }}
        />
      </Card>

     
      <Typography variant="h2" sx={{ mb: 2 }}>
        {recipe.label}
      </Typography>

     
      <Grid container spacing={4}>
       
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
