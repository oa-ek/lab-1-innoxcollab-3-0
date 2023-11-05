import { Divider, Paper, Typography, Button, Box, Chip } from "@mui/material";
import { Event } from "../../../app/models/Event";
import './fad.css'
import { LoadingButton } from "@mui/lab";
import { SyntheticEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import dayjs from "dayjs";

interface Props {
    event: Event;
}

export default observer(function EventList({ event }: Props) {
    const { eventStore } = useStore();
    const { deleteEvent, loading } = eventStore;

    const [target, setTarget] = useState('');

    function handleEventDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteEvent(id);
    }


    return (
        <Paper
            sx={{
                padding: "16px",
                mb: 2,
            }}
        >
            {event.isCanceled &&
                <Chip color="error" label="Canceled" sx={{ mt: 1, ml: 2 }} />
            }
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    pt: 2, px: 2,
                }}>
                <Box sx={{
                    width: "100%"
                }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", mb: 2 }}>
                        {/*<span className="user-image">
                            <img src="/assets/user.png" alt="Host Image" />
                        </span>*/}
                        <div>
                            <Typography className="EventTag" variant="h6">
                                {event.title}
                            </Typography>
                            <Typography className="EventTag" variant="subtitle1">
                                Author: {event.creatorProfile?.displayName}
                            </Typography>
                            {event.isHost &&
                                <Box sx={{ border: "1px solid orange", p: 0.5 }}>
                                    <Typography color="orange" className="EventTag" variant="body2">
                                        You are hosting this event
                                    </Typography>
                                </Box>
                            }
                        </div>
                        <span> 
                            <Chip color={event.eventType === "Hackathon" ? "success" : "error"}
                                variant="outlined" label={event.eventType} />
                        </span>
                    </Box>
                    <Divider variant="middle" sx={{ my: "7px" }} />
                    <Box display="flex">
                        <AccessTimeIcon color="action" />
                        <Typography className="EventTag" variant="body1"
                            sx={{ ml: "4px" }}
                        >
                            {dayjs(event.date).format('dddd, DD/MM/YYYY HH:mm').toString()}
                        </Typography>
                    </Box>
                    <Box display="flex">
                        <LocationOnIcon color="action" />
                        <Typography className="EventTag" variant="body1"
                            sx={{ ml: "4px" }}
                        >
                            {event.venue}
                        </Typography>
                    </Box>
                    <Box >
                        <Typography className="EventTag" variant="body2" sx={{ mt: "10px" }}>
                            {event.shortDescription}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                        {event.tags.map(tag => (
                            <Chip key={tag.id} color="primary" label={tag.name} sx={{ mt: 1, mr: 1 }} />
                        ))}
                    </Box>
                </Box>
            </Box>

            <Box sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                px: 2, pb: 2,
                mt: 2
            }}>
                <Box sx={{ alignSelf: "end", display: "flex", gap: 1 }}>
                    <LoadingButton
                        name={event.id}
                        className="viewListButton"
                        onClick={(e) => handleEventDelete(e, event.id)}
                        variant="contained"
                        disableElevation
                        color="error"
                        sx={{ borderRadius: "4px" }}
                        loading={loading && target === event.id}
                    >
                        Delete
                    </LoadingButton>
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