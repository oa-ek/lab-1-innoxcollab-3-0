import { observer } from "mobx-react-lite";
import { store, useStore } from "../../app/stores/store";
import { Box, Button, Stack } from "@mui/material";
import BasicModal from "../../app/common/modal/BasicModal";
import TagForm from "./TagForm";
import { Tag } from "../../app/models/Tag";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { LoadingButton } from "@mui/lab";
import { SyntheticEvent, useEffect, useState } from "react";

export default observer(function TagTable() {
    const { tagStore, modalStore } = useStore();
    const { tags, setSelectedTag, deleteTag,
        loading, buttonLoading, loadTags } = tagStore;

    function handleModalOpen(tag: Tag | undefined) {
        if (tag)
            setSelectedTag(tag);
        modalStore.handleOpen();
    }

    const [target, setTarget] = useState('');
    function handleTagDelete(_e: SyntheticEvent<HTMLButtonElement>, username: string) {
        setTarget(username);
        deleteTag(username);
    }

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Id',
            width: 300
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 300
        },
        {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            width: 200,
            renderCell: (params) => (
                <Stack direction="row" spacing={2}>
                    <Button
                        variant="contained"
                        onClick={() => handleModalOpen(params.row)}
                    >
                        Edit
                    </Button>
                    <LoadingButton
                        disabled={params.row.userName === store.userStore.user?.userName}
                        name={params.row.id}
                        onClick={(e) => handleTagDelete(e, params.row.id)}
                        variant="contained"
                        color="error"
                        loading={buttonLoading && target === params.row.id}
                    >
                        Delete
                    </LoadingButton>
                </Stack>
            )
        }
    ]

    useEffect(() => {
        loadTags();
    }, [loadTags])

    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box>
                <BasicModal>
                    <TagForm />
                </BasicModal>
                <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", my: 2 }}>
                    <Button variant="contained" onClick={() => handleModalOpen(undefined)}>Create</Button>
                </Box>
                <div style={{ width: "830px", height: "600px" }}>
                    <DataGrid
                        columns={columns}
                        rows={tags}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 20 },
                            },
                        }}
                        pageSizeOptions={[20, 100]}
                        disableRowSelectionOnClick
                        loading={loading}
                    />
                </div>
            </Box >
        </Box>

    )
})