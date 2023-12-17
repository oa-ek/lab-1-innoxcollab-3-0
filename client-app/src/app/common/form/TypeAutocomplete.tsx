import { useEffect, useState } from 'react';
import { Autocomplete, Stack, TextField, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { useField } from "formik";
import { Type } from '../../models/Type';

interface Props {
    name: string;
    type: Type;
}

export default observer(function TypeAutocomplete({ name, type }: Props) {
    const [_field, meta, helpers] = useField(name);
    const { typeStore: { types, loadingTypes, loadTypes } } = useStore();
    const [autocompleteValue, setAutocompleteValue] = useState<Type>(type);

    useEffect(() => {
        loadTypes();
    }, [loadTypes, setAutocompleteValue, type]);

    return (
        <Stack direction="column" sx={{ width: "100%" }}>
            <Autocomplete
                options={types}
                getOptionLabel={(option) => option.name}
                loading={loadingTypes}
                value={autocompleteValue || null}
                onChange={(_, newValue) => {
                    setAutocompleteValue(newValue!);
                    helpers.setValue(newValue);
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                    <>
                        <TextField
                            {...params}
                            error={meta.touched && !!meta.error}
                            label="Type"
                        />
                    </>
                )}
            />
            {meta.touched && meta.error && (
                <Typography variant="body2" color="error" sx={{ mt: 1, ml: 1 }}>
                    {meta.error}
                </Typography>
            )}
        </Stack>
    );
});