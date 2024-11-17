import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Tabs,
    Tab,
    Box,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Divider,
} from "@mui/material";
import DumbbellIcon from "@mui/icons-material/FitnessCenter";
import MenuIcon from "@mui/icons-material/Menu";
import ThemeToggleButton from "./buttons/ThemeToggleButton";
import { Link } from "react-router-dom";

const UserNavbar = ({ menuItems }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [value, setValue] = useState(0);
    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    return (
        <>
            <AppBar position="sticky" sx={{ p: 2 }}>
                <Toolbar>
                    <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                        <DumbbellIcon sx={{ mr: 2, fontSize: 35 }} />
                        <Typography variant="h4">FlexFuel</Typography>
                    </Box>
                    <ThemeToggleButton />

                    {/* Desktop navigation */}
                    <Tabs
                        value={value}
                        textColor="inherit"
                        sx={{
                            display: { xs: "none", sm: "inline-flex" },
                            "& .MuiTabs-indicator": { backgroundColor: "white" },
                        }}
                    >
                        {menuItems.map((item, index) => (
                            <Tab
                                key={index}
                                label={item.text}
                                component={Link}
                                to={item.path}
                                sx={{
                                    fontSize: "1.1rem",
                                    ":hover": { color: "#20B2AA" },
                                }}
                                onClick={() => { setValue(index) }}
                            />
                        ))}
                    </Tabs>

                    {/* Mobile menu icon */}
                    <IconButton
                        color="inherit"
                        edge="end"
                        onClick={toggleDrawer(true)}
                        sx={{ display: { xs: "inline", sm: "none" } }}
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
                        <ListItem
                            key={item.text}
                            component={Link}
                            to={item.path}
                            onClick={toggleDrawer(false)}
                        >
                            <ListItemText primary={item.text} />
                            <Divider />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
};

export default UserNavbar;
