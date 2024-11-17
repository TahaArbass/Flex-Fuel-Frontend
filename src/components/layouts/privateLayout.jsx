// a component that wraps the private routes with the private layout which are 

import React from 'react';
import TabsWithPanels from '../TabsWithPanels';
import Footer from '../Footer';
import { Box } from '@mui/material';

const PrivateLayout = ({ children }) => {
    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '87vh' }}>
                <TabsWithPanels />
                <main>{children}</main>
            </Box>
            <Footer />
        </>
    );
};

export default PrivateLayout;

