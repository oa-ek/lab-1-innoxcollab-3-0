import { Button } from "@mui/material";
import { createContext, useEffect, useState } from "react";

const CloudinaryScriptContext = createContext<{ loaded: boolean }>({ loaded: false });

interface Props {
    uwConfig: any;
    setResult: (result: string) => void;
}

declare global {
    interface Window {
        cloudinary: any;
    }
}

function CloudinaryUploadWidget({ uwConfig, setResult }: Props) {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            const uwScript = document.getElementById("uw");
            if (!uwScript) {
                const script = document.createElement("script");
                script.setAttribute("async", "");
                script.setAttribute("id", "uw");
                script.src = "https://upload-widget.cloudinary.com/global/all.js";
                script.addEventListener("load", () => setLoaded(true));
                document.body.appendChild(script);
            } else {
                setLoaded(true);
            }
        }
    }, [loaded]);

    const initializeCloudinaryWidget = () => {
        if (loaded) {
            var myWidget = window.cloudinary.createUploadWidget(
                uwConfig,
                (error: any, result: any) => {
                    if (!error && result && result.event === "success") {
                        setResult(result.info.url);
                    }
                }
            );

            document.getElementById("upload_widget")?.addEventListener(
                "click",
                function () {
                    myWidget.open();
                },
                false
            );
        }
    };

    return (
        <CloudinaryScriptContext.Provider value={{ loaded }}>
            <Button
                variant="contained"
                id="upload_widget"
                onClick={initializeCloudinaryWidget}
            >
                Upload
            </Button>
        </CloudinaryScriptContext.Provider>
    );
}

export default CloudinaryUploadWidget;
export { CloudinaryScriptContext };