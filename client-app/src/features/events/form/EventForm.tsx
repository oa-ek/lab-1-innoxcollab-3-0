import { SyntheticEvent, useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { LoadingButton } from "@mui/lab";
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
import { Paper, Stack, Typography, IconButton, Grid, Button, Box, CircularProgress } from "@mui/material";
import TextEditor from "../../../app/common/form/textEditor/TextEditor";
import CloudinaryPhotoUpload from "../../../app/common/imageUpload/CloudinaryPhotoUpload";
import EventBlockForm from "../../eventBlocks/EventBlockForm";
import { EventBlock } from "../../../app/models/EventBlock";
import EventBlocks from "../../eventBlocks/EventBlocks";
import TypeAutocomplete from "../../../app/common/form/TypeAutocomplete";

export default observer(function EventForm() {
    const { eventStore, modalStore } = useStore();
    const { createEvent, updateEvent, loadingInitial,
        loadEvent, deleteEvent, loading: loadingEvents, selectedEvent } = eventStore;

    const { id } = useParams();
    const navigate = useNavigate();

    const [event, setEvent] = useState<EventFormValues>(new EventFormValues());

    const { tagStore: { tags, loading, loadTags } } = useStore();

    const [eventBlocks, setEventBlocks] = useState<EventBlock[]>([]);
    const [eventBlock, setEventBlock] = useState<EventBlock>();

    const [touched, setTouched] = useState(false);

    useEffect(() => {
        if (id) loadEvent(id).then(event => {
            setEvent(new EventFormValues(event));
            setEventBlocks(event!.blocks);
        });
        loadTags();
    }, [id, loadEvent, loadTags]);

    function handleEventBlockSubmit(_eventBlock: EventBlock) {
        if (eventBlock) {
            editEventBlock(eventBlock.id!, _eventBlock);
        } else {
            addEventBlock(_eventBlock);
        }
        modalStore.handleOpen();
    };

    function addEventBlock(eventBlock: EventBlock) {
        setEventBlocks([...eventBlocks, { ...eventBlock, id: uuid() }]);
    };

    function editEventBlock(id: string, updatedEventBlock: EventBlock) {
        setEventBlocks(eventBlocks.map(block => (block.id === id ? { ...block, ...updatedEventBlock } : block)));
    };

    function deleteEventBlock(id: string) {
        setEventBlocks(eventBlocks.filter(block => block.id !== id));
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('The event title is required').max(40, 'Title must be at most 40 characters'),
        shortDescription: Yup.string().required('The event short description is required'),
        description: Yup.string().required('The event description is required'),
        date: Yup.string().required('The event date is required'),
        venue: Yup.string().required('The event venue is required'),
        type: Yup.object().required('The event type is required!'),
        fundingAmount: Yup.number().required('The event funding amount is required')
            .min(0, 'Funding amount must be more or equal than 0')
    })

    function handleFormSubmit(event: EventFormValues) {
        event.blocks = eventBlocks;
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

    function openModal(modalName: string) {
        setTarget(modalName);
        modalStore.handleOpen();
    }

    const statusOptions = [
        'Planned',
        'Active',
        'Finished',
    ]

    if (loadingInitial) return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "800px" }}>
            <CircularProgress />
        </Box>
    )

    return (
        <Paper sx={{ p: 2, display: "flex", justifyContent: "center", alignItems: "center" }}>
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
                                <TextInput name="venue" label="Venue" />
                                <DateInput name="date" label="Date" />
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <TypeAutocomplete name="type" type={selectedEvent?.type!} />
                                <TextInput name="fundingAmount" label="Funding amount" />
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <Stack direction="row" spacing={1} alignItems="center" sx={{ width: "100%" }}>
                                    <MultipleValues key={event.id ? "update" : "create"} name="tags"
                                        values={event.id ? selectedEvent!.tags : []}
                                        loading={loading}
                                        options={tags}
                                        label="Tags"
                                    />
                                    <IconButton
                                        sx={{ width: "40px", height: "40px" }}
                                        onClick={() => openModal('tagForm')}
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </Stack>
                                <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
                                    <OptionsSelect label="Status" name="status" options={statusOptions} />
                                    <Button variant="outlined" fullWidth
                                        onClick={() => openModal('photoUpload')}
                                    >
                                        View Related Photo
                                    </Button>
                                </Stack>
                            </Stack>
                            <EventBlocks
                                deleteEventBlock={deleteEventBlock}
                                eventBlocks={eventBlocks} setEventBlock={setEventBlock}
                                openModal={openModal} setTarget={setTarget}
                                setTouched={setTouched} />

                            <TextEditor name="description" />

                            <Grid container direction="row">
                                <Grid item xs={2}>
                                    {id &&
                                        <LoadingButton
                                            name={event.id}
                                            onClick={(e) => handleEventDelete(e, event.id!)}
                                            variant="contained"
                                            color="error"
                                            loading={loadingEvents && target === event.id}
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
                                            disabled={(isSubmitting || !dirty || !isValid) && !touched}
                                            loading={isSubmitting} variant="contained" type="submit">
                                            Submit
                                        </LoadingButton>
                                    </Stack>
                                </Grid>
                                {
                                    target === 'photoUpload' && (
                                        <BasicModal>
                                            <CloudinaryPhotoUpload name="relatedPhoto" />
                                        </BasicModal>
                                    )
                                }
                                {
                                    target === 'eventBlockForm' && (
                                        <BasicModal>
                                            <EventBlockForm initialEventBlock={eventBlock}
                                                onSubmit={handleEventBlockSubmit} setTouched={setTouched} />
                                        </BasicModal>
                                    )
                                }
                            </Grid>
                        </Stack>
                    </Form>
                )}
            </Formik>
            {
                target === 'tagForm' && (
                    <BasicModal>
                        <TagForm />
                    </BasicModal>
                )
            }
        </Paper >

    )
})