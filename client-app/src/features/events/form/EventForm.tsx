import { useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { LoadingButton } from "@mui/lab";
import { Paper, Stack, Button, Typography, Box } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { EventFormValues } from "../../../app/models/Event";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import { v4 as uuid } from 'uuid'
import TextInput from "../../../app/common/TextInput";
import DateInput from "../../../app/common/DateInput";

export default observer(function EventForm() {
    const { eventStore } = useStore();
    const { createEvent, updateEvent,
        loadEvent, loadingInitial } = eventStore;

    const { id } = useParams();
    const navigate = useNavigate();

    const [event, setEvent] = useState<EventFormValues>(new EventFormValues())

    const validationSchema = Yup.object({
        title: Yup.string().required('The event title is required'),
        shortDescription: Yup.string().required('The event short description is required'),
        description: Yup.string().required('The event description is required'),
        date: Yup.string().required('The event date is required'),
        venue: Yup.string().required('The event venue is required'),
    })

    useEffect(() => {
        if (id) loadEvent(id).then(event => setEvent(new EventFormValues(event)));
    }, [id, loadEvent])


    function handleFormSubmit(event: EventFormValues) {
        if (!event.id) {
            event.id = uuid();
            createEvent(event).then(() => navigate(`/events/${event.id}`))
        }
        else {
            updateEvent(event).then(() => navigate(`/events/${event.id}`))
        }
    }

    if (loadingInitial) return <LoadingComponent />

    return (
        <Box sx={{ height: "100vh" }}>

            <Paper sx={{ p: "12px", borderRadius: "10px" }}>
                <Formik
                    validationSchema={validationSchema}
                    enableReinitialize
                    initialValues={event}
                    onSubmit={values => handleFormSubmit(values)}
                >
                    {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                        <Form onSubmit={handleSubmit} autoComplete="off" >
                            <Stack spacing={1}>
                                <Typography variant="h6">Event Details</Typography>
                                <TextInput name="title" placeholder="Title" />
                                <TextInput ml name="description" placeholder="Description" />
                                <TextInput name="shortDescription" placeholder="Short Description" />
                                <DateInput name="date" placeholder="Date" />
                                <TextInput name="venue" placeholder="Venue" />

                                <Stack direction="row" spacing={1} justifyContent="flex-end">
                                    <Button variant="contained" component={Link} to={`/events/${event.id}`}>
                                        Cancel
                                    </Button>
                                    <LoadingButton
                                        disabled={isSubmitting || !dirty || !isValid}
                                        loading={isSubmitting} variant="contained" type="submit">
                                        Submit
                                    </LoadingButton>
                                </Stack>
                            </Stack>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Box>
    )
})