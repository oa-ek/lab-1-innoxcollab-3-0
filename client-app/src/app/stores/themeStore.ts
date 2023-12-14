import { Theme, createTheme } from "@mui/material";
import { makeAutoObservable } from "mobx";

export default class ThemeStore {
    fontColor: string = "#ffffff";
    theme: Theme = createTheme({
        palette: {
            mode: 'dark'
        },
    });

    constructor() {
        makeAutoObservable(this);
    }
}