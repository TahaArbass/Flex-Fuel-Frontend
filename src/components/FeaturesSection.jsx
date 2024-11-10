// src/components/FeaturesSection.js
import React from 'react';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';

const features = [
    { title: "Track Your Progress", description: "Monitor your improvements over time." },
    { title: "Customizable Plans", description: "Adjust your workout to fit your needs." },
    { title: "Community Support", description: "Join a supportive community." },
];

const FeaturesSection = () => {
    return (
        <Box sx={{ padding: 4, textAlign: 'center', bgcolor: 'background.default' }}>
            <Card sx={{
                backgroundColor: 'transparent', // No background
                boxShadow: 'none', // No shadow
                border: 'none', // No border
                mb: 4, // Margin bottom
            }}>
                < CardContent >
                    <Typography variant="h4" fontWeight={'bold'} gutterBottom>Features</Typography>
                </CardContent>
            </Card >
            <Grid container spacing={4}>
                {features.map((feature, index) => (
                    <Grid item xs={12} sm={4} key={index}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom fontWeight={'bold'}>{feature.title}</Typography>
                                <Typography variant="body1" sx={{ fontSize: '130%' }}>{feature.description}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box >
    );
}

export default FeaturesSection;
