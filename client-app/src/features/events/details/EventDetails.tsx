import { Grid } from "@mui/material";
import { observer } from "mobx-react-lite"
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedDescription from "./EventDetailedDescription";

export default observer(function EventDetails() {
    const { eventStore } = useStore();
    const { selectedEvent: event, loadEvent, loadingInitial } = eventStore;
    const { id } = useParams();

    useEffect(() => {
        if (id) loadEvent(id);
    }, [id, loadEvent])

    if (loadingInitial || !event) return <LoadingComponent />

    return (
        <Grid
            container
            justifyContent="center"
            direction="row"
            spacing={4}
        >
            <Grid item xs={12}>
                <EventDetailedHeader event={event} />
                <EventDetailedInfo event={event} />
                <EventDetailedDescription event={event} />
            </Grid>
        </Grid>
    )
}) 