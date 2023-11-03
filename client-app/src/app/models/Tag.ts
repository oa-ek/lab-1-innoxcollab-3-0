export interface Tag {
    id: string;
    name: string;
}

export class Tag implements Tag {
    constructor(init?: TagFormValues) {
        Object.assign(this, init);
    }
}

export class TagFormValues {
    id?: string = undefined;
    name: string = '';
}