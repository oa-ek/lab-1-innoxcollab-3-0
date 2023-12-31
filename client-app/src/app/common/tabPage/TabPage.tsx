import { Box } from "@mui/material";

interface Props {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export default function TabPage(props: Props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            style={{ minHeight: "320px" }}
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

