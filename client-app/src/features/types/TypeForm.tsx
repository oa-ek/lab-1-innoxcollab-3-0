import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup';
import { Form, Formik } from "formik";
import TextInput from "../../app/common/form/TextInput";
import { LoadingButton } from "@mui/lab";
import { Type } from "../../app/models/Type";
import { v4 as uuid } from 'uuid'
import { Box, Stack, Typography } from "@mui/material";
import { toast } from "react-toastify";


export default observer(function TypeForm() {
    const { typeStore: { selectedType, createType, editType, loadingButton, types }, themeStore } = useStore();

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required!').min(2)
    });

    function handleFormSubmit(type: Type) {
        if (!type.id) {
            if (types.find(x => x.name === type.name)) {
                toast.error("Type with such name already exists!");
            }
            else {
                type.id = uuid();
                createType(type);
            }
        }
        else {
            if (type.name !== type?.name && types.find(x => x.name === type.name)) {
                toast.error("Type with such name already exists! Please pick different name or remain the existing one!");
            } else {
                editType(type.id, type);
            }
        }
    }

    return (
        <Stack direction="column" spacing={2}>
            <Typography color={themeStore.fontColor}>{selectedType ? "Editing type" : "Creating type"}</Typography>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={selectedType || new Type()}
                onSubmit={values => handleFormSubmit(values)}
            >
                {({ isValid, dirty }) => (
                    <Form autoComplete="off">
                        <TextInput name="name" label="Name" />
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
                    </Form>
                )}
            </Formik>
        </Stack>
    );
})