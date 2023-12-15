import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { EventBlock } from '../../app/models/EventBlock';
import TextInput from '../../app/common/form/TextInput';
import { Button, Stack } from '@mui/material';

interface Props {
    onSubmit: (eventBlock: EventBlock) => void;
    initialEventBlock?: EventBlock;
    setTouched: (touched: boolean) => void;
}

export default function EventBlockForm({ onSubmit, initialEventBlock, setTouched }: Props) {
    const initialValues: EventBlock = initialEventBlock || {
        title: '',
        description: '',
        attachedFileUrl: '',
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('The title is required'),
        description: Yup.string().required('The description is required'),
        attachedFileUrl: Yup.string().required('The attached file URL is required').url('Field must be URL!'),
    });

    const handleSubmit = (values: EventBlock) => {
        onSubmit(values);
        setTouched(true);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isValid, dirty }) => (
                <Form>
                    <Stack direction="column" spacing={1}>
                        <TextInput name='title' label="Title" />
                        <TextInput name='description' label="Description" />
                        <TextInput name='attachedFileUrl' label="Attached File Url" />

                        <Stack direction="row" justifyContent="flex-end">
                            <Button disabled={!isValid || !dirty} type="submit" variant="contained">Submit</Button>
                        </Stack>
                    </Stack>
                </Form>
            )}
        </Formik>
    );
};