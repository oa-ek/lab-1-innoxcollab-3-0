import { Container, CssBaseline, Box, Avatar, Typography, Checkbox, FormControlLabel, Grid, Link } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ErrorMessage, Form, Formik } from "formik";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import { LoadingButton } from "@mui/lab";
import TextInput from "../../app/common/TextInput";

export default observer(function LoginForm() {
    const { userStore } = useStore();

    const handleRememberMeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        userStore.setRememberMe(event.target.checked);
    };

    return (
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
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box sx={{ mt: 1 }}>
                    <Formik
                        initialValues={{ email: '', password: '', error: null }}
                        onSubmit={(values, { setErrors }) => userStore.login(values)
                            .catch(() => setErrors({ error: 'Invalid email or password!' }))}
                    >
                        {({ handleSubmit, isSubmitting, errors }) => (
                            <Form onSubmit={handleSubmit} autoComplete="off">
                                <TextInput label="Email" name="email" />
                                <TextInput type="password" label="Password" name="password" />
                                <ErrorMessage
                                    name='error'
                                    render={() =>
                                        <Typography
                                            variant="body2" color="error">
                                            {errors.error}
                                        </Typography>
                                    } 
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" onChange={handleRememberMeChange} />}
                                    label="Remember me"
                                />
                                <LoadingButton
                                    loading={isSubmitting}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </LoadingButton>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="/register" variant="body2">
                                            Don't have an account? Sign Up
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Box>
        </Container>
    )
})