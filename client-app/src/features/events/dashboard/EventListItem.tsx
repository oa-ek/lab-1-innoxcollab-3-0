import { Paper, Typography, Button, Box, Chip, Stack } from "@mui/material";
import { Event } from "../../../app/models/Event";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useStore } from "../../../app/stores/store";

interface Props {
    event: Event;
}

export default observer(function EventListItem({ event }: Props) {
    const { themeStore } = useStore();
    return (
        <Paper
            sx={{
                padding: "16px",
                mb: 2,
            }}
        >
            <Stack
                direction="column"
                alignItems="center"
                sx={{ pt: 2, px: 2 }}>
                <Box sx={{
                    width: "100%"
                }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", mb: 1 }}>
                        <Stack>
                            <Typography color={themeStore.fontColor}
                                sx={{ textDecoration: "none" }}
                                variant="h6"
                                component={Link} to={`/manage/${event.id}`}>
                                {event.title}
                            </Typography>
                            <Typography>
                                Author: {event.creatorProfile?.displayName}
                            </Typography>
                        </Stack>
                    </Box>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Typography>
                            Type: {event.type.name}
                        </Typography>
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
                    <Box>
                        <Typography className="EventTag" sx={{ mt: "10px" }}>
                            {event.shortDescription}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                        {event.tags.map(tag => (
                            <Chip key={tag.id} color="primary" label={tag.name} />
                        ))}
                    </Box>
                </Box>
            </Stack>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                px: 2, pb: 2,
                mt: 2
            }}>
                <Box sx={{ alignSelf: "end", display: "flex", gap: 1 }}>
                    <Button
                        component={Link} to={`/events/${event.id}`}
                        className="viewListButton"
                        variant="contained"
                        disableElevation
                        sx={{ borderRadius: "4px" }}
                    >
                        View
                    </Button>
                </Box>
            </Box>
        </Paper >
    )
})