import { observer } from "mobx-react-lite";
import { store, useStore } from "../../app/stores/store";
import { Box, Button, Stack, Typography } from "@mui/material";
import BasicModal from "../../app/common/modal/BasicModal";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import { Type } from "../../app/models/Type";
import TypeForm from "./TypeForm";

export default observer(function TypeTable() {
    const { typeStore, modalStore, themeStore } = useStore();
    const { types, setSelectedType, deleteType,
        loadingTypes, loadingButton, loadTypes, selectedType } = typeStore;

    function handleModalOpen(type: Type | null) {
        setSelectedType(type);
        modalStore.handleOpen();
    }

    const [target, setTarget] = useState('');


    function handleTypeDelete(id: string) {
        setTarget(id);
        deleteType(id);
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
                        onClick={() => {
                            setTarget("typeForm");
                            handleModalOpen(params.row)
                        }}
                    >
                        Edit
                    </Button>
                    <Button
                        disabled={params.row.userName === store.userStore.user?.userName}
                        name={params.row.id}
                        onClick={() => {
                            setTarget("deleteConfirmation");
                            handleModalOpen(params.row);
                        }}
                        variant="contained"
                        color="error"
                    >
                        Delete
                    </Button>
                </Stack>
            )
        }
    ]

    useEffect(() => {
        loadTypes();
    }, [loadTypes])

    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box>
                {
                    target === "typeForm" &&
                    <BasicModal>
                        <TypeForm />
                    </BasicModal>
                }
                {
                    target === "deleteConfirmation" &&
                    <BasicModal>
                        <Stack direction="column" gap={2} alignItems="center" justifyContent="center">
                            <Typography variant="h6" color={themeStore.fontColor}>
                                Are you sure you want to delete that type? All related events gonna be also deleted
                            </Typography>
                            <LoadingButton
                                loading={loadingButton && target === selectedType!.id}
                                variant="contained"
                                color="error"
                                onClick={() => handleTypeDelete(selectedType!.id)}
                            >
                                Delete
                            </LoadingButton>
                        </Stack>
                    </BasicModal>
                }

                <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", my: 2 }}>
                    <Button variant="contained" onClick={() => {
                        setTarget("typeForm");
                        handleModalOpen(null);
                    }}>
                        Create</Button>
                </Box>
                <div style={{ width: "830px", height: "600px" }}>
                    <DataGrid
                        columns={columns}
                        rows={types}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 20 },
                            },
                        }}
                        pageSizeOptions={[20, 100]}
                        disableRowSelectionOnClick
                        loading={loadingTypes}
                    />
                </div>
            </Box >
        </Box>

    )
})