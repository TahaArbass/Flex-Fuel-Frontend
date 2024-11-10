import React, { createContext, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode ? JSON.parse(savedMode) : false;
    });

    const toggleTheme = () => {
        setDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem('darkMode', JSON.stringify(newMode));
            return newMode;
        });
    };

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
        },
    });

    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    );
};

export default ThemeContextProvider;
