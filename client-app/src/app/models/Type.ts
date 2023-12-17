export interface Type {
    id: string;
    name: string;
}

export class Type implements Type {
    constructor(init?: TypeFormValues) {
        Object.assign(this, init);
    }
}

export class TypeFormValues {
    id?: string = undefined;
    name: string = '';
}