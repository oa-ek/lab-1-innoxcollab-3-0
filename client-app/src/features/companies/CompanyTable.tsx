import { observer } from "mobx-react-lite";
import { store, useStore } from "../../app/stores/store";
import { Box, Button, Stack, Typography } from "@mui/material";
import BasicModal from "../../app/common/modal/BasicModal";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import { Company } from "../../app/models/Company";
import CompanyForm from "./CompanyForm";

export default observer(function CompanyTable() {
    const { companyStore, modalStore, themeStore } = useStore();
    const { companies, setSelectedCompany, deleteCompany,
        loading, loadingButton, loadCompanies } = companyStore;

    function handleModalOpen(company: Company | null) {
        setSelectedCompany(company);
        modalStore.handleOpen();
    }

    const [target, setTarget] = useState('');


    function handleCompanyDelete(id: string) {
        setTarget(id);
        deleteCompany(id);
    }

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Id',
            width: 300
        },
        {
            field: 'title',
            headerName: 'Title',
            width: 200
        },
        {
            field: 'url',
            headerName: 'Url',
            width: 300,
            renderCell: (params) => (
                <Typography color={themeStore.fontColor} variant="body2" component="a" href={params.row.url}>
                    {params.row.url}
                </Typography>
            )
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
                        onClick={() => handleCompanyDelete(params.row.id)}
                        variant="contained"
                        color="error"
                        loading={loadingButton && target === params.row.id}
                    >
                        Delete
                    </LoadingButton>
                </Stack>
            )
        }
    ]

    useEffect(() => {
        loadCompanies();
    }, [loadCompanies])

    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box>
                <BasicModal>
                    <CompanyForm />
                </BasicModal>
                <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", my: 2 }}>
                    <Button variant="contained" onClick={() => handleModalOpen(null)}>Create</Button>
                </Box>
                <div style={{ width: "1030px", height: "600px" }}>
                    <DataGrid
                        columns={columns}
                        rows={companies}
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