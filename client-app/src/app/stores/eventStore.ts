import { makeAutoObservable, reaction, runInAction } from "mobx"
import { store } from "./store";
import { Profile } from "../models/Profile";
import { Event, EventFormValues } from "../models/Event";
import agent from "../api/agent";
import { Pagination, PagingParams } from "../models/Pagination";
import { toast } from "react-toastify";

export default class EventStore {
    eventRegistry = new Map<string, Event>();
    selectedEvent: Event | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    pagination: Pagination | null = null;
    pagingParams = new PagingParams();
    searchResult: Event[] = [];
    predicate = new Map<string, string>().set('all', 'true');

    constructor() {
        makeAutoObservable(this);
        reaction(
            () => this.predicate.keys(),
            () => {
                this.pagingParams = new PagingParams();
                this.eventRegistry.clear();
                this.loadEvents();
            }
        );
    }

    get axiosParams() {
        const params = new URLSearchParams();
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString());
        this.predicate.forEach((value, key) => {
            params.append(key, value);
        });
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
            this.setEvent(newEvent);
            runInAction(() => {
                this.selectedEvent = newEvent;
            });
            toast.info('Event created successfully!');
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
            toast.info('Event updated successfully!');
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
            toast.info('Event deleted successfully!');

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


    setPredicate = (key: string, value: string) => {
        const resetPredicate = () => {
            this.predicate.clear();
        }
        runInAction(() => {
            switch (key) {
                case 'all':
                    resetPredicate();
                    break;
                case 'statuses':
                case 'eventTypes':
                case 'tagName':
                    this.removePredicate(key);
                    this.predicate.set(key, value);
                    break;
                case 'searchTerm':
                    resetPredicate();
                    this.predicate.set(key, value);
                    break;
            }
        });
    }

    removePredicate = (key: string) => {
        this.predicate.delete(key);
    }
}