import { makeAutoObservable, runInAction } from "mobx"
import { store } from "./store";
import { Profile } from "../models/Profile";
import { Event, EventFormValues } from "../models/Event";
import agent from "../api/agent";
import { Pagination, PagingParams } from "../models/Pagination";

export default class EventStore {
    eventRegistry = new Map<string, Event>();
    selectedEvent: Event | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;
    pagination: Pagination | null = null;
    pagingParams = new PagingParams();

    constructor() {
        makeAutoObservable(this)
    }

    get axiosParams() {
        const params = new URLSearchParams();
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString());

        return params;
    }

    get eventsByDate() {
        return Array.from(this.eventRegistry.values())
            .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    }

    loadEvents = async () => {
        this.setLoadingInitial(true);
        try {
            const result = await agent.Events.list(this.axiosParams);
            result.data.forEach(event =>
                this.setEvent(event));
            this.setPagination(result.pagination);
            this.setLoadingInitial(false);

        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadEvent = async (id: string) => {
        let event = this.getEvent(id);
        if (event) {
            this.selectedEvent = event;
            return event;
        }
        else {
            this.setLoadingInitial(true);
            try {
                event = await agent.Events.details(id);
                this.setEvent(event)
                runInAction(() => this.selectedEvent = event);
                this.setLoadingInitial(false);
                return event;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }

    }


    private getEvent = (id: string) => {
        return this.eventRegistry.get(id);
    }

    private setEvent = (event: Event) => {
        const user = store.userStore.user;
        if (user) {
            event.isHost = event.creatorProfile?.userName === user.userName;
        }
        this.eventRegistry.set(event.id, event);
    }

    setLoadingInitial(state: boolean) {
        this.loadingInitial = state;
    }

    createEvent = async (event: EventFormValues) => {
        const user = store.userStore.user;
        const host = new Profile(user!);
        try {
            await agent.Events.create(event);
            const newEvent = new Event(event);
            newEvent.creatorProfile = host;
            this.setEvent(new Event);
            runInAction(() => {
                this.selectedEvent = newEvent;
            })
        } catch (error) {
            console.log(error);
        }
    }

    updateEvent = async (event: EventFormValues) => {
        try {
            await agent.Events.update(event);
            runInAction(() => {
                if (event.id) {
                    const updatedEvent = { ...this.getEvent(event.id), ...event }
                    this.eventRegistry.set(event.id, updatedEvent as Event);
                    this.selectedEvent = updatedEvent as Event;
                }
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteEvent = async (id: string) => {
        this.loading = true;
        try {
            await agent.Events.delete(id);
            runInAction(() => {
                this.eventRegistry.delete(id);
                this.loading = false;
            })

        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    cancelEventToggle = async () => {
        this.loading = true;
        try {
            await agent.Events.cancel(this.selectedEvent?.id!);
            runInAction(() => {
                this.selectedEvent!.isCanceled = !this.selectedEvent?.isCanceled;
                this.eventRegistry.set(this.selectedEvent!.id, this.selectedEvent!);
            })
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    setPagination = (pagination: Pagination) => {
        this.pagination = pagination;
    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }


}
