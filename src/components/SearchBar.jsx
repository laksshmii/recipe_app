import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchRecipes, filterSearch } from '../redux/actions/recipeActions';
import { TextField, Button, Box, Typography, Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FilterSearch from './FilterSearch';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (query.trim()) dispatch(fetchRecipes(query));
  };

  const handleDefaultSearch = () => {
    setQuery(''); // Clear the query
    dispatch(fetchRecipes('chicken')); // Default search term
  };

  const handleOpenModal = () => {
    setIsFilterModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsFilterModalOpen(false);
  };

  const handleApplyFilters = (filters) => {
    if (filters) {
      // Dispatch the filterSearch action
      dispatch(filterSearch(filters));
      console.log('Filters applied:', filters);
    }
    handleCloseModal();
  };

  return (
    <Box>
      {/* Search Bar */}
      <Box display="flex" mt={1} alignItems="center" gap="0.5rem">
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{
            endAdornment: query && (
              <IconButton size="small" onClick={handleDefaultSearch}>
                <CloseIcon />
              </IconButton>
            ),
          }}
        />
        <Button variant="contained" color="secondary" onClick={handleSearch}>
          Search
        </Button>
      </Box>

      {/* Line Below Search Bar */}
      <Box mt={2} display="flex" justifyContent="center" gap="1rem">
        <Typography
          variant="body1"
          color="secondary"
          sx={{ cursor: 'pointer', textDecoration: 'underline' }}
          onClick={handleOpenModal}
        >
          Search with Ingredients, Diet
        </Typography>
      </Box>

      {/* Modal for FilterSearch */}
      <Modal open={isFilterModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 2,
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Refine Search</Typography>
            <IconButton onClick={handleCloseModal} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
          <FilterSearch onApplyFilters={handleApplyFilters} />
        </Box>
      </Modal>
    </Box>
  );
};

export default SearchBar;
