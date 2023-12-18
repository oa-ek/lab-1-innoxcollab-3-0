import { FormControlLabel, FormLabel, IconButton, Paper, Radio, RadioGroup, Stack } from "@mui/material";
import { Type } from "../../../app/models/Type";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import ClearIcon from '@mui/icons-material/Clear';

interface Props {
    types: Type[];
}

export default observer(function ActivityFilter({ types }: Props) {
    const { eventStore } = useStore();
    const { predicate, setPredicate, removePredicate } = eventStore;

    function handleCheckBoxChange(key: string, value: string) {
        setPredicate(key, value);
    }

    return (
        <>
            <Paper>
                <RadioGroup sx={{ pl: 2, pt: 2 }}
                    value={predicate.get('statuses') || ""}
                    onChange={(e) => handleCheckBoxChange('statuses', e.target.value)}
                >
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <FormLabel>Status</FormLabel>
                        <IconButton onClick={() => removePredicate('statuses')}>
                            <ClearIcon fontSize="small" />
                        </IconButton>
                    </Stack>
                    <FormControlLabel
                        value='0'
                        control={
                            <Radio />
                        }
                        label="Planned"
                    />
                    <FormControlLabel
                        value='1'
                        control={
                            <Radio />
                        }
                        label="Active"
                    />
                    <FormControlLabel
                        value='2'
                        control={
                            <Radio />
                        }
                        label="Finished"
                    />
                </RadioGroup>
                <RadioGroup sx={{ pl: 2 }}
                    value={predicate.get('eventTypes') || ""}
                    onChange={(e) => handleCheckBoxChange('eventTypes', e.target.value)}
                >
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <FormLabel>Type</FormLabel>
                        <IconButton onClick={() => removePredicate('eventTypes')}>
                            <ClearIcon fontSize="small" />
                        </IconButton>
                    </Stack>
                    {types.map((type) => (
                        <FormControlLabel
                            value={type.name}
                            key={type.id}
                            control={
                                <Radio />
                            }
                            label={type.name}
                        />
                    ))}
                </RadioGroup>
            </Paper>
        </>
    );
})