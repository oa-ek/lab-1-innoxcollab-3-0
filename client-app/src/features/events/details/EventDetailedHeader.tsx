import dayjs from 'dayjs';
import { Event } from '../../../app/models/Event';
import { Card, CardContent, Typography, Button, Box, Chip } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';
import { LoadingButton } from '@mui/lab';


interface Props {
    event: Event;
}


export default observer(function EventDetailedHeader({ event }: Props) {
    const { eventStore: { loading, cancelEventToggle } } = useStore();

    return (
        <Card>
            <Box sx={{ position: "relative" }}>
                <Box
                    style={{ width: '100%', height: "320px", objectFit: 'cover', backgroundColor: "grey" }}>
                </Box>
                {event.isCanceled && 
                    <Chip color="error" label="Canceled" sx={{
                        position: 'absolute',
                        bottom: '85%',
                        left: '5%',
                    }} />
                }
                <Chip
                    color={event.eventType === "Hackathon" ? "success" : "error"}
                    label={event.eventType}
                    sx={{
                        position: 'absolute',
                        bottom: '80%',
                        right: '5%',
                    }} />
                <Box sx={{
                    position: 'absolute',
                    bottom: '10%',
                    left: '5%',
                    width: '100%',
                    height: 'auto',
                    color: 'white'
                }}>
                    <Typography variant="h5">
                        {event.title}
                    </Typography>
                    <Typography variant="subtitle1" >
                        {dayjs(event.date).format('dddd, DD/MM/YYYY HH:mm').toString()}
                    </Typography>
                    <Typography variant="subtitle1">
                        Author: <strong><Link to={`/profiles/${event.creatorProfile?.userName}`}>{event.creatorProfile?.displayName}</Link></strong>
                    </Typography>
                </Box>
            </Box>

            <CardContent>
                {event.isHost &&
                    <>
                        <LoadingButton color={event.isCanceled ? "success" : "error"}
                            variant="contained" onClick={cancelEventToggle} loading={loading}>
                            {event.isCanceled ? "Re-activate event" : "Cancel event"}
                        </LoadingButton>
                        <Button component={Link} to={`/manage/${event.id}`}
                            variant="contained" color="warning"
                            disabled={event.isCanceled}
                            sx={{ float: "right" }}>
                            Manage Event
                        </Button>
                    </>
                }
            </CardContent>
        </Card>
    );
})