import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { Grid, Box } from "@mui/material";
import EventListItem from "./EventListItem";

export default observer(function EventList() {
    const { eventStore } = useStore();
    const { eventsByDate } = eventStore;

    return (
        <Box
            justifyContent="flex-end"
            sx={{ mb: "20px" }}
        >
            {eventsByDate.map((event) => (
                <Grid item xs={12} key={event.id}>
                    <EventListItem
                        event={event}
                    />
                </Grid>
            ))}
        </Box>
    )
});