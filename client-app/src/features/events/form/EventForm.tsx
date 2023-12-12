import { SyntheticEvent, useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { LoadingButton } from "@mui/lab";
import { Paper, Stack, Button, Typography, Grid, IconButton } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { EventFormValues } from "../../../app/models/Event";
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import { v4 as uuid } from 'uuid'
import TextInput from "../../../app/common/form/TextInput";
import DateInput from "../../../app/common/form/DateInput";
import { router } from "../../../app/router/Routes";
import MultipleValues from "../../../app/common/form/MultipleValues";
import AddIcon from '@mui/icons-material/Add';
import BasicModal from "../../../app/common/modal/BasicModal";
import TagForm from "../../tags/TagForm";
import OptionsSelect from "../../../app/common/form/OptionsSelect";
import WysiwygEditor from "../../../app/common/form/WysiwygEditor";

export default observer(function EventForm() {
    const { eventStore, modalStore } = useStore();
    const { createEvent, updateEvent,
        loadEvent, deleteEvent, loading, selectedEvent } = eventStore;

    const { id } = useParams();
    const navigate = useNavigate();

    const [event, setEvent] = useState<EventFormValues>(new EventFormValues())

    const validationSchema = Yup.object({
        title: Yup.string().required('The event title is required').max(40, 'Title must be at most 40 characters'),
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

    const statusOptions = [
        'Active',
        'Finished',
        'Planned'
    ]

    return (
        <Paper sx={{ p: "12px", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={event}
                onSubmit={
                    values => handleFormSubmit(values)
                }
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form onSubmit={handleSubmit}
                        style={{ width: "90%" }}>
                        <Stack spacing={1}>
                            <Typography variant="h6">Event Details</Typography>
                            <Stack direction="row" spacing={2}>
                                <TextInput name="title" label="Title" />
                                <TextInput name="shortDescription" label="Short Description" />
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <DateInput name="date" label="Date" />
                                <TextInput name="venue" label="Venue" />
                            </Stack>

                            <Stack direction="row" spacing={2}>
                                <Stack direction="row" spacing={1} alignItems="center" sx={{ width: "100%" }}>
                                    <MultipleValues key={event.id ? "update" : "create"} name="tags"
                                        eventTags={event.id ? selectedEvent!.tags : []} />
                                    <IconButton
                                        sx={{ width: "40px", height: "40px" }}
                                        onClick={modalStore.handleOpen}
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </Stack>
                                <OptionsSelect label="Status" name="status" options={statusOptions} />
                            </Stack>
                            <WysiwygEditor name="description" />

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

            <BasicModal>
                <TagForm />
            </BasicModal>
        </Paper >
    )
})