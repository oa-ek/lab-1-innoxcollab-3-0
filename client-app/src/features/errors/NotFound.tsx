import { Box, Button, Container, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <Container sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "80vh" }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                <Box display="flex">
                    <SearchIcon sx={{ fontSize: "100px" }} />
                    <Typography variant="h2" sx={{ m: 1 }}>Oops!</Typography>
                </Box>
                <Typography variant="h5">The page you've been looking for is nowhere to be found :(</Typography>
                <Button component={Link} to="/activities" variant="contained" sx={{ my: 1 }}>Return to activities</Button>
            </Box>
        </Container>
    )
}