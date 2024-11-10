import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import image1 from '../assets/landing1.jpg';
import image2 from '../assets/landing2.jpg';
import image3 from '../assets/landing3.jpg';

const images = [image1, image2, image3];

const HeroSection = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        // Delay applying the transition to prevent initial glitch
        setTimeout(() => 100);

        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '90vh',
                backgroundImage: `url(${images[index]})`,
                backgroundSize: 'cover',
                color: 'white',
                textAlign: 'center',
                padding: 2,
                transition: 'background-image 1s ease-in-out', // Smooth transition effect
            }}
        >
            <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2, textShadow: '2px 2px 4px rgba(0, 0, 0, 1)' }}>
                Welcome to FlexFuel
            </Typography>
            <Typography variant="h5" sx={{ mb: 4, textShadow: '2px 2px 3px rgba(0, 0, 0, 1)', }}>
                Achieve your fitness goals with personalized workout plans.
            </Typography>
            <Button variant="contained" component={Link} to="/signup" sx={{ fontSize: '1.2rem' }}>
                Get Started
            </Button>
        </Box>
    );
}

export default HeroSection;
