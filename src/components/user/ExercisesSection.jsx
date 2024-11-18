import React, { useState, useEffect, useMemo } from "react";
import { Typography, Grid, Box } from "@mui/material";
import MuscleGroupService from "../../services/muscleGroup.service";
import MuscleGroupCard from "../cards/MuscleGroupCard";
import { notifyError } from "../../utils/toastNotification";
import ExerciseList from "./ExerciseList";

const ExercisesSection = () => {
    const [muscleGroups, setMuscleGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMuscleGroups = async () => {
            try {
                const response = await MuscleGroupService.getAll(); // Replace with your API endpoint
                setMuscleGroups(response.data);
                setLoading(false);
            } catch (error) {
                notifyError(error?.response?.data?.error?.message || "Failed to fetch muscle groups");
                setLoading(false);
            }
        };

        fetchMuscleGroups();
    }, []);

    const memoizedMuscleGroups = useMemo(() => muscleGroups, [muscleGroups]);

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (memoizedMuscleGroups.length === 0) {
        return <Typography>No muscle groups found.</Typography>;
    }

    return (
        <>
            <Box sx={{ p: 4, mb: 2 }}>
                <Typography variant="h4" gutterBottom>
                    Exercises
                </Typography>
                <Box padding={2}>
                    <Grid container spacing={4} >
                        {memoizedMuscleGroups.map((muscle) => (
                            <Grid item xs={6} sm={3} key={muscle.id}>
                                <MuscleGroupCard muscle={muscle} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                {/* map through all msucle groups and get the exercises of each*/}
                {memoizedMuscleGroups.map((muscle) => (
                    <ExerciseList key={muscle.id} muscleGroup={muscle.muscle_group_name} />
                ))}
            </Box>
        </>
    );
};

export default ExercisesSection;
