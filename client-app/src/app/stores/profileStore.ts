import { makeAutoObservable, runInAction } from "mobx";
import { store } from "./store";
import { Profile, ProfileFormValues } from "../models/Profile";
import agent from "../api/agent";

export default class ProfileStore {
    profile: Profile | null = null;
    profiles: Profile[] = [];
    loadingProfile = false; // for <LoadingComponent />
    loading = false; // for deleteButton or something idk
    activeTab = 0;

    constructor() {
        makeAutoObservable(this);
    }

    get isCurrentUserProfileOwner() {
        if (store.userStore.user && this.profile) {
            return store.userStore.user.userName === this.profile.userName;
        }
        return false;
    }

    setActiveTab = (activeTab: number) => {
        this.activeTab = activeTab;
    }

    loadProfile = async (username: string) => {
        this.loadingProfile = true;
        try {
            const profile = await agent.Profiles.details(username);
            runInAction(() => {
                this.profile = profile;
                this.loadingProfile = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingProfile = false);
        }
    }

    loadProfiles = async () => {
        this.loadingProfile = true;
        try {
            const profiles = await agent.Profiles.list();
            runInAction(() => {
                this.profiles = profiles;
                this.loadingProfile = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingProfile = false);
        }
    }

    createProfile = async (user: Partial<Profile>) => {
        this.loading = true;
        try {
            await agent.Profiles.create(user);
            this.loadProfiles();
            runInAction(() => {
                this.loading = false;
                store.modalStore.handleOpen();
            })
        }
        catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    updateProfile = async (id: string, profileValues: Partial<Profile>) => {
        this.loading = true;
        try {
            await agent.Profiles.edit(id, profileValues);
            this.loadProfiles();
            runInAction(() => {
                if (profileValues.id === store.userStore.user?.id) {
                    store.userStore.setDisplayName(profileValues.displayName!);
                    store.userStore.setUserName(profileValues.userName!);
                }
                store.modalStore.handleOpen();
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    updatePersonalProfile = async (id: string, profile: Partial<Profile>) => {
        this.loading = true;
        try {
            await agent.Profiles.edit(id, profile);
            runInAction(() => {
                if (profile.displayName && profile.displayName !==
                    store.userStore.user?.displayName) {
                    store.userStore.setDisplayName(profile.displayName);
                }
                if (profile.userName && profile.userName !==
                    store.userStore.user?.userName) {
                    store.userStore.setUserName(profile.userName);
                }
                this.profile = { ...this.profile, ...profile as Profile };
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    deleteProfile = async (username: string) => {
        this.loading = true;
        try {
            if (username !== store.userStore.user?.userName) {
                await agent.Profiles.delete(username);
                runInAction(() => {
                    this.profiles = this.profiles.filter(p => p.userName !== username);
                    store.eventStore.eventRegistry.forEach(event => {
                        if (event.creatorProfile?.userName === username)
                            store.eventStore.eventRegistry.delete(event.id);
                    })
                    this.loading = false;
                })
            }
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    setProfile = (username: string | undefined) => {
        const profile = this.profiles.find(x => x.userName === username);
        if (profile)
            this.profile = profile;
        else
            this.profile = new ProfileFormValues();
    }
}

