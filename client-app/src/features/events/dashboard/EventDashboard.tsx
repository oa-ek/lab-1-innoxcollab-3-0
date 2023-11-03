import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { Fragment, useEffect } from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import EventList from "./EventList";
import EventFilter from "./EventFilter";

export default observer(function EventDashboard() {
    const { eventStore } = useStore();
    const { eventRegistry, loadEvents, groupedEvents } = eventStore;

    useEffect(() => {
        if (eventRegistry.size <= 1) loadEvents();
    }, [loadEvents, eventRegistry.size])


    return (
        <Container sx={{ mt: 4 }}>
            <Grid
                container
                justifyContent="center"
                alignContent="center"
                justifyItems="center"
                direction="row"
                spacing={4}
            >
                <Grid item xs={7}>
                    {groupedEvents.map(([group, events]) => (
                        <Fragment key={group}>
                            <Grid container direction="column" justifyContent="flex-end">
                                <Typography variant="subtitle1"
                                    sx={{

                                        color: "teal"
                                    }}
                                >
                                    {group}
                                </Typography>
                                <Box
                                    justifyContent="flex-end"
                                    sx={{
                                        mb: "20px",
                                    }}
                                >
                                    {events.map((event) => (
                                        <Grid item xs={12} key={event.id}>
                                            <EventList
                                                event={event}
                                            />
                                        </Grid>
                                    ))}
                                </Box>
                            </Grid>
                        </Fragment>
                    ))}

                </Grid>
                <Grid item xs={5}>
                    {<EventFilter />}
                </Grid>
            </Grid>
        </Container>
    )
})