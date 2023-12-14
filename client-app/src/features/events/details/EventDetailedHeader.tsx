import { Event } from '../../../app/models/Event';
import { Card, Typography, Box, CardMedia, Stack, Chip, MenuItem } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';
import LongMenu from '../../../app/common/menus/LongMenu';

interface Props {
    event: Event;
}

export default observer(function EventDetailedHeader({ event }: Props) {
    const { themeStore, eventStore: { cancelEventToggle } } = useStore();

    return (
        <Card>
            <Box sx={{ height: "400px", display: "flex", alignItems: "center", mx: 5 }}>
                <Stack
                    spacing={1.5}
                    sx={{
                        height: "100%",
                        justifyContent: "flex-end",
                        direction: "column",
                        width: "60%",
                        mb: 15, mx: 5,
                        color: themeStore.fontColor
                    }}>
                    <Typography variant="h3" color="primary">
                        {event.title}
                    </Typography>
                    <Typography variant="h5">
                        Author: <Link style={{ textDecoration: "none", color: "white" }}
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
                    {event.isHost && (
                        <LongMenu>
                            <MenuItem component={Link} to={`/manage/${event.id}`}>Edit event</MenuItem>
                            <MenuItem onClick={cancelEventToggle}>{event.isCanceled ? "Re-activate event" : "Cancel event"} </MenuItem>
                        </LongMenu>
                    )}
                </Stack>
                <CardMedia sx={{
                    width: "300px", position: "relative",
                    display: "flex", height: "300px",
                    mr: 5, my: 10,
                    borderRadius: "75%", // Додаємо властивість для зроблення зображення круглим
                }}>
                    {/* <img src="https://assets-global.website-files.com/623b6654432a9010953e67cf/6257ebfa239b7de12105fee0_Subtract%20(3).svg"
                        style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            position: "absolute",
                            zIndex: 3,
                            top: 0, bottom: 0, left: 0, right: 0,
                            borderRadius: "75%", // Додаємо властивість для зроблення зображення круглим
                        }} /> */}
                    <img src={event.relatedPhoto} alt={event.title}
                        style={{
                            width: "100%", height: "100%", zIndex: 2,
                            position: "absolute", top: 0, bottom: 0, left: "auto", right: 0, overflow: "hidden",
                            borderRadius: "75%", // Додаємо властивість для зроблення зображення круглим
                        }} />
                </CardMedia>
            </Box>
        </Card >
    );
})