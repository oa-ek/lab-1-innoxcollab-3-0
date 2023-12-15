import { Stack, Chip, Typography, IconButton, Button } from "@mui/material";
import { observer } from "mobx-react-lite";
import { EventBlock } from "../../app/models/EventBlock";
import AddIcon from '@mui/icons-material/Add';
import BasicModal from "../../app/common/modal/BasicModal";
import { useState } from "react";
import { useStore } from "../../app/stores/store";

interface Props {
    eventBlocks: EventBlock[];
    setEventBlock: (eventBlock: EventBlock) => void;
    openModal: (target: string) => void;
    deleteEventBlock: (id: string) => void;
    setTarget: (target: string) => void;
    setTouched: (touched: boolean) => void;
}

export default observer(function EventBlocks(
    { setEventBlock, openModal, eventBlocks, deleteEventBlock, setTarget,
        setTouched }: Props) {

    const { modalStore, themeStore } = useStore();
    const [blockId, setBlockId] = useState<string>();


    function handleOpenEventBlockForm(eventBlock: EventBlock) {
        setEventBlock(eventBlock);
        openModal('eventBlockForm');
    }

    function handleDeleteModalOpen(id: string) {
        setTarget('eventBlockDelete')
        setBlockId(id);
        modalStore.handleOpen();
    }

    function handleEventBlockDelete(id: string) {
        deleteEventBlock(id);
        modalStore.handleOpen();
        setTouched(true);
    }


    return (
        <>
            <Stack direction="row" alignItems="center" spacing={2}>
                <Typography variant="h5" sx={{ pl: "5px", }}>
                    Event blocks
                </Typography>
                <IconButton
                    sx={{ width: "40px", height: "40px" }}
                    onClick={() => openModal('eventBlockForm')}
                >
                    <AddIcon />
                </IconButton>
            </Stack>

            <Stack spacing={2} direction="row" alignItems="center">
                {eventBlocks?.map(block => (
                    <Chip color="primary" key={block.id} label={block.title}
                        onClick={() => handleOpenEventBlockForm(block)}
                        onDelete={() => handleDeleteModalOpen(block.id!)}
                    />
                ))}
            </Stack>

            <BasicModal>
                <Stack spacing={1}>
                    <Typography variant="h5" color={themeStore.fontColor}>Are you sure you wan't to delete this event block?</Typography>
                    <Button variant="contained" color="error" onClick={() => handleEventBlockDelete(blockId!)}>Delete</Button>
                </Stack>
            </BasicModal>
        </>
    )
})