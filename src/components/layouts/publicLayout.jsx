// a component to add the usernavbar and footer around the children components passed to it
// this is for the public pages
import React from 'react';

import Navbar from '../Navbar';
import Footer from '../Footer';

const publicLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
};

export default publicLayout;