// src/components/Footer.js
import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

const Footer = () => {
    return (
        <Box component={"footer"} sx={{
            bgcolor: 'primary.main', color: 'white', padding: 2, textAlign: 'center',
            width: '100%', // Spans the entire width of the viewport
        }}>
            <Typography variant="h6">© 2024 FlexFuel. All rights reserved.</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <IconButton
                    href="https://facebook.com"
                    sx={{
                        color: '#4267B2', // Facebook blue
                        fontSize: 32, // Increase icon size
                        '& svg': { fontSize: '2.5rem' }, // Make icon itself larger
                        '&:hover': {
                            boxShadow: '0px 0px 15px 5px rgba(66, 103, 178, 0.8)',
                            color: 'white', // Change color on hover
                        },
                    }}
                >
                    <Facebook />
                </IconButton>
                <IconButton
                    href="https://twitter.com"
                    sx={{
                        color: '#1DA1F2', // Twitter blue
                        fontSize: 32,
                        '& svg': { fontSize: '2.5rem' },
                        '&:hover': {
                            boxShadow: '0px 0px 15px 5px rgba(29, 161, 242, 0.8)',
                            color: 'white', // Change color on hover
                        },
                    }}
                >
                    <Twitter />
                </IconButton>
                <IconButton
                    href="https://instagram.com"
                    sx={{
                        color: '#C13584', // Instagram pink/purple
                        fontSize: 32,
                        '& svg': { fontSize: '2.5rem' },
                        '&:hover': {
                            boxShadow: '0px 0px 15px 5px rgba(193, 53, 132, 0.8)',
                            color: 'white', // Change color on hover
                        },
                    }}
                >
                    <Instagram />
                </IconButton>
            </Box>
        </Box>
    );
};

export default Footer;
