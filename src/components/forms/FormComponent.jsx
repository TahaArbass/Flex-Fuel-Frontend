// src/components/FormComponent.js
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { IconButton, InputAdornment, FormHelperText, Button, Box, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CustomButton from '../buttons/CustomButton';

// Form component with fields, initial values, validation schema, submit function, and button text
// This component uses Formik for form handling
const FormComponent = ({ fields, initialValues, validationSchema, onSubmit, buttonText }) => {
    const [showPassword, setShowPassword] = useState(false); // State to show/hide password
    const handleClickShowPassword = () => setShowPassword(!showPassword); // Function to toggle password visibility
    const handleMouseDownPassword = (event) => event.preventDefault(); // Prevent default behavior on mouse down

    // Form component
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {/* Formik form where fields are mapped to TextField components */}
            {({ isSubmitting }) => (
                <Form noValidate>
                    <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: '100%', gap: 2 }}>
                        {fields.map((field, idx) => (
                            <div key={idx}>
                                <Field
                                    name={field.name}
                                    label={field.label}
                                    type={field.type === 'password' && showPassword ? 'text' : field.type}
                                    as={TextField}
                                    variant="outlined"
                                    fullWidth
                                    required

                                    // Show visibility icon for password fields
                                    InputProps={
                                        field.type === 'password' ? {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        } : undefined // If the field is not a password, do not show the visibility icon
                                    }
                                />

                                {/* Display error message */}
                                <ErrorMessage name={field.name} component={FormHelperText} error />
                            </div>
                        ))}

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            size='large'
                            sx={{ mt: 2, width: '80%', alignSelf: 'center' }}
                            disabled={isSubmitting}
                        >
                            {buttonText}
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default FormComponent;
