import { Card, CardContent, Grid, Typography } from '@mui/material';
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
        <Card sx={{ my: 2 }}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={1}>
                        <InfoIcon color="success" />
                    </Grid>
                    <Grid item xs={11}>
                        <Typography variant="body1">
                            {event.shortDescription}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={1}>
                        <CalendarMonthIcon color="success" />
                    </Grid>
                    <Grid item xs={11}>
                        <Typography variant="body1">
                            {dayjs(event.date).format('dddd, DD/MM/YYYY HH:mm').toString()}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={1}>
                        <PlaceIcon color="success" />
                    </Grid>
                    <Grid item xs={11}>
                        <Typography variant="body1">
                            {event.venue}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
})