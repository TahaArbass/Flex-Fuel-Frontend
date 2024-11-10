// src/components/CustomButton.js
import React from 'react';
import { Button } from '@mui/material';

const CustomButton = ({ onClick, text, color = 'primary', variant = 'contained', fullWidth = false, sx = {}, disabled = false }) => {
    return (
        <Button
            onClick={onClick}
            variant={variant}
            color={color}
            fullWidth={fullWidth}
            sx={{
                mt: 2,
                borderRadius: 2,
                boxShadow: 2,
                ...sx,
            }}
            disabled={disabled}
        >
            {text}
        </Button>
    );
};

export default CustomButton;
