// src/components/ThemeToggleButton.js
import React, { useContext } from 'react';
import { IconButton } from '@mui/material';
import { ThemeContext } from '../../contexts/ThemeContext';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const ThemeToggleButton = () => {
    const { darkMode, toggleTheme } = useContext(ThemeContext);

    return (
        <IconButton
            color="inherit"
            onClick={toggleTheme}
            aria-label="toggle theme"
        >
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
    );
}

export default ThemeToggleButton;
