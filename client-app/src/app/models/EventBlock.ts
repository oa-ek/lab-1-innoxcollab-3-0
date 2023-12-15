export interface EventBlock {
    id?: string;
    title: string;
    description: string;
    attachedFileUrl: string;
}

export class EventBlock implements EventBlock {
    constructor(init?: EventBlockFormValues) {
        Object.assign(this, init);
    }
}

export class EventBlockFormValues {
    id?: string = undefined;
    title: string = '';
    description: string = '';
    attachedFileUrl: string = '';

    constructor(eventBlock: EventBlock) {
        this.id = eventBlock.id;
        this.title = eventBlock.title;
        this.description = eventBlock.description;
        this.attachedFileUrl = eventBlock.attachedFileUrl;
    }
} 