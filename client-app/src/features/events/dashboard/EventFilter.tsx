import { Box, Divider, ListItemText, MenuItem, MenuList, Paper, Typography } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Calendar from "react-calendar";

export default function ActivityFilter() {
    return (
        <>
            <Paper sx={{ my: "27px" }}>
                <MenuList>
                    <Box sx={{ p: 1, display: "flex", }}>
                        <FilterAltIcon fontSize="small" sx={{ mx: 1 }} />
                        <Typography>Filters</Typography>
                    </Box>
                    <Divider />
                    <MenuItem>
                        <ListItemText>All activities</ListItemText>
                    </MenuItem>
                    <MenuItem>
                        <ListItemText>I'm hosting</ListItemText>
                    </MenuItem>
                </MenuList>
            </Paper>
            <Calendar />
        </>

    )
} 