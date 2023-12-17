import { Box, Grid, Paper, Tab, Tabs } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Profile } from "../../../app/models/Profile";
import { useStore } from "../../../app/stores/store";
import TabPage from "../../../app/common/tabPage/TabPage";
import ProfileAbout from "./ProfileAbout";
import EventCard from "./EventCard";

function allyProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

interface Props {
    profile: Profile;
}

export default observer(function ProfileContent({ profile }: Props) {
    const { profileStore } = useStore();

    const [value, setValue] = useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        profileStore.setActiveTab(newValue);
    };

    return (
        <Paper>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="About" {...allyProps(0)} />
                        <Tab label="Events" {...allyProps(1)} />
                    </Tabs>
                </Box>
                <TabPage value={value} index={0}>
                    <ProfileAbout />
                </TabPage>
                <TabPage value={value} index={1}>
                    <Grid container spacing={2}>
                        {profile.events.map(event => (
                            <Grid key={event.id} item xs={4}>
                                <EventCard event={event} />
                            </Grid>
                        ))}
                    </Grid>
                </TabPage>
            </Box>
        </Paper>
    );
})