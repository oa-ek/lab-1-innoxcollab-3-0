import { makeAutoObservable, runInAction } from "mobx"
import { store } from "./store";
import { Profile } from "../models/Profile";
import { Event, EventFormValues } from "../models/Event";
import agent from "../api/agent";

export default class EventStore {
    eventRegistry = new Map<string, Event>();
    selectedEvent: Event | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }

    get eventsByDate() {
        return Array.from(this.eventRegistry.values())
            .sort((a, b) => Date.parse(a.date) - Date.parse(b.date)).reverse();
    }

    get groupedEvents() {
        return Object.entries(
            this.eventsByDate.reduce((activities, event) => {
                const date = event.date.split('T')[0];
                activities[date] = activities[date] ? [...activities[date], event] : [event];
                return activities;
            }, {} as { [key: string]: Event[] })
        )
    }

    loadEvents = async () => {
        try {
            const activities = await agent.Events.list();
            activities.forEach(event =>
                this.setEvent(event));
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
            event.isHost = event.creatorProfile?.username === user.username;
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

}
