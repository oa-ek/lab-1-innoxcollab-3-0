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
}