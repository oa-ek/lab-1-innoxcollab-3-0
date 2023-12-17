import { Box, CircularProgress } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useStore } from "../../../app/stores/store";
import ProfileCardHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";

export default observer(function ProfilePage() {
    const { username } = useParams();
    const { profileStore } = useStore();
    const { loadingProfile, loadProfile, profile, setActiveTab } = profileStore;

    useEffect(() => {
        if (username)
            loadProfile(username);
        return () => {
            setActiveTab(0);
        }
    }, [loadProfile, username, setActiveTab])

    if (loadingProfile) return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "800px" }}>
            <CircularProgress />
        </Box>
    )

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {profile &&
                <>
                    <ProfileCardHeader profile={profile} />
                    <ProfileContent profile={profile} />
                </>
            }
        </Box>
    )
})