import React, { useState } from "react";
import {
    Box,
    Grid,
    Checkbox,
    FormControlLabel,
    Typography,
    Button,
    Divider,
    TextField,
} from "@mui/material";

const FilterSearch = ({ onApplyFilters }) => {
    const [filters, setFilters] = useState({
        caloriesFrom: "",
        caloriesTo: "",
        ingredients: "",
        diet: {

            highFiber: false,
            highProtein: false,
            lowCarb: false,
            lowFat: false,
            lowSugar: false,
            alcoholFree: false,
            balanced: false,
        },
        allergies: {
            gluten: false,
            vegetarian: false,
            dairyFree: false,
            fishFree: false,
            shellfishFree: false,
            eggs: false,
            soy: false,
            wheat: false,
            peanuts: false,
            treeNuts: false,
            vegan: false,
            paleo: false,
        },
    });

    const handleCheckboxChange = (category, name) => {
        setFilters((prev) => ({
            ...prev,
            [category]: {
                ...prev[category],
                [name]: !prev[category][name],
            },
        }));
    };

    const handleInputChange = (name, value) => {
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleClearFilters = () => {
        setFilters({
            caloriesFrom: "",
            caloriesTo: "",
            ingredients: "",
            diet: Object.fromEntries(Object.keys(filters.diet).map((key) => [key, false])),
            allergies: Object.fromEntries(Object.keys(filters.allergies).map((key) => [key, false])),
        });
    };

    const handleApplyFilters = () => {
        const filteredDiet = Object.keys(filters.diet).reduce((acc, key) => {
            if (filters.diet[key]) acc[key] = filters.diet[key];
            return acc;
        }, {});

        const filteredAllergies = Object.keys(filters.allergies).reduce((acc, key) => {
            if (filters.allergies[key]) acc[key] = filters.allergies[key];
            return acc;
        }, {});

        const appliedFilters = {
            caloriesFrom: filters.caloriesFrom,
            caloriesTo: filters.caloriesTo,
            ingredients: filters.ingredients,
            diet: filteredDiet,
            allergies: filteredAllergies,
        };

       
        onApplyFilters(appliedFilters);
    };

    return (
        <Box p={2} sx={{ background: "#fff", borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h6" mb={2}>
                Refine Search
            </Typography>

           
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        label="Calories From"
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={filters.caloriesFrom}
                        onChange={(e) => handleInputChange("caloriesFrom", e.target.value)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Calories To"
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={filters.caloriesTo}
                        onChange={(e) => handleInputChange("caloriesTo", e.target.value)}
                    />
                </Grid>
            </Grid>

           
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Ingredients"
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={filters.ingredients}
                        onChange={(e) => handleInputChange("ingredients", e.target.value)}
                    />
                </Grid>
            </Grid>

          
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1">Diet</Typography>
            <Grid container spacing={2}>
                {Object.keys(filters.diet).map((key) => (
                    <Grid item xs={6} sm={4} key={key}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={filters.diet[key]}
                                    onChange={() => handleCheckboxChange("diet", key)}
                                />
                            }
                            label={key.replace(/([A-Z])/g, " $1")}
                        />
                    </Grid>
                ))}
            </Grid>

          
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1">Allergies</Typography>
            <Grid container spacing={2}>
                {Object.keys(filters.allergies).map((key) => (
                    <Grid item xs={6} sm={4} key={key}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={filters.allergies[key]}
                                    onChange={() => handleCheckboxChange("allergies", key)}
                                />
                            }
                            label={key.replace(/([A-Z])/g, " $1")}
                        />
                    </Grid>
                ))}
            </Grid>

           
            <Divider sx={{ my: 2 }} />
            <Grid container justifyContent="space-between">
                <Button variant="text" color="error" onClick={handleClearFilters}>
                    Clear Filters
                </Button>
                <Button variant="contained" color="primary" onClick={handleApplyFilters}>
                    Done
                </Button>
            </Grid>
        </Box>
    );
};

export default FilterSearch;
