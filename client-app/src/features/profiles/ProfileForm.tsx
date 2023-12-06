import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup';
import { v4 as uuid } from 'uuid'
import { Form, Formik } from "formik";
import { Profile } from "../../app/models/Profile";
import TextInput from "../../app/common/form/TextInput";
import { LoadingButton } from "@mui/lab";

export default observer(function ProfileForm() {
    const { profileStore } = useStore();
    const { createProfile, updateProfile, profile: prf, loading, profiles } = profileStore;

    const validationSchema = Yup.object({
        userName: Yup.string().matches(/^\S*$/, "Username shouldn't have any spaces!")
            .required('The username is required'),
        displayName: Yup.string().required('The display name is required'),
        email: Yup.string().email('Enter right format of email')
            .required('The email is required')
    })

    function handleFormSubmit(profile: Partial<Profile>) {
        if (!profile.id) {
            if (profiles.find(x => x.userName === profile.userName)) {
                alert("User with such username already exists! Please pick different username!");
            }
            else {
                profile.id = uuid();
                createProfile(profile);
            }
        }
        else {
            if (profile.userName !== prf?.userName && profiles.find(x => x.userName === profile.userName)) {
                alert("User with such username already exists! Please pick different username or remain the existing one!");
            } else {
                updateProfile(profile.id, profile);
            }
        }
    }

    return (
        <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={{
                id: prf?.id,
                userName: prf!.userName,
                displayName: prf!.displayName,
                bio: prf!.bio,
                email: prf!.email
            }}
            onSubmit={values => handleFormSubmit(values)}
        >
            {({ isValid, dirty }) => (
                <Form>
                    <TextInput label="Username"
                        name='userName' />
                    <TextInput label="Display Name"
                        name='displayName' />
                    <TextInput ml label="Bio"
                        name='bio' />
                    <TextInput label="Email"
                        name='email' />
                    <LoadingButton
                        variant="contained"
                        type='submit'
                        loading={loading}
                        disabled={loading || !dirty || !isValid}
                        sx={{ mt: 1 }}
                    >
                        {prf!.id ? "Update profile" : "Create profile"}
                    </LoadingButton>
                </Form>
            )}
        </Formik>
    )
})