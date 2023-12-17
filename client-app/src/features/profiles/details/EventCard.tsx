import { observer } from "mobx-react-lite";
import { Card, CardContent, Typography, Paper, Stack, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import { Event } from "../../../app/models/Event";
import { useStore } from "../../../app/stores/store";

interface Props {
    event: Event;
}

export default observer(function EventCard({ event }: Props) {
    const { themeStore } = useStore();

    return (
        <Paper>
            <Card sx={{ maxHeight: "400px", textDecoration: "none", display: "flex", alignItems: "center" }}>
                <Stack direction="column">
                    <CardContent>
                        <Stack direction="column" spacing={1} alignItems="flex-start" justifyContent="center">
                            <Typography color={themeStore.fontColor} sx={{ textDecoration: "none" }}
                                variant="h6" component={Link} to={`/events/${event.id}`}>
                                {event.title}
                            </Typography>
                            <Typography sx={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                                {event.shortDescription}
                            </Typography>
                            <Typography color="primary">{event.type.name}</Typography>
                            {
                                event.isCanceled ? (
                                    <Chip label="Canceled" color="error" />
                                ) : (
                                    <Chip
                                        label={event.status === 0 ? 'Planned'
                                            : event.status === 1 ? 'Active'
                                                : event.status === 2 ? 'Finished' : 'smt is wrong'}
                                        color={event.status === 0 ? 'primary'
                                            : event.status === 1 ? 'success'
                                                : event.status === 2 ? 'default' : 'error'}
                                    />
                                )
                            }
                        </Stack>
                    </CardContent>
                </Stack>
            </Card >
        </Paper>
    )
})