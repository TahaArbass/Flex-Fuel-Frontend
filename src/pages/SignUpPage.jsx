import React from 'react';
import { Container, Box, Slide, Typography, Link } from '@mui/material';
import FormComponent from '../components/forms/FormComponent';
import * as Yup from 'yup';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCard from '../components/CustomCard';
import { PersonAdd } from '@mui/icons-material';
import bg from '../assets/bg.jpg';
import { notifyError, notifySuccess } from '../utils/toastNotification';
import UserService from '../services/user.service';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
    const navigate = useNavigate();

    const fields = [
        { name: 'username', label: 'Username', type: 'text' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'password', label: 'Password', type: 'password' },
        { name: 'confirmPassword', label: 'Confirm Password', type: 'password' },
    ];

    const initialValues = { email: '', password: '', confirmPassword: '' };

    // Validation schema 
    const validationSchema = Yup.object({
        // username with no spaces and only alphanumeric characters and no spaces
        username: Yup.string()
            .min(3, 'Username must be at least 3 characters')
            .matches(/^\S*$/, 'Username should not contain spaces')
            .matches(/^[a-zA-Z0-9]*$/, 'Username should not contain special characters like @, #, $, etc.')
            .required('Required'),
        // email with valid email format
        email: Yup.string().email('Invalid email address').required('Required'),
        // password with no spaces and minimum 6 characters
        password: Yup.string()
            .matches(/^\S*$/, 'Password should not contain spaces')
            .min(6, 'Password must be at least 6 characters')
            .required('Required'),
        // confirm password should match the password
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Required'),
    });

    // Function to handle form submission
    const onSubmit = async (values) => {
        try {
            const { username, email, password } = values;
            // Call the signup method from the UserService
            const result = await UserService.signup(username, email, password);

            if (result.status === 201) {
                notifySuccess('Sign-up successful');
                navigate('/login'); // Redirect to login page
            }
        } catch (error) {
            notifyError(error?.response?.data?.error?.message || 'Sign-up failed');
        }
    };

    return (
        <>
            <Navbar />
            <Container
                sx={{
                    minHeight: '100vh',
                    minWidth: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'url(' + bg + ')',
                    backgroundSize: 'cover',
                }}
            >
                <Slide in direction="up" timeout={600}>
                    <Box sx={{ width: '100%', maxWidth: 450, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                        <PersonAdd color='primary'
                            sx={{
                                fontSize: 50, mb: 2,
                                transition: 'transform 0.5s ease',
                                '&:hover': {
                                    transform: 'rotate(360deg)',
                                },
                            }} />
                        <CustomCard title="Sign Up" >
                            <FormComponent
                                fields={fields}
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={onSubmit}
                                buttonText="Sign Up"
                            />

                            {/* Link to Login */}
                            <Box sx={{ mt: 2, textAlign: 'center' }}>
                                <Typography variant="body1">
                                    Already have an account?{' '}
                                    <Link
                                        component="button"
                                        variant="body1"
                                        onClick={() => navigate('/login')}
                                        sx={{ color: 'primary.main', textDecoration: 'underline' }}
                                    >
                                        Log in
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

export default SignUpPage;
