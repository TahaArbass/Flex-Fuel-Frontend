// src/pages/Login.js
import React from 'react';
import { Container, Box, Slide, Link, Typography } from '@mui/material';
import FormComponent from '../components/forms/FormComponent';
import * as Yup from 'yup';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCard from '../components/cards/CustomCard';
import { LockOpen } from '@mui/icons-material';
import bg from '../assets/bg.jpg';
import { notifyError, notifySuccess } from '../utils/toastNotification';
import UserService from '../services/user.service';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
    const { login } = useAuth(); // for setting the token in the context
    const location = useLocation(); // for redirecting after login if user was redirected to login page
    const navigate = useNavigate();

    // my fields for the form
    const fields = [
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'password', label: 'Password', type: 'password' },
    ];

    const initialValues = { email: '', password: '' };

    // login form validation schema
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string()
            .matches(/^\S*$/, 'Password should not contain spaces')
            .min(6, 'Password must be at least 6 characters')
            .required('Required'),
    });

    // login form submission
    const onSubmit = async (values) => {
        try {
            const { email, password } = values;
            const result = await UserService.login(email, password);
            if (result.status === 200) {
                login(result.data.token, result.data.user);
                notifySuccess('Login successful');
                const next = new URLSearchParams(location.search).get('next');
                const redirectPath = next ? next : '/exercises';
                navigate(redirectPath); // redirect to the next path if user was redirected to login page
            }
        }
        catch (error) {
            notifyError(error?.response?.data?.error?.message || 'Login failed');
        }

    };

    return (
        <>
            <Navbar />
            <Container
                sx={{
                    minHeight: '100vh', minWidth: '100%',
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    background: 'url(' + bg + ')',
                    backgroundSize: 'cover',
                }}>
                <Slide in direction="up" timeout={600}>
                    <Box sx={{ width: '100%', maxWidth: 450, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                        <LockOpen color='primary'
                            sx={{
                                fontSize: 50, mb: 2,
                                transition: 'transform 0.5s ease',
                                '&:hover': {
                                    transform: 'rotate(360deg)',
                                },
                            }} />
                        <CustomCard title="Login" >
                            <FormComponent
                                fields={fields}
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={onSubmit}
                                buttonText="Login"
                            />

                            {/* the Sign Up Link */}
                            <Box sx={{ mt: 2, textAlign: 'center' }}>
                                <Typography variant="body1">
                                    Don't have an account?{' '}
                                    <Link
                                        component="button"
                                        variant="body1"
                                        onClick={() => navigate('/signup')}
                                        sx={{ color: 'primary.main', textDecoration: 'underline' }}
                                    >
                                        Sign up
                                    </Link>
                                </Typography>
                            </Box>
                        </CustomCard>
                    </Box>
                </Slide>
            </Container>
            <Footer />
        </>
    );
};

export default LoginPage;
