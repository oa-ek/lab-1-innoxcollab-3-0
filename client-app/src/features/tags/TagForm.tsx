import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup';
import { Form, Formik } from "formik";
import TextInput from "../../app/common/form/TextInput";
import { LoadingButton } from "@mui/lab";
import { Tag } from "../../app/models/Tag";
import { v4 as uuid } from 'uuid'
import { Box, Stack, Typography } from "@mui/material";


export default observer(function TagForm() {
    const { tagStore: { selectedTag, createTag, editTag, buttonLoading, tags } } = useStore();

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required!').min(2)
    });

    function handleFormSubmit(tag: Tag) {
        if (!tag.id) {
            if (tags.find(x => x.name === tag.name)) {
                alert("Tag with such name already exists!");
            }
            else {
                tag.id = uuid();
                createTag(tag);
            }
        }
        else {
            if (tag.name !== tag?.name && tags.find(x => x.name === tag.name)) {
                alert("Tag with such name already exists! Please pick different username or remain the existing one!");
            } else {
                editTag(tag.id, tag);
            }
        }
    }

    return (
        <Stack direction="column" spacing={1}>
            <Typography>{selectedTag ? "Editing tag" : "Creating tag"}</Typography>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={selectedTag || new Tag()}
                onSubmit={values => handleFormSubmit(values)}
            >
                {({ isValid, dirty }) => (
                    <Form>
                        <TextInput name="name" label="Name" />
                        <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                            <LoadingButton
                                type="submit"
                                loading={buttonLoading}
                                variant="contained"
                                disabled={buttonLoading || !dirty || !isValid}
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