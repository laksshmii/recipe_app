import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './RecipeList';
import Header from './Header';
import Favorites from './Favorites';
import IngredientDetails from './IngredientDetails';
import { Container, ThemeProvider, createTheme } from '@mui/material';


const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(212,22,33)', 
    },
    secondary: {
      main: 'rgb(0,0,0)', 
    },
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <Router>
      
        <ThemeProvider theme={theme}>
          <Container maxWidth={false} sx={{ width: '100%', paddingLeft: 2, paddingRight: 2 }}>
           
            <Header />
            <Routes>
              <Route path="/" element={<RecipeList />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/ingredient" element={<IngredientDetails />} /> 
            </Routes>
          </Container>
        </ThemeProvider>
      </Router>
    </Provider>
  );
};

export default App;
