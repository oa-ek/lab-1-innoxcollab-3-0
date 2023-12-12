import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { Container, Box, Typography, Paper } from "@mui/material";

export default observer(function ServerError() {
    const { commonStore, themeStore: { fontColor } } = useStore();
    return (
        <Container sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "80vh", flexDirection: "column" }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                <Box display="flex">
                    <Typography color={fontColor} variant="h2" sx={{ m: 1 }}>Oops!</Typography>
                </Box>
                <Typography color={fontColor} variant="h5">The Internal Server Error has occured!</Typography>
                <Typography color={fontColor} variant="h5">Error message:
                    <Typography color="error">{commonStore.error?.message}</Typography>
                </Typography>
            </Box>
            <Paper sx={{ p: "12px", borderRadius: "10px" }}>
                <Typography color={fontColor} variant="body1" >Stack Trace</Typography>
                <Typography color={fontColor} variant="body2">{commonStore.error?.details}</Typography>
            </Paper>
        </Container>

    )
}) 