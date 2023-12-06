import { makeAutoObservable, runInAction } from "mobx";
import { User, UserFormValues } from "../models/User";
import { store } from "./store";
import { router } from "../router/Routes";
import agent from "../api/agent";

export default class UserStore {
    user: User | null = null;
    rememberMe = false;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds: UserFormValues) => {
        const user = await agent.Account.login(creds);
        this.logUser(user);
    }

    register = async (creds: UserFormValues) => {
        const user = await agent.Account.register(creds);
        this.logUser(user);
    }

    logout = () => {
        store.commonStore.setToken(null);
        this.user = null;
        location.reload();
    }

    getUser = async () => {
        const user = await agent.Account.current();
        runInAction(() => {
            this.user = user;
        })
    }

    setRememberMe = (value: boolean) => {
        this.rememberMe = value;
    }

    setDisplayName = (name: string) => {
        if (this.user)
            this.user.displayName = name;
    }

    setUserName = (name: string) => {
        if (this.user)
            this.user.userName = name;
    }

    private logUser = (user: User) => {
        store.commonStore.setToken(user.token, this.rememberMe);
        runInAction(() => this.user = user);
        store.eventStore.eventRegistry.clear();
        router.navigate('/events');
    }
}