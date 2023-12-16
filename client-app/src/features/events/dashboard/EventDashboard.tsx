import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { useEffect, useState } from "react";
import { Container, Box, CircularProgress } from "@mui/material";
import EventList from "./EventList";
import { PagingParams } from "../../../app/models/Pagination";
import { LoadingButton } from "@mui/lab";

export default observer(function EventDashboard() {
    const { eventStore } = useStore();
    const { eventRegistry, loadEvents, pagination, setPagingParams } = eventStore;
    const [loadingNext, setLoadingNext] = useState(false);

    function handleLoadingNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1));
        loadEvents().then(() => setLoadingNext(false));
    }

    useEffect(() => {
        if (eventRegistry.size <= 1) loadEvents();
    }, [loadEvents, eventRegistry.size])


    return (
        <Container sx={{ mt: 4 }}>
            {
                eventStore.loadingInitial && eventRegistry.size <= 1 ? (
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "800px" }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <EventList />
                        <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                            <LoadingButton
                                variant="outlined"
                                loading={loadingNext}
                                onClick={handleLoadingNext}
                                disabled={pagination?.totalPages === pagination?.currentPage}
                            >
                                Load more
                            </LoadingButton>
                        </Box>

                    </>
                )
            }
        </Container>
    )
}) 