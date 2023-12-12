import { Autocomplete, TextField, Typography } from "@mui/material";
import { useField } from "formik";

interface Props {
    placeholder: string;
    name: string;
    options: { label: string, value: string }[];
    label?: string;
}

export default function TextInput(props: Props) {
    const [field, meta, helpers] = useField(props.name);

    return (
        <>
            <Autocomplete
                options={props.options}
                clearOnEscape
                value={props.options.find(option => option.value === field.value) || null}
                getOptionLabel={option => option.label}
                placeholder={props.placeholder}
                onBlur={() => helpers.setTouched(true)}
                onChange={(_, d) => {
                    const selectedValue = d ? d.value : null;
                    helpers.setValue(selectedValue);
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder={props.placeholder}
                        sx={{ width: "100%" }}
                        label={props.label}
                        error={meta.touched && !!meta.error}
                    />
                )}
            />
            {meta.touched && meta.error ? (
                <Typography variant="body2" color="error" sx={{ mt: 1, ml: 1 }}>{meta.error}</Typography>
            ) : null}
        </>
    )
}

