import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { useStore } from "../../../app/stores/store";
import ProfileEditForm from "./ProfileEditForm";

export default observer(function ProfileAbout() {
    const { profileStore } = useStore();
    const { isCurrentUserProfileOwner, profile } = profileStore;
    const [editMode, setEditMode] = useState(false);

    return (
        <Stack direction="column">
            <Stack direction="row" justifyContent="space-between">
                <Typography variant="h5">About</Typography>
                {
                    isCurrentUserProfileOwner &&
                    <Button
                        variant="outlined"
                        onClick={() => setEditMode(!editMode)}>
                        {editMode ? "Cancel" : "Edit Profile"}
                    </Button>
                }
            </Stack>
            <Grid item xs={12} sx={{ mt: 1 }}>
                {
                    editMode ? <ProfileEditForm setEditMode={setEditMode} /> :
                        <Typography sx={{ whiteSpace: "pre-wrap" }}>
                            {profile!.bio ? profile!.bio : "Bio is empty"}
                        </Typography>
                }
            </Grid>
        </Stack>
    );
})