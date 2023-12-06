import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/ServerError";

export default class CommonStore {
    error: ServerError | null = null;
    token: string | null | undefined = localStorage.getItem('jwt');
    appLoaded = false;
    rememberMe = false;

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.token,
            token => {
                if (token) {
                    if (this.rememberMe)
                        localStorage.setItem('jwt', token);
                    else
                        sessionStorage.setItem('jwt', token);
                } else {
                    localStorage.removeItem('jwt');
                }
            }
        )
    } 

    setServerError(error: ServerError) {
        this.error = error;
    }

    setToken = (token: string | null, rememberMe?: boolean) => {
        this.token = token;
        this.rememberMe = rememberMe!;
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }

}