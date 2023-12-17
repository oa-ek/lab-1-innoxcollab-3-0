import { Profile } from "./Profile";

export interface Company {
    id: string;
    title: string;
    url: string;
    description: string;
    representers: Profile[];
}

export class Company implements Company {
    constructor(init?: CompanyFormValues) {
        Object.assign(this, init);
    }
}

export class CompanyFormValues {
    id: string | undefined = undefined;
    title: string = '';
    url: string = '';
    description: string = '';
    representers: Profile[] = [];
}