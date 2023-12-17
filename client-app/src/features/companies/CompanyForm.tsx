import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup';
import { Form, Formik } from "formik";
import TextInput from "../../app/common/form/TextInput";
import { LoadingButton } from "@mui/lab";
import { Company, CompanyFormValues } from "../../app/models/Company";
import { v4 as uuid } from 'uuid'
import { Box, Stack, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useEffect } from "react";
import MultipleValues from "../../app/common/form/MultipleValues";


export default observer(function CompanyForm() {
    const { companyStore, profileStore, themeStore } = useStore();
    const { selectedCompany, createCompany, editCompany, loadingButton, companies } = companyStore;
    const { profiles, loadProfiles, loading: loadingProfiles } = profileStore;

    useEffect(() => {
        loadProfiles();
    }, [loadProfiles]);

    const validationSchema = Yup.object({
        title: Yup.string().required('Name is required!').min(2),
        description: Yup.string().required('Description is required!').min(2),
        url: Yup.string().url('Field must be of url type!')
    });

    function handleFormSubmit(company: Company) {
        if (!company.id) {
            if (companies.find(x => x.title === company.title)) {
                toast.error("Company with such title already exists!");
            }
            else {
                company.id = uuid();
                createCompany(company);
            }
        }
        else {
            if (company.title !== company?.title && companies.find(x => x.title === company.title)) {
                toast.error("Company with such title already exists! Please pick different title or remain the existing one!");
            } else {
                editCompany(company.id, company);
            }
        }
    }

    return (
        <Stack direction="column" spacing={2}>
            <Typography color={themeStore.fontColor}>{selectedCompany ? "Editing company" : "Creating company"}</Typography>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={selectedCompany || new Company(new CompanyFormValues())}
                onSubmit={values => handleFormSubmit(values)}
            >
                {({ isValid, dirty }) => (
                    <Form autoComplete="off">
                        <Stack spacing={2}>
                            <TextInput name="title" label="Title" />
                            <TextInput name="description" label="Description" />
                            <TextInput name="url" label="Url" />
                            <MultipleValues name="representers"
                                values={selectedCompany?.representers || []}
                                options={profiles} loading={loadingProfiles}
                                label="Representers" />
                            <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", mt: 1 }}>
                                <LoadingButton
                                    type="submit"
                                    loading={loadingButton}
                                    variant="contained"
                                    disabled={loadingButton || !dirty || !isValid}
                                >
                                    Submit
                                </LoadingButton>
                            </Box>
                        </Stack>
                    </Form>
                )}
            </Formik >
        </Stack >
    );
})