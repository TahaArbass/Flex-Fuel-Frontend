// src/pages/LandingPage.js
import React from 'react';
import { Box } from '@mui/material';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import Footer from '../components/Footer';

const LandingPage = () => {
    return (
        <Box>
            <Navbar />
            <HeroSection />
            <FeaturesSection />
            <Footer />
        </Box>
    );
}

export default LandingPage;
