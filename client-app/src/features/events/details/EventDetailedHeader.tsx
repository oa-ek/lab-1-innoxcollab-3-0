import { Event } from '../../../app/models/Event';
import { Card, Typography, Stack, Chip, MenuItem, CardMedia } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';
import LongMenu from '../../../app/common/menus/LongMenu';

interface Props {
    event: Event;
}

export default observer(function EventDetailedHeader({ event }: Props) {
    const { eventStore: { cancelEventToggle } } = useStore();
    return (
        <Card>
            <Stack alignItems="center" justifyContent="center" sx={{ position: "relative", height: "800px" }}>
                {event.isHost && (
                    <div style={{ position: "absolute", top: 0, right: 0, padding: 20 }}>
                        <LongMenu>
                            <MenuItem component={Link} to={`/manage/${event.id}`}>Edit event</MenuItem>
                            <MenuItem onClick={cancelEventToggle}>{event.isCanceled ? "Re-activate event" : "Cancel event"} </MenuItem>
                        </LongMenu>
                    </div>
                )}
                <Stack
                    spacing={1.5}
                    direction="column"
                    alignItems="center">
                    <Typography variant="h3" color="primary">
                        {event.title}
                    </Typography>
                    <Typography variant="h5">
                        Author: <Link style={{ textDecoration: "none" }}
                            to={`/profiles/${event.creatorProfile?.userName}`}>
                            {event.creatorProfile?.displayName}
                        </Link>
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Typography variant="h5">{event.eventType}</Typography>
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
                    <Stack direction="row" spacing={2} alignItems="center">
                        {event.tags.map(tag => (
                            <Chip key={tag.id} label={tag.name} color="primary" />
                        ))}
                    </Stack>
                    {
                        event.relatedPhoto && (
                            <CardMedia>
                                <img src={event.relatedPhoto} alt={event.title} style={{ maxHeight: "450px" }} />
                            </CardMedia>
                        )
                    }

                </Stack>
            </Stack>
        </Card >
    );
})