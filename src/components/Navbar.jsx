import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import ThemeToggleButton from './buttons/ThemeToggleButton';
import { FitnessCenter } from '@mui/icons-material';

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => {
        setDrawerOpen(open);
    };

    const menuItems = [
        { text: 'Home', path: '/' },
        { text: 'Login', path: '/login' },
        { text: 'Sign Up', path: '/signup' }
    ];

    const buttonStyles = {
        display: { xs: 'none', sm: 'inline' },
        fontSize: { xs: '1rem', sm: '1.25rem' },
        padding: { xs: '0.5rem', sm: '1rem' },
    };

    return (
        <>
            <AppBar position="fixed" sx={{ padding: 2 }}>
                <Toolbar>
                    <FitnessCenter sx={{ mr: 2, fontSize: 35 }} />
                    <Typography variant="h4" sx={{ flexGrow: 1 }}>
                        Flex Fuel
                    </Typography>

                    {/* Theme toggle button */}
                    <ThemeToggleButton />

                    {/* Desktop buttons */}
                    {menuItems.map((item) => (
                        <Button
                            key={item.text}
                            color="inherit"
                            component={Link}
                            to={item.path}
                            sx={buttonStyles}
                        >
                            {item.text}
                        </Button>
                    ))}

                    {/* Menu icon for mobile */}
                    <IconButton
                        color="inherit"
                        edge="end"
                        onClick={() => toggleDrawer(true)}
                        sx={{ display: { xs: 'inline', sm: 'none' } }}
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Drawer for mobile menu */}
            <Drawer anchor="right" open={drawerOpen} onClose={() => toggleDrawer(false)}>
                <List sx={{ width: 250 }}>
                    {menuItems.map((item) => (
                        <ListItem button key={item.text} component={Link} to={item.path} onClick={() => toggleDrawer(false)}>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
};

export default Navbar;
