import {Box, Button, Typography} from "@mui/material";
import { observer } from "mobx-react-lite";
import {Link} from "react-router-dom";

export default observer(function HomePage() {
    return (
        <Box
            className="containerH"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh", // This ensures the container takes up the full viewport height
            }}
        >
            <Box sx={{ textAlign: "center" }}>
                <Box className="colH">
                    <Typography variant="h1" className="h1H">
                        InnoXCollab
                    </Typography>
                    <Typography
                        variant="body1"
                        className="pH"
                        sx={{
                            marginBottom: 2,
                            textAlign: "center",
                            fontSize: "24px",
                        }}
                    >
                        Every exciting event is a step towards your success. Unleash your
                        potential with our informational portal!
                    </Typography>
                    <Box>
                        <Button
                            variant="contained"
                            color="primary"
                            className="buttonH"
                            type="button"
                            sx={{
                                borderRadius: "20px",
                                marginTop: 1,
                                backgroundColor: "white",
                                color: "black",
                            }}
                            component={Link} to="/events"
                        >
                            Explore Events
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
});