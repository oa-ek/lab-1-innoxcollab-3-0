import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { useEffect, useState } from "react";
import { Container, Box, CircularProgress, Grid, Typography } from "@mui/material";
import EventList from "./EventList";
import { PagingParams } from "../../../app/models/Pagination";
import { LoadingButton } from "@mui/lab";
import EventFilter from "./EventFilter";

export default observer(function EventDashboard() {
    const { eventStore, typeStore, themeStore } = useStore();
    const { eventRegistry, loadEvents, pagination, setPagingParams, predicate } = eventStore;
    const { types, loadTypes } = typeStore;
    const [loadingNext, setLoadingNext] = useState(false);

    function handleLoadingNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1));
        loadEvents().then(() => setLoadingNext(false));
    }

    useEffect(() => {
        if (eventRegistry.size === 0) {
            loadEvents();
            loadTypes();
        }
    }, [loadEvents, loadTypes, eventRegistry.size])


    return (
        <Container sx={{ mt: 4 }}>
            <Grid container spacing={3}>
                {
                    predicate.get('searchTerm') && predicate.get('searchTerm') !== "" && (
                        <Grid item xs={12}>
                            <Typography variant="h5" color={themeStore.fontColor}>
                                Search results for "{predicate.get('searchTerm')}":
                            </Typography>
                        </Grid>
                    )
                }
                <Grid item xs={2}>
                    <EventFilter types={types} />
                </Grid>
                <Grid item xs={10}>
                    {
                        !eventStore.loadingInitial && eventRegistry.size === 0 && (
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "800px" }}>
                                <Typography color={themeStore.fontColor} variant="h3">
                                    No events were found!
                                </Typography>
                            </Box>
                        )
                    }
                    {
                        eventStore.loadingInitial && eventRegistry.size === 0 && !loadingNext ? (
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "800px" }}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <>
                                <EventList />
                                {
                                    !(pagination?.totalPages === pagination?.currentPage) && !(eventRegistry.size === 0) && (
                                        <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                                            <LoadingButton
                                                variant="outlined"
                                                loading={loadingNext}
                                                onClick={handleLoadingNext}
                                            >
                                                Load more
                                            </LoadingButton>
                                        </Box>
                                    )
                                }

                            </>
                        )
                    }

                </Grid>
            </Grid>
        </Container>
    )
}) 