import { Company } from "./Company";
import { Event } from "./Event";
import { User } from "./User";

export interface Profile {
    id: string;
    userName: string;
    displayName: string;
    image?: string;
    bio?: string;
    email: string;
    company?: Company;
    events: Event[];
}

export class Profile implements Profile {
    constructor(user: User) {
        this.userName = user.userName;
        this.displayName = user.displayName;
        this.image = user.image;
    }
}

export class ProfileFormValues {
    id: string = "";
    userName: string = "";
    displayName: string = "";
    bio?: string | undefined = "";
    email: string = "";
    company?: Company | undefined = undefined;

    constructor(profile?: ProfileFormValues) {
        if (profile) {
            this.id = profile.id;
            this.userName = profile.userName;
            this.displayName = profile.displayName;
            this.bio = profile.displayName;
            this.email = profile.email;
            this.company = profile.company;
        }
    }
}