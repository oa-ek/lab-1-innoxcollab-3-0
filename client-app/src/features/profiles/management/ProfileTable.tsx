import { GridColDef, DataGrid } from "@mui/x-data-grid";
import { observer } from "mobx-react-lite";
import { store, useStore } from "../../../app/stores/store";
import { SyntheticEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import BasicModal from "../../../app/common/modal/BasicModal";
import ProfileForm from "./ProfileForm";


export default observer(function DataTable() {
    const { profileStore, modalStore } = useStore();
    const { profiles, loadProfiles, loadingProfile,
        deleteProfile, loading, setProfile } = profileStore;

    function handleModalOpen(username: string | undefined) {
        if (username) {
            setProfile(username);
        } else {
            setProfile(undefined);
        }
        modalStore.handleOpen();
    }

    const [target, setTarget] = useState('');

    function handleProfileDelete(_e: SyntheticEvent<HTMLButtonElement>, username: string) {
        setTarget(username);
        deleteProfile(username);
    }

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Id',
            width: 300
        },
        {
            field: 'userName',
            headerName: 'Username',
            width: 130,
            renderCell: (params) => (
                <Typography
                    sx={{ textDecoration: "none", color: "#ffffff" }}
                    component={Link} to={`/profiles/${params.row.userName}`}
                >
                    {params.row.userName}
                </Typography>
            ),
        },
        {
            field: 'displayName',
            headerName: 'Display name',
            width: 130,
            renderCell: (params) => (
                <Typography>{params.row.displayName}</Typography>
            )
        },
        {
            field: 'bio',
            headerName: 'Bio',
            width: 230,
            sortable: false,
            renderCell: (params) => (
                <Typography sx={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}
                >
                    {params.row.bio}
                </Typography>
            )
        },
        {
            field: 'email',
            headerName: 'Email',
            sortable: false,
            width: 200,
            renderCell: (params) => (
                <Typography>{params.row.email}</Typography>
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
                        onClick={() => handleModalOpen(params.row.userName)}
                    >
                        Edit
                    </Button>
                    <LoadingButton
                        disabled={params.row.userName === store.userStore.user?.userName}
                        name={params.row.id}
                        onClick={(e) => handleProfileDelete(e, params.row.userName)}
                        variant="contained"
                        color="error"
                        loading={loading && target === params.row.userName}
                    >
                        Delete
                    </LoadingButton>
                </Stack>
            )
        }
    ];

    useEffect(() => {
        loadProfiles();
    }, [loadProfiles]);

    return (
        <Box>
            <BasicModal>
                <ProfileForm />
            </BasicModal>
            <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", my: 2 }}>
                <Button variant="contained" onClick={() => handleModalOpen(undefined)}>Create</Button>
            </Box>
            <div style={{ display: "flex", width: "1230px" }}>
                <DataGrid
                    sx={{ height: 400 }}
                    rows={profiles}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 20 },
                        },
                    }}
                    pageSizeOptions={[20, 100]}
                    loading={loadingProfile}
                    disableRowSelectionOnClick
                />
            </div>
        </Box>

    );
});
