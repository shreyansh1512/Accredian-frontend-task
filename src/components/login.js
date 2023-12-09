import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

const initialState = {
    emailUsername: '',
    email: '',
    username: '',
    password: '',
    confpassword: '',
};

function Login() {


    const [isSignIn, setIsSignIn] = React.useState(true);
    const [formValues, setFormValues] = React.useState(initialState);
    const [emailError, setEmailError] = React.useState('');
    const [loginstat, setloginstat] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');

    const handleToggleSignIn = () => {
        setIsSignIn(!isSignIn);
        setEmailError('');
        setPasswordError('');
        setFormValues(initialState);
        setloginstat('');
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const validateEmail = (email) => {
        // Simple email validation
        const emailRegex = /^[^\s@]+@gmail\.com$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        // Password must be at least 8 characters long
        return password.length >= 8;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Reset error messages
        setEmailError('');
        setPasswordError('');
        setloginstat('');

        // Basic form validation
        if (isSignIn) {
            try {
                const response = await fetch('http://localhost:3001/api/submitSignInForm', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(formValues),
                });
            
                const data = await response.json();
            
                if (response.ok) {
                  console.log(data.message);
                  setFormValues(initialState);
                  setloginstat(data.message);
                } else {
                  console.error(data.message);
                  setPasswordError(data.message);
                }
              } catch (error) {
                console.error('Error submitting form:', error);
              }
        }
        else {
            if (!validateEmail(formValues['email'])) {
                setEmailError('Invalid email for Sign Up');
                return;
            }
            if (!validatePassword(formValues['password'])) {
                setPasswordError('Invalid password for Sign Up');
                return;
            }
            if (formValues['password'] !== formValues['confpassword']) {
                setPasswordError('Passwords do not match');
                return;
            }


            try {
                const response = await fetch('http://localhost:3001/api/submitSignUpForm', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(formValues),
                });
            
                const data = await response.json();
            
                if (response.ok) {
                  console.log(data.message);
                  setFormValues(initialState);
                  setloginstat(data.message);
                } else {
                  console.error(data.message);
                  setPasswordError(data.message);
                }
              } catch (error) {
                console.error('Error submitting form:', error);
              }
        }

        console.log(formValues);

        // Reset form values to initialState after submission
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>

                    </Avatar>

                    <Typography component="h1" variant="h5">
                        {isSignIn ? "Sign In" : "Sign Up"}
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

                        {!isSignIn && (
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                value={formValues.email}
                                onChange={handleChange}
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />)}
                        {!isSignIn && (<TextField
                            margin="normal"
                            required
                            fullWidth
                            value={formValues.username}
                            onChange={handleChange}
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                        />)}
                        {!isSignIn && (<TextField
                            margin="normal"
                            required
                            fullWidth
                            value={formValues.password}
                            onChange={handleChange}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />)}
                        {!isSignIn && (<TextField
                            margin="normal"
                            required
                            fullWidth
                            value={formValues.confpassword}
                            onChange={handleChange}
                            name="confpassword"
                            label="Confirm Password"
                            type="password"
                            id="confpassword"
                            autoComplete="current-password"
                        />)}



                        {isSignIn && (
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                value={formValues.emailUsername}
                                onChange={handleChange}
                                id="emailUsername"
                                label="Email Address or Username"
                                name="emailUsername"
                                autoComplete="email"
                                autoFocus
                            />)}
                        {isSignIn && (<TextField
                            margin="normal"
                            required
                            fullWidth
                            value={formValues.password}
                            onChange={handleChange}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />)}

                        {emailError && <Typography color="error">{emailError}</Typography>}
                        {passwordError && <Typography color="error">{passwordError}</Typography>}
                        {loginstat && <Typography color="green">{loginstat}</Typography>}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {isSignIn ? "Sign In" : "Sign Up"}
                        </Button>

                        <Grid container justifyContent={'center'}>
                            <Grid item>
                                <Button onClick={handleToggleSignIn} variant="body2">
                                    {isSignIn && (
                                        "Don't have an account? Sign Up"
                                    )}
                                    {!isSignIn && (
                                        "Already have an account? Sign In"
                                    )}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Login;