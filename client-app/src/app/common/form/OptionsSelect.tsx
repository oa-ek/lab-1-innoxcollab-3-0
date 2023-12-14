import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useField } from "formik";
import { observer } from "mobx-react-lite";

interface Props {
    placeholder?: string;
    name: string;
    options: string[];
    label?: string;
}

export default observer(function OptionsSelect(props: Props) {
    const [_field, meta, helpers] = useField(props.name);

    return (
        <FormControl fullWidth>
            <InputLabel id={props.name}>{props.label}</InputLabel>
            <Select
                labelId={props.name}
                label={props.label}
                value={meta.value}
                onChange={(event) => helpers.setValue(event.target.value as string)}
            >
                {props.options.map((option, index) => (
                    <MenuItem key={option} value={index}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
});
