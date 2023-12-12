import { Box } from "@mui/material";
import { ContentState, EditorState } from "draft-js";
import { useField } from "formik";
import htmlToDraft from "html-to-draftjs";
import { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

interface Props {
    name: string;
}

export default function WysiwygEditor(props: Props) {
    const [_field, meta] = useField(props.name);
    const [editorState, setEditorState] = useState<EditorState>(
        EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(meta.value).contentBlocks))
    );

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        return () => {
            setIsMounted(false);
        }
    })

    return (
        <Box sx={{ height: "400px" }}>
            <Editor
                editorState={editorState}
                onEditorStateChange={(newState) => {
                    setEditorState(newState);
                }}
            />
        </Box>
    );
}
