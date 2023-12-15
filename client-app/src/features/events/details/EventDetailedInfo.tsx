import { Card, CardContent, Stack, Typography } from '@mui/material';
import { Event } from '../../../app/models/Event';
import InfoIcon from '@mui/icons-material/Info';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PlaceIcon from '@mui/icons-material/Place';
import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';

interface Props {
    event: Event;
}

export default observer(function EventDetailedInfo({ event }: Props) {
    return (
        <Card sx={{ my: 2, px: 4 }}>
            <CardContent>
                <Stack direction="row" spacing={2}>
                    <InfoIcon />
                    <Typography variant="body1">
                        {event.shortDescription}
                    </Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                    <CalendarMonthIcon />
                    <Typography variant="body1">
                        {dayjs(event.date).format('dddd, DD/MM/YYYY HH:mm').toString()}
                    </Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                    <PlaceIcon />
                    <Typography variant="body1">
                        {event.venue}
                    </Typography>
                </Stack>
            </CardContent>
        </Card >
    );
})