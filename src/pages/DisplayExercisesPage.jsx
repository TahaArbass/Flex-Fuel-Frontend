import React from 'react';
import ExercisesSection from '../components/user/ExercisesSection';
import { useLocation } from 'react-router-dom';
import ExerciseList from '../components/user/ExerciseList';
import { Box } from '@mui/material';

const ExercisesPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const muscleGroup = searchParams.get('muscle-group');

    if (muscleGroup) {
        return (
            <>
                <Box sx={{ p: 4 }}>
                    <ExerciseList muscleGroup={muscleGroup} />
                </Box>
            </>);
    }

    return <ExercisesSection />;
};

export default ExercisesPage;
