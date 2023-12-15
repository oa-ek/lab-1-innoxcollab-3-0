import { observer } from "mobx-react-lite";
import { Event } from "../../../app/models/Event";
import { Paper } from "@mui/material";
import { useStore } from "../../../app/stores/store";

interface Props {
    event: Event;
}


export default observer(function EventDetailedDescription({ event }: Props) {
    useStore();

    const descriptionHTML = { __html: event.description };

    return (
        <Paper sx={{p: 5}}>
            <div className="eventContent"
                dangerouslySetInnerHTML={descriptionHTML} />
        </Paper>
    );
});
