import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import EventStore from "./eventStore";
import ProfileStore from "./profileStore";
import ModalStore from "./modalStore";
import TagStore from "./tagStore";
import ThemeStore from "./themeStore";
import TypeStore from "./typeStore";
import CompanyStore from "./companyStore";

interface Store {
    eventStore: EventStore;
    commonStore: CommonStore;
    userStore: UserStore;
    profileStore: ProfileStore;
    modalStore: ModalStore;
    tagStore: TagStore;
    themeStore: ThemeStore;
    typeStore: TypeStore;
    companyStore: CompanyStore;
}

export const store: Store = {
    eventStore: new EventStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    profileStore: new ProfileStore(),
    modalStore: new ModalStore(),
    tagStore: new TagStore(),
    themeStore: new ThemeStore(),
    typeStore: new TypeStore(),
    companyStore: new CompanyStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext)
}