import { Autocomplete, Chip, TextField, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Tag } from "../../models/Tag";
import { useStore } from "../../stores/store";
import { useEffect, useState } from "react";
import { useField } from "formik";
import BasicModal from "../modal/BasicModal";
import TagForm from "../../../features/tags/TagForm";

interface Props {
    name: string;
    eventTags: Tag[];
}

export default observer(function MultipleValues({ eventTags, name }: Props) {
    const [_field, meta, helpers] = useField(name);
    const { tagStore: { tags, loading, loadTags } } = useStore();
    const [autocompleteValue, setAutocompleteValue] = useState<Tag[]>(eventTags || []);

    useEffect(() => {
        loadTags();
    }, [loadTags, setAutocompleteValue, eventTags]);

    return (
        <>
            <Autocomplete
                multiple
                options={tags}
                getOptionLabel={(option) => option.name}
                loading={loading}
                value={autocompleteValue}
                onChange={(_, newValue) => {
                    setAutocompleteValue(newValue);
                    helpers.setValue(newValue);
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderTags={(value: Tag[], getTagProps) =>
                    value.map((tag: Tag, index: number) => (
                        <Chip
                            color="primary"
                            label={tag.name}
                            {...getTagProps({ index })}
                        />
                    ))
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        error={meta.touched && !!meta.error}
                        label="Tags"
                    />
                )}
            />
            {meta.touched && meta.error && (
                <Typography variant="body2" color="error" sx={{ mt: 1, ml: 1 }}>
                    {meta.error}
                </Typography>
            )}

            <BasicModal>
                <TagForm />
            </BasicModal>
        </>
    );
});
