import { makeAutoObservable, runInAction } from "mobx";
import { Type } from "../models/Type";
import agent from "../api/agent";
import { store } from "./store";

export default class TypeStore {
    types: Type[] = [];
    selectedType: Type | null = null;
    loadingTypes: boolean = false;
    loadingButton: boolean = false;


    constructor() {
        makeAutoObservable(this);
    }

    setSelectedType = (type: Type | null) => {
        this.selectedType = type;
    }

    loadTypes = async () => {
        this.loadingTypes = true;
        try {
            const types = await agent.Types.list();
            runInAction(() => {
                this.types = types;
                this.loadingTypes = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingTypes = false);
        }
    }

    createType = async (type: Type) => {
        this.loadingButton = true;
        try {
            await agent.Types.create(type);
            runInAction(() => {
                this.loadTypes();
                this.loadingButton = false;
                store.modalStore.handleOpen();
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingButton = false);
        }
    }

    deleteType = async (id: string) => {
        this.loadingTypes = true;
        try {
            await agent.Types.delete(id);
            runInAction(() => {
                this.types = this.types.filter(p => p.id !== id);
                this.loadingTypes = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingTypes = false);
        }
    }

    editType = async (id: string, type: Type) => {
        this.loadingButton = true;
        try {
            await agent.Types.edit(id, type);
            runInAction(() => {
                this.loadTypes();
                this.loadingButton = false;
                store.modalStore.handleOpen();
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingButton = false);
        }
    }
}