import { observer } from "mobx-react-lite";
import { Event } from "../../../app/models/Event";
import { Typography } from "@mui/material";
import { useStore } from "../../../app/stores/store";

interface Props {
    event: Event;
}


export default observer(function EventDetailedDescription({ event }: Props) {
    const { themeStore } = useStore();

    const descriptionHTML = { __html: event.description };

    return (
        <>
            <Typography variant="h2" color={themeStore.fontColor}>About event</Typography>
            <div className="eventContent"
                dangerouslySetInnerHTML={descriptionHTML} />
        </>
    );
});
