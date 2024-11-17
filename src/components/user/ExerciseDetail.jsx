import React, { useState, useEffect, useRef } from 'react';
import MuscleService from '../../services/muscle.service'; // Fetch muscle by ID
import ExerciseService from '../../services/exercise.service'; // Fetch exercise by ID
import { Box, Typography, Button, Card, CardMedia, CardContent, Grid, Divider } from '@mui/material';
import { notifyError } from '../../utils/toastNotification';

const ExerciseDetail = ({ exerciseId }) => {
    const [exercise, setExercise] = useState(null);
    const [muscle, setMuscle] = useState(null);
    const [showVideo, setShowVideo] = useState(false);
    const videoRef = useRef(null);  // Reference for the video element
    // Fetch the exercise data
    useEffect(() => {
        const fetchExerciseData = async () => {
            try {
                console.log('exerciseId', exerciseId);
                const exerciseResponse = await ExerciseService.getById(exerciseId);
                setExercise(exerciseResponse.data);

                const muscleResponse = await MuscleService.getById(exerciseResponse.data.targeted_muscle_id);
                setMuscle(muscleResponse.data);
            } catch (error) {
                notifyError(error?.response?.data?.error?.message || 'Failed to fetch exercise data');
            }
        };

        if (exerciseId) {
            fetchExerciseData();
        }
    }, [exerciseId]); // Added exerciseId as a dependency

    if (!exercise || !muscle) {
        return <Typography>Loading...</Typography>;
    }

    // Handle video play/pause on click
    const handleVideoClick = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();  // Play the video
        } else {
            videoRef.current.pause();  // Pause the video
        }
    };

    return (
        <Box sx={{ padding: 6 }}>
            {/* Header */}
            <Typography gutterBottom variant="h4">
                {exercise?.exercise_name}
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Targeted Muscle: {muscle?.muscle_name}
            </Typography>

            {/* Layout Container */}
            <Grid container spacing={2}>
                {/* Left Section (Media Card) */}
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardMedia
                            component={showVideo ? 'video' : 'img'}
                            src={showVideo ? exercise?.video_url : exercise?.photo_url}
                            alt={exercise?.exercise_name}
                            controls={showVideo}
                            ref={videoRef}
                            onClick={handleVideoClick}
                            sx={{
                                height: 300,
                                objectFit: 'contain', // Ensures the entire image is visible
                                width: '100%', // Ensures it scales with the container
                            }}
                        />
                        <CardContent>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={() => setShowVideo(!showVideo)}
                            >
                                {showVideo ? 'Show Image' : 'Watch Video'}
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
                            {exercise?.exercise_description}
                        </Typography>
                        <Typography variant="h5" sx={{ marginBottom: 1 }}>
                            Steps:
                        </Typography>
                        <Box component="ul" sx={{ paddingLeft: 2 }}>
                            {exercise?.exercise_steps?.split('. ').map((step, index) => (
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

export default ExerciseDetail;
