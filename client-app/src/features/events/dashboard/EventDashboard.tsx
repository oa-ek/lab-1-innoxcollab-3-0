import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { useEffect } from "react";
import { Container, Grid, Box, CircularProgress } from "@mui/material";
import EventList from "./EventList";
import EventFilter from "./EventFilter";

export default observer(function EventDashboard() {
    const { eventStore } = useStore();
    const { eventRegistry, loadEvents } = eventStore;

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
                    {
                        eventStore.loadingInitial && eventRegistry.size <= 1  ? (
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "800px" }}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <EventList />
                        )
                    }

                </Grid>
                <Grid item xs={5}>
                    {<EventFilter />}
                </Grid>
            </Grid>
        </Container>
    )
}) 