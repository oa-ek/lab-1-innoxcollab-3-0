import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import EventStore from "./eventStore";


interface Store {
    eventStore: EventStore;
    commonStore: CommonStore;
    userStore: UserStore;
}

export const store: Store = {
    eventStore: new EventStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore()
}
 
export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext)
}