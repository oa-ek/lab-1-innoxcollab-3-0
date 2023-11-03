import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { Container, Box, Typography, Paper } from "@mui/material";

export default observer(function ServerError() {
    const { commonStore } = useStore();
    return (
        <Container sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "80vh", flexDirection: "column" }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                <Box display="flex">
                    <Typography variant="h2" sx={{ m: 1 }}>Oops!</Typography>
                </Box>
                <Typography variant="h5">The Internal Server Error has occured!</Typography>
                <Typography variant="h5">Error message:
                    <Typography color="error">{commonStore.error?.message}</Typography>
                </Typography>
            </Box>
            <Paper sx={{ p: "12px", borderRadius: "10px" }}>
                <Typography variant="body1" color="teal">Stack Trace</Typography>
                <Typography variant="body2">{commonStore.error?.details}</Typography>
            </Paper>
        </Container>

    )
}) 