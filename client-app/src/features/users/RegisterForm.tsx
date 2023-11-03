import { Container, CssBaseline, Box, Avatar, Typography, Grid, Link } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ErrorMessage, Form, Formik } from "formik";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import { LoadingButton } from "@mui/lab";
import * as Yup from 'yup'
import ValidationError from "../errors/ValidationError";
import TextInput from "../../app/common/TextInput";

export default observer(function RegisterForm() {
    const { userStore } = useStore();
    const validationSchema = Yup.object({
        displayName: Yup.string().required(),
        username: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
    })

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
                    Sign up
                </Typography>
                <Box sx={{ mt: 1, width: "100%" }}>
                    <Formik
                        initialValues={{ displayName: '', username: '', email: '', password: '', error: null }}
                        onSubmit={(values, { setErrors }) => userStore.register(values)
                            .catch(error => setErrors({ error }))}
                        validationSchema={validationSchema}
                    >
                        {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                            <Form onSubmit={handleSubmit} autoComplete="off">
                                <TextInput label="Display Name" name="displayName" />
                                <TextInput label="Username" name="username" />
                                <TextInput label="Email" name="email" />
                                <TextInput type="password" placeholder="Password" name="password" />
                                <ErrorMessage
                                    name='error'
                                    render={() =>
                                        <ValidationError errors={errors.error as unknown as string[]} />
                                    }
                                />
                                <LoadingButton
                                    disabled={!isValid || !dirty || isSubmitting}
                                    loading={isSubmitting}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign Up
                                </LoadingButton>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link href="/login" variant="body2">
                                            Already have an account? Sign in
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