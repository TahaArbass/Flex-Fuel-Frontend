import React, { useState, useEffect } from "react";
import MealService from "../../services/meal.service";
import { Box, Typography, Button, Card, CardContent, Grid, Divider } from "@mui/material";
import { notifyError } from "../../utils/toastNotification";

const MealDetail = ({ mealId }) => {

    const [meal, setMeal] = useState(null);
    const [showVideo, setShowVideo] = useState(false);

    // Fetch the meal data
    useEffect(() => {
        const fetchMealData = async () => {
            try {
                console.log("mealId", mealId);
                const mealResponse = await MealService.getMealById(mealId);
                setMeal(mealResponse.data);
            } catch (error) {
                notifyError(error?.response?.data?.error?.message || "Failed to fetch meal data");
            }
        };

        if (mealId) {
            fetchMealData();
        }
    }, [mealId]); // Added mealId as a dependency

    if (!meal) {
        return <Typography>Loading...</Typography>;
    }

    const youtubeEmbedUrl = (url) => {
        if (!url) return "";
        // Extract video ID and construct embed URL
        const videoId = url.split("v=")[1]?.split("&")[0] || url.split("youtu.be/")[1];
        return `https://www.youtube.com/embed/${videoId}`;
    };

    return (
        <Box sx={{ padding: 6 }}>
            {/* Header */}
            <Typography gutterBottom variant="h4">
                {meal?.name}
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Category: {meal?.category}
            </Typography>

            {/* Layout Container */}
            <Grid container spacing={2}>
                {/* Left Section (Media Card) */}
                <Grid item xs={12} md={4}>
                    <Card>
                        <Box
                            sx={{
                                position: "relative",
                                paddingTop: "56.25%", // 16:9 Aspect Ratio
                            }}
                        >
                            {showVideo ? (
                                meal?.video_url ? ( // Check if video_url exists
                                    <iframe
                                        src={youtubeEmbedUrl(meal?.video_url)}
                                        title={meal?.name}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        style={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    />
                                ) : (
                                    <Typography
                                        variant="h6"
                                        color="textSecondary"
                                        sx={{
                                            position: "absolute",
                                            top: "50%",
                                            left: "50%",
                                            transform: "translate(-50%, -50%)",
                                            textAlign: "center",
                                        }}
                                    >
                                        No video available
                                    </Typography>
                                )
                            ) : (
                                <img
                                    src={meal?.photo_url || "/placeholder.jpg"}
                                    alt={meal?.name}
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "contain",
                                    }}
                                />
                            )}
                        </Box>
                        <CardContent>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={() => setShowVideo(!showVideo)}
                            >
                                {showVideo ? "Show Image" : "Watch Video"}
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Right Section (Text Content) */}
                <Grid item xs={12} md={8}>
                    <Box ml={2}>
                        <Typography variant="h5" sx={{ marginBottom: 1 }}>
                            Description:
                        </Typography>
                        <Typography variant="h6" sx={{ marginBottom: 2 }}>
                            {meal?.description}
                        </Typography>
                        <Typography variant="h5" sx={{ marginBottom: 1 }}>
                            Ingredients:
                        </Typography>
                        <Box component="ul" sx={{ paddingLeft: 2 }}>
                            {meal?.ingredients?.split(", ").map((ingredient, index) => (
                                <Typography key={index} component="li" variant="h6">
                                    {ingredient}
                                </Typography>
                            ))}
                        </Box>
                        <Typography variant="h5" sx={{ marginTop: 2, marginBottom: 1 }}>
                            Steps:
                        </Typography>
                        <Box component="ul" sx={{ paddingLeft: 2 }}>
                            {meal?.steps?.split(". ").map((step, index) => (
                                <Typography key={index} component="li" variant="h6">
                                    {step}
                                </Typography>
                            ))}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default MealDetail;
