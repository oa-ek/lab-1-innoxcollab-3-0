import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import EventStore from "./eventStore";
import ProfileStore from "./profileStore";
import ModalStore from "./modalStore";


interface Store {
    eventStore: EventStore;
    commonStore: CommonStore;
    userStore: UserStore;
    profileStore: ProfileStore;
    modalStore: ModalStore;
}

export const store: Store = {
    eventStore: new EventStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    profileStore: new ProfileStore(),
    modalStore: new ModalStore()

}
 
export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext)
}