import { Avatar, Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Profile } from "../../../app/models/Profile";
import { useStore } from "../../../app/stores/store";

interface Props {
    profile: Profile;
}

export default observer(function ProfileHeader({ profile }: Props) {
    const { themeStore } = useStore();

    return (
        <Paper>
            <Grid container>
                <Grid item xs={8}>
                    <Box sx={{ height: "180px", pl: 2, display: "flex", alignItems: "center" }}>
                        <Avatar sx={{ height: "150px", width: "150px", mr: 2 }} src={profile.image} ></Avatar>
                        <Typography variant="h4">{profile.displayName}</Typography>
                    </Box>
                </Grid>
                {
                    profile.company && (
                        <Grid item xs={4}>
                            <Stack sx={{ height: "100%" }} spacing={1} alignItems="center" justifyContent="center">
                                <Stack direction="row" spacing={1}>
                                    <Typography variant="h6" color="primary">Publisher</Typography>
                                    <Typography variant="h6">for {profile.company.title}</Typography>
                                </Stack>
                                <Typography color={themeStore.fontColor} sx={{ textDecoration: "none" }}
                                    variant="h6" component="a" href={profile.company.url}>
                                    {profile.company.url}
                                </Typography>
                            </Stack>
                        </Grid>
                    )
                }
            </Grid>
        </Paper>
    )
});