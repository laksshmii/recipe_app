import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton ,Tooltip,} from '@mui/material';
import SearchBar from './SearchBar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useLocation } from 'react-router-dom';



const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigateToFavorites = () => {
   
    navigate('/favorites');
  };

  const handleBackNavigation = () => {
   
    navigate(-1);
  };

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
       
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {location.pathname !== '/' && ( 
            <IconButton color="inherit" onClick={handleBackNavigation}>
              <ArrowBackIcon />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ ml: 1 }}>
            Recipe App
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <SearchBar  />
        </Box>

      
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Go to Favorites" arrow>
            <FavoriteIcon sx={{ cursor: 'pointer' }} onClick={handleNavigateToFavorites} />
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
