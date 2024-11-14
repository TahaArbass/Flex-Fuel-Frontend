import React from 'react';
import DataGrid from './DataGrid'; // Assume your DataGrid component is saved in this path
import Navbar from '../Navbar';
import { Container, Paper, Typography } from '@mui/material';

const DummyGrid = () => {
    // Define the columns for the DataGrid
    const columns = [
        { field: 'id', label: 'ID' },
        { field: 'name', label: 'Name' },
        { field: 'age', label: 'Age' },
        { field: 'email', label: 'Email' },
        { field: 'status', label: 'Status' }
    ];

    // Define some dummy data for rows
    const rows = [
        { id: 1, name: 'Alice Johnson', age: 24, email: 'alice.johnson@example.com', status: 'Active' },
        { id: 2, name: 'Bob Smith', age: 30, email: 'bob.smith@example.com', status: 'Inactive' },
        { id: 3, name: 'Charlie Brown', age: 27, email: 'charlie.brown@example.com', status: 'Active' },
        { id: 4, name: 'David Clark', age: 35, email: 'david.clark@example.com', status: 'Inactive' },
        { id: 5, name: 'Eve Adams', age: 29, email: 'eve.adams@example.com', status: 'Active' },
        { id: 6, name: 'Frank Wright', age: 40, email: 'frank.wright@example.com', status: 'Active' },
        { id: 7, name: 'Grace Lee', age: 22, email: 'grace.lee@example.com', status: 'Inactive' },
        { id: 8, name: 'Henry Wilson', age: 28, email: 'henry.wilson@example.com', status: 'Active' },
        { id: 9, name: 'Ivy Kim', age: 32, email: 'ivy.kim@example.com', status: 'Inactive' },
        { id: 10, name: 'Jack White', age: 45, email: 'jack.white@example.com', status: 'Active' },

    ];

    return (
        <>
            <Navbar />
            <Paper elevation={3} sx={{ p: 2, mt: 2, minHeight: '98%', width: '100%', display: 'flex' }}>
                <Container maxWidth sx={{ mt: 10 }}>
                    <Typography variant="h4" gutterBottom>
                        Dummy DataGrid
                    </Typography>
                    <DataGrid
                        columns={columns}
                        rows={rows}
                        initialSort={{ field: 'name', direction: 'asc' }}
                        rowsPerPage={5}
                    />
                </Container>
            </Paper>
        </>
    );
};

export default DummyGrid;
