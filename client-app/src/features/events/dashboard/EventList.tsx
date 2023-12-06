import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { Grid, Typography, Box } from "@mui/material";
import EventListItem from "./EventListItem";

export default observer(function EventList() {
    const { eventStore } = useStore();
    const { groupedEvents } = eventStore;

    return (
        <>
            {
                groupedEvents.map(([group, events]) => (
                    <Grid key={group} container direction="column" justifyContent="flex-end">
                        <Typography variant="subtitle1"
                            sx={{ color: "teal" }}
                        >
                            {group}
                        </Typography>
                        <Box
                            justifyContent="flex-end"
                            sx={{ mb: "20px" }}
                        >
                            {events.map((event) => (
                                <Grid item xs={12} key={event.id}>
                                    <EventListItem
                                        event={event}
                                    />
                                </Grid>
                            ))}
                        </Box>
                    </Grid>
                ))
            }
        </>
    )

})