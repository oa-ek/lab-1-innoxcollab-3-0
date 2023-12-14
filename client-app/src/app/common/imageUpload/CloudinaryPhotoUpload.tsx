import { useState } from "react";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import { Stack, Typography } from "@mui/material";
import { useStore } from "../../stores/store";
import { useField } from "formik";

interface Props {
    name: string;
}

export default function CloudinaryPhotoUpload(props: Props) {
    const { themeStore } = useStore();

    const [_, meta, helpers] = useField(props.name)
    const [cloudName] = useState("duormgto9")
    const [uploadPreset] = useState("ksts4l5z");

    const [uwConfig] = useState({
        cloudName,
        uploadPreset,
        cropping: true,
        multiple: false,
    });

    return (
        <Stack alignItems="center" justifyContent="center" spacing={2}>
            <Typography variant="h5" color={themeStore.fontColor}>Upload your image</Typography>
            <CloudinaryUploadWidget uwConfig={uwConfig} setResult={helpers.setValue} />
            {
                meta.value && (
                    <div style={{ height: "100%", width: "100%" }}>
                        <Typography variant="h5" color={themeStore.fontColor}>Current Image</Typography>
                        <img src={meta.value} alt="Uploaded" style={{ maxWidth: "100%" }} />
                    </div>
                )
            }
        </Stack>
    )
}