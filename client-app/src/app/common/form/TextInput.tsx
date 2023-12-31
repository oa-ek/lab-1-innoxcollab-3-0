import { Stack, TextField, Typography } from "@mui/material";
import { useField } from "formik";

interface Props {
    placeholder?: string;
    name: string;
    label?: string;
    ml?: boolean;
    type?: string;
    disabled?: boolean;
}

export default function TextInput(props: Props) {
    const [field, meta] = useField(props.name);
    const { ml, ...otherProps } = props;

    return (
        <Stack spacing={1} sx={{ width: "100%" }}>
            <TextField
                margin="normal"
                fullWidth
                multiline={ml}
                error={meta.touched && !!meta.error}
                label={props.label}
                placeholder={props.placeholder}
                {...field}
                {...otherProps}
            />
            {meta.touched && meta.error ? (
                <Typography variant="body2" color="error" sx={{ mt: 1, ml: 1 }}>{meta.error}</Typography>
            ) : null}
        </Stack>
    )
}
