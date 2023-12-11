import { makeAutoObservable, runInAction } from "mobx";
import { Tag } from "../models/Tag";
import agent from "../api/agent";
import { store } from "./store";

export default class TagStore {
    tags: Tag[] = [];
    selectedTag: Tag | null = null;
    loading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setSelectedTag = (tag: Tag) => {
        this.selectedTag = tag;
    }

    loadTags = async () => {
        this.loading = true;
        try {
            const tags = await agent.Tags.list();
            runInAction(() => {
                this.tags = tags;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    loadTag = async (id: string) => {
        this.loading = true;
        try {
            const tag = await agent.Tags.details(id);
            runInAction(() => {
                this.selectedTag = tag;
                this.loading = false;
            });

        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    createTag = async (tag: Tag) => {
        this.loading = true;
        try {
            await agent.Tags.create(tag);
            runInAction(() => {
                this.tags.push(tag);
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
            store.modalStore.handleOpen();
        }
    }

    deleteTag = async (id: string) => {
        this.loading = true;
        try {
            await agent.Tags.delete(id);
            runInAction(() => {
                this.tags = this.tags.filter(p => p.id !== id);
                this.loading = false;
            });
        } catch (error) {
            runInAction(() => this.loading = false);
        }
    }

    editTag = async (id: string, tag: Tag) => {
        this.loading = true;
        try {
            await agent.Tags.edit(id, tag);
            runInAction(() => {
                const index = this.tags.findIndex(t => t.id === id);
                if (index !== -1) {
                    this.tags[index] = tag;
                }
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }
}
