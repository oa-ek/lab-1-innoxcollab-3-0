import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function HomePage() {
    const { userStore } = useStore();
    return (
        <Box className="masthead">
            <Container sx={{ display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
                <Box>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", cursor: "default" }}>
                        <Typography variant="h2">InnoXCollab</Typography>
                    </Box>
                    <Box textAlign="center" my="10px" >
                        <Typography variant="h5">Welcome to InnoXCollab</Typography>

                        {userStore.isLoggedIn ? (
                            <Button component={Link} to="/events"
                                variant="outlined" sx={{ color: "White", borderColor: "white", px: "20px", py: "10px", my: 1 }}>
                                Go to events
                            </Button>
                        ) : (
                            <Stack>
                                <Button component={Link} to="/login"
                                    variant="outlined" sx={{ color: "White", borderColor: "white", px: "20px", py: "10px", my: 1 }}>
                                    Sign in
                                </Button>
                                <Button component={Link} to="/register"
                                    variant="outlined" sx={{ color: "White", borderColor: "white", px: "20px", py: "10px", my: 1 }}>
                                    Sign Up
                                </Button>
                            </Stack>
                        )}

                    </Box>
                </Box>
            </Container>
        </Box >
    )
})