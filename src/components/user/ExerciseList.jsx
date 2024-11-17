import React, { useState, useEffect } from "react";
import { Typography, Grid, Card, CardMedia, CardContent, Box } from "@mui/material";
import ExerciseService from "../../services/exercise.service";
import { notifyError } from "../../utils/toastNotification";
import { Link, Navigate } from "react-router-dom";

const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

const ExerciseList = ({ muscleGroup = null }) => {
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                if (muscleGroup) {
                    const response = await ExerciseService.getByMuscleGroupName(muscleGroup);
                    setExercises(response.data);
                }
                setLoading(false);
            } catch (error) {
                notifyError(error?.response?.data?.error?.message || "Failed to fetch exercises");
                setLoading(false);
            }
        };

        fetchExercises();
    }, [muscleGroup]);

    if (loading) {
        return <Typography>Loading exercises for {muscleGroup}...</Typography>;
    }

    // in case no exercises are found for the muscle group, redirect to the exercises page
    if (exercises.length === 0)
        return <Navigate to={`/exercises`} replace />;

    return (
        <Box sx={{ mb: 4 }}>
            <Typography sx={{ mb: 1, fontWeight: "bold", fontSize: '1.5rem' }}>
                {muscleGroup}
            </Typography>
            {/* displaying exercises */}
            {exercises.length === 0 ? <Typography>No exercises found for {muscleGroup}</Typography> :
                <Grid container spacing={2}>
                    {exercises.map((exercise) => (
                        <Grid item xs={12} key={exercise.id}>
                            <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 120, height: 120, borderRadius: 2, mr: 2 }}
                                    image={exercise.photo_url}
                                    alt={exercise.exercise_name}
                                />
                                <CardContent sx={{ flex: 1 }}>
                                    <Typography
                                        variant="h5"
                                        component={Link}
                                        to={`/exercises/${exercise.id}`}
                                        underline="none"
                                        sx={{
                                            color: "primary.main",
                                            fontWeight: "bold",
                                            display: "block",
                                        }}
                                    >
                                        {exercise.exercise_name}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        {truncateText(exercise.exercise_description, 100)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>}
        </Box>
    );
};

export default ExerciseList;
