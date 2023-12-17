import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import * as Yup from 'yup';
import { LoadingButton } from "@mui/lab";
import { useStore } from "../../../app/stores/store";
import TextInput from "../../../app/common/form/TextInput";
import { Stack } from "@mui/material";
import { router } from "../../../app/router/Routes";

interface Props {
    setEditMode: (editMode: boolean) => void;
}

export default observer(function ProfileEditForm({ setEditMode }: Props) {
    const { profileStore: { profile, updatePersonalProfile } } = useStore();
    return (
        <Formik
            initialValues={{
                displayName: profile?.displayName,
                bio: profile?.bio,
                userName: profile?.userName
            }}
            onSubmit={values => {
                updatePersonalProfile(profile?.id!, values).then(() => {
                    setEditMode(false);
                    if (values.userName != profile?.userName)
                        router.navigate(`/profiles/${values.userName}`)
                });
            }}
            validationSchema={Yup.object({
                displayName: Yup.string().required('Display Name field is required'),
                userName: Yup.string().required('Username field is required')
            })}
        >
            {({ isSubmitting, isValid, dirty }) => (
                <Form>
                    <Stack spacing={2}>
                        <TextInput placeholder='Display Name'
                            name='displayName' />
                        <TextInput placeholder='Username'
                            name='userName' />
                        <TextInput ml placeholder='Add your bio'
                            name='bio' />
                        <LoadingButton
                            variant="contained"
                            type='submit'
                            loading={isSubmitting}
                            disabled={!isValid || !dirty}
                            sx={{ mt: 1 }}
                        >
                            Update Profile
                        </LoadingButton>
                    </Stack>

                </Form>
            )}
        </Formik>
    )
})