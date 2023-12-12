import { Box, Button, Container, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";
import { useStore } from "../../app/stores/store";

export default function NotFound() {
    const { themeStore: { fontColor } } = useStore();
    return (
        <Container sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "90vh" }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <SearchIcon color="primary" sx={{ fontSize: "100px" }} />
                    <Typography variant="h2" color={fontColor} sx={{ m: 1 }}>Oops!</Typography>
                </Box>
                <Typography color={fontColor} variant="h5">The page you've been looking for is nowhere to be found :(</Typography>
                <Button component={Link} to="/events" variant="contained" sx={{ my: 1 }}>Return to events</Button>
            </Box>
        </Container>
    )
} 