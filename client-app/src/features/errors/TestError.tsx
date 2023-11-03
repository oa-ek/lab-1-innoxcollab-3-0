import axios from 'axios';
import { Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import ValidationError from './ValidationError';

export default function TestErrors() {
    const baseUrl = 'http://localhost:5000/api/'
    const [errors, setErrors] = useState(null);

    function handleNotFound() {
        axios.get(baseUrl + 'buggy/not-found').catch(err => console.log(err.response));
    }

    function handleBadRequest() {
        axios.get(baseUrl + 'buggy/bad-request').catch(err => console.log(err.response));
    }

    function handleServerError() {
        axios.get(baseUrl + 'buggy/server-error').catch(err => console.log(err.response));
    }

    function handleUnauthorised() {
        axios.get(baseUrl + 'buggy/unauthorised').catch(err => console.log(err.response));
    }

    function handleBadGuid() {
        axios.get(baseUrl + 'activities/notaguid').catch(err => console.log(err.response));
    }

    function handleValidationError() {
        axios.post(baseUrl + 'activities', {}).catch(err => {setErrors(err); console.log(err)});
    }

    return (
        <>
            <Typography variant="h5">Test Error component</Typography>
            <Stack>
                <Button onClick={handleNotFound} variant="outlined">Not Found</Button>
                <Button onClick={handleBadRequest} variant="outlined">Bad Request</Button>
                <Button onClick={handleValidationError} variant="outlined">Validation Error</Button>
                <Button onClick={handleServerError} variant="outlined">Server Error</Button>
                <Button onClick={handleUnauthorised} variant="outlined">Unauthorised</Button>
                <Button onClick={handleBadGuid} variant="outlined">Bad Guid</Button>
            </Stack>
            {errors && <ValidationError errors={errors}/> }
        </>
    )
}
