import { Typography } from "@mui/material";
import { DateTimeField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from "dayjs";
import { useField } from "formik";

interface Props {
    placeholder: string;
    name: string;
    label?: string;
}

export default function DateInput(props: Props) {
    const [field, meta, helpers] = useField(props.name);

    const value = field.value ? dayjs(field.value).toISOString() : dayjs().toISOString();
    const handleChange = (date: Dayjs | null) => {
        helpers.setValue(date ? date.toISOString() : ''); 
    }

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimeField
                    ampm={false}
                    {...props}
                    value={dayjs(value)} 
                    onChange={handleChange}
                />
            </LocalizationProvider>
            {meta.touched && meta.error ? (
                <Typography variant="body2" color="error" sx={{ mt: 1, ml: 1 }}>{meta.error}</Typography>
            ) : null}
        </>
    )
}