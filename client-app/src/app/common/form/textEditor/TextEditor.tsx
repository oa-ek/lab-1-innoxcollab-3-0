import { observer } from 'mobx-react-lite';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './textEditor.css';
import { useField } from 'formik';
import { Typography } from '@mui/material';

interface Props {
    name: string
}

const modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
    ],
    clipboard: {
        matchVisual: false,
    }
}
export default observer(function TextEditor(props: Props) {
    const [field, meta, helpers] = useField(props.name);

    const handleBlur = () => {
        if (field) {
            helpers.setTouched(true);
        }
    };

    return (
        <>
            <Typography variant="h5" sx={{ pl: "5px", pt: "10px" }}>
                Description
            </Typography>
            <div style={{ height: "300px", marginBottom: "50px", marginTop: "15px" }}>
                <ReactQuill
                    {...field}
                    modules={modules}
                    style={{ height: "100%" }}
                    theme="snow"
                    value={meta.value}
                    onBlur={handleBlur}  // Змінено тут
                    onChange={(value) => helpers.setValue(value)} />
            </div>
        </>
    );
});
