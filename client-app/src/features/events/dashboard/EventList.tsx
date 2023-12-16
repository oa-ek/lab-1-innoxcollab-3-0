import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { Grid } from "@mui/material";
import EventListItem from "./EventListItem";

export default observer(function EventList() {
    const { eventStore } = useStore();
    const { eventsByDate } = eventStore;

    return (
        <Grid
            container
            spacing={4}
            sx={{ mb: "20px" }}
        >
            {eventsByDate.map((event) => (
                <Grid item xs={6} key={event.id}>
                    <EventListItem
                        event={event}
                    />
                </Grid>
            ))}
        </Grid>
    )
});