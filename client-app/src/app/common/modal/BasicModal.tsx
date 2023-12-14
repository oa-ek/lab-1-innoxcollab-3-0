import { Box, Modal } from "@mui/material";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface Props {
    children?: React.ReactNode;
}

export default observer(function BasicModal({ children }: Props) {
    const { modalStore: { open, handleOpen } } = useStore();

    return (
        <Modal
            open={open}
            onClose={handleOpen}>
            <Box sx={style}>
                {children}
            </Box>
        </Modal>
    );
})