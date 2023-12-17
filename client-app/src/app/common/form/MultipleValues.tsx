import { useState } from 'react';
import { Autocomplete, Chip, TextField, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useField } from "formik";

interface Props {
    name: string;
    values: any[];
    options: any[];
    loading: boolean;
    label: string;
}

export default observer(function MultipleValues({ values, name, options, loading, label }: Props) {
    const [_field, meta, helpers] = useField(name);
    const [autocompleteValue, setAutocompleteValue] = useState<any[]>(values || []);

    return (
        <>
            <Autocomplete
                sx={{ width: "100%" }}
                multiple
                options={options}
                getOptionLabel={(option) => option.name || option.displayName || option.title}
                loading={loading}
                value={autocompleteValue}
                onChange={(_, newValue) => {
                    setAutocompleteValue(newValue);
                    helpers.setValue(newValue);
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderTags={(value: any[], getTagProps) =>
                    value.map((option: any, index: number) => (
                        <Chip
                            color="primary"
                            label={option.name || option.displayName || option.title}
                            {...getTagProps({ index })}
                        />
                    ))
                }
                renderInput={(params) => (
                    <>
                        <TextField
                            {...params}
                            error={meta.touched && !!meta.error}
                            label={label}
                        />
                    </>
                )}
            />
            {meta.touched && meta.error && (
                <Typography variant="body2" color="error" sx={{ mt: 1, ml: 1 }}>
                    {meta.error}
                </Typography>
            )}
        </>
    );
});