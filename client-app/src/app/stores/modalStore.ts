import { makeAutoObservable } from "mobx";

export default class ModalStore {
    open: boolean = false;


    constructor() {
        makeAutoObservable(this);
    }

    handleOpen = () => {
        this.open = !this.open;
    }
}