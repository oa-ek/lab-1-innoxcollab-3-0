import { observer } from 'mobx-react-lite';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './textEditor.css';
import { useField } from 'formik';

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
}

export default observer(function TextEditor(props: Props) {
    const [_, meta, helpers] = useField(props.name);
    return (
        <div style={{ height: "300px", marginBottom: "50px", marginTop: "15px" }}>
            <ReactQuill
                modules={modules}
                style={{ height: "100%" }}
                theme="snow" value={meta.value}
                onChange={(value) => helpers.setValue(value)} />
        </div>
    );
})