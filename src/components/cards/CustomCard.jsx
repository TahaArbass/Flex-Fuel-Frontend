// src/components/CustomCard.js
import React from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';

const CustomCard = ({ children, title }) => {
    return (
        <Card sx={{ boxShadow: 3, borderRadius: 2, width: '100%', padding: 2 }}>
            {title && (
                <CardHeader
                    title={title}
                    sx={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        borderBottom: '2px solid #ddd',
                    }}
                />
            )}
            <CardContent>{children}</CardContent>
        </Card>
    );
};

export default CustomCard;
