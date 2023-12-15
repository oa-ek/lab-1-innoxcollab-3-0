import dayjs from "dayjs";
import { Profile } from "./Profile";
import { Tag } from "./Tag";
import { EventBlock } from "./EventBlock";

export interface Event {
    id: string;
    title: string;
    date: string;
    shortDescription: string;
    description: string;
    venue: string;
    eventType: string;
    isCanceled: boolean;
    isHost: boolean;
    status: number;
    relatedPhoto: string;
    creatorProfile?: Profile;
    blocks: EventBlock[];
    tags: Tag[]
}

export class Event implements Event {
    constructor(init?: EventFormValues) {
        Object.assign(this, init);
    }
}

export class EventFormValues {
    id?: string = undefined;
    title: string = '';
    shortDescription: string = '';
    description: string = '';
    date: string | null = dayjs().toISOString();
    venue: string = '';
    status: number = 0;
    relatedPhoto: string = '';
    tags: Tag[] = [];
    blocks: EventBlock[] = [];

    constructor(event?: EventFormValues) {
        if (event) {
            this.id = event.id;
            this.title = event.title;
            this.shortDescription = event.shortDescription;
            this.description = event.description;
            this.date = event.date;
            this.venue = event.venue;
            this.status = event.status;
            this.relatedPhoto = event.relatedPhoto;
            this.tags = event.tags;
            this.blocks = event.blocks;
        }
    }
}
