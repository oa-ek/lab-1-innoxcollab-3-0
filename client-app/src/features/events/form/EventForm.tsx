import { SyntheticEvent, useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { LoadingButton } from "@mui/lab";
import { Paper, Stack, Button, Typography, Box, Grid } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { EventFormValues } from "../../../app/models/Event";
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import { v4 as uuid } from 'uuid'
import TextInput from "../../../app/common/form/TextInput";
import DateInput from "../../../app/common/form/DateInput";
import { router } from "../../../app/router/Routes";
import MultipleValues from "../../../app/common/form/MultipleValues";

export default observer(function EventForm() {
    const { eventStore } = useStore();
    const { createEvent, updateEvent,
        loadEvent, deleteEvent, loading, selectedEvent } = eventStore;

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

    const [target, setTarget] = useState('');
    function handleEventDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteEvent(id);
        router.navigate('/events');
    }

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
                                <TextInput name="title" label="Title" />
                                <TextInput ml name="description" label="Description" />
                                <TextInput name="shortDescription" label="Short Description" />
                                <MultipleValues key={event.id ? "update" : "create"} name="tags"
                                    eventTags={event.id ? selectedEvent?.tags : []} />
                                <DateInput name="date" label="Date" />
                                <TextInput name="venue" label="Venue" />

                                <Grid container direction="row">
                                    <Grid item xs={2}>
                                        {id &&
                                            <LoadingButton
                                                name={event.id}
                                                onClick={(e) => handleEventDelete(e, event.id!)}
                                                variant="contained"
                                                color="error"
                                                loading={loading && target === event.id}
                                            >
                                                Delete
                                            </LoadingButton>
                                        }
                                    </Grid>
                                    <Grid item xs={10}>
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
                                    </Grid>
                                </Grid>
                            </Stack>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Box>
    )
})