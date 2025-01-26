import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './RecipeList';
import Header from './Header';
import Favorites from './Favorites';
import IngredientDetails from './IngredientDetails';
import { Container, ThemeProvider, createTheme } from '@mui/material';

// Create the theme with custom colors
const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(212,22,33)', // Red color
    },
    secondary: {
      main: 'rgb(0,0,0)', // Black color
    },
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        {/* Apply the custom theme using ThemeProvider */}
        <ThemeProvider theme={theme}>
          <Container maxWidth={false} sx={{ width: '100%', paddingLeft: 2, paddingRight: 2 }}>
            {/* The Container now spans the full width with some padding */}
            <Header />
            <Routes>
              <Route path="/" element={<RecipeList />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/ingredient" element={<IngredientDetails />} /> {/* No need for ingredientId in the URL */}
            </Routes>
          </Container>
        </ThemeProvider>
      </Router>
    </Provider>
  );
};

export default App;
