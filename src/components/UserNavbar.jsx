import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Tabs, Tab, Menu, MenuItem, Box, Button, Drawer, List, ListItem, ListItemText, Divider } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import DumbbellIcon from "@mui/icons-material/FitnessCenter";
import MenuIcon from "@mui/icons-material/Menu"; // For the menu icon on mobile
import { Link } from "react-router-dom";
import ThemeToggleButton from "./buttons/ThemeToggleButton";

const UserNavbar = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const open = Boolean(anchorEl);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const handleMenu = (event) => setAnchorEl(event.currentTarget);
    const handleCloseMenu = () => setAnchorEl(null);

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const menuItems = [
        { text: 'My Profile', path: '/profile' },
        { text: 'Exercises', path: '/exercise' },
        { text: 'GymBros', path: '/gymbros' },
        { text: 'Friends', path: '/friends' },
        { text: 'Logout', path: '/logout' }
    ];

    return (
        <>
            <AppBar position="sticky" sx={{ p: 2 }}>
                <Toolbar>
                    <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                        <DumbbellIcon sx={{ mr: 2, fontSize: 35 }} />
                        <Typography variant="h4">FlexFuel</Typography>
                    </Box>
                    <ThemeToggleButton />

                    {/* Desktop navigation (Tabs) */}
                    <Tabs
                        value={selectedTab}
                        onChange={handleTabChange}
                        textColor="inherit"
                        indicatorColor="primary"
                        sx={{ display: { xs: "none", sm: "inline-flex" } }}
                    >
                        <Tab label="Exercise" sx={{ fontSize: '1.2rem' }} />
                        <Tab label="GymBros" sx={{ fontSize: '1.2rem' }} />
                        <Tab label="My Profile" sx={{ fontSize: '1.2rem' }} />
                    </Tabs>

                    {/* Mobile menu icon */}
                    <IconButton
                        color="inherit"
                        edge="end"
                        onClick={toggleDrawer(true)}
                        sx={{ display: { xs: 'inline', sm: 'none' } }}
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Drawer for mobile menu */}
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                <List sx={{ width: 250 }}>
                    {menuItems.map((item) => (
                        <ListItem key={item.text} component={Link} to={item.path} onClick={toggleDrawer(false)}>
                            <ListItemText primary={item.text} />
                            <Divider />
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            {/* Menu for profile and logout */}
            <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
                <MenuItem onClick={() => alert("Edit Profile")}>Edit Profile</MenuItem>
                <MenuItem onClick={() => alert("Logout")}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default UserNavbar;
