import React, { useState, useEffect } from "react";
import { Typography, Grid, Card, CardMedia, CardContent, Box } from "@mui/material";
import MealService from "../../services/meal.service"; // Replace with your actual service
import { notifyError } from "../../utils/toastNotification";
import { Link } from "react-router-dom";

const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

const MealsList = () => {
    const [meals, setMeals] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const response = await MealService.getAllMeals(); // Fetch all meals
                setMeals(response.data);
                console.log(response.data);
                setLoading(false);
            } catch (error) {
                notifyError(error?.response?.data?.error?.message || "Failed to fetch meals");
                setLoading(false);
            }
        };

        fetchMeals();
    }, []);

    if (loading) {
        return <Typography>Loading meals...</Typography>;
    }

    if (meals.length === 0) {
        return <Typography>No meals found.</Typography>;
    }

    return (
        <Box sx={{ mb: 4 }}>
            {Object.entries(meals).map(([category, mealsInCategory]) => (
                <Box key={category} sx={{ p: 3, mb: 4 }}>
                    <Typography sx={{ mb: 2, fontWeight: "bold", fontSize: "1.5rem" }}>
                        {category}
                    </Typography>
                    <Grid container spacing={2}>
                        {mealsInCategory.map((meal) => (
                            <Grid item xs={12} sm={6} md={4} key={meal.id}>
                                <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                                    <CardMedia
                                        component="img"
                                        sx={{ height: 180 }}
                                        image={meal.photo_url || "/placeholder.jpg"} // Fallback image
                                        alt={meal.title}
                                    />
                                    <CardContent>
                                        <Typography
                                            variant="h5"
                                            component={Link}
                                            to={`/meals/${meal.id}`}
                                            underline="none"
                                            sx={{
                                                color: "primary.main",
                                                fontWeight: "bold",
                                                textDecoration: "none",
                                                display: "block",
                                            }}
                                        >
                                            {meal.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {truncateText(meal.description, 100)}
                                        </Typography>
                                        <Typography variant="body2" sx={{ mt: 1 }}>
                                            Calories: {meal.calories}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            ))}
        </Box>
    );
};

export default MealsList;
