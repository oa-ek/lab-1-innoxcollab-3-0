import { User } from "./User";

export interface Profile {
    id: string;
    userName: string;
    displayName: string;
    image?: string;
    bio?: string;
    email: string;
}

export class Profile implements Profile {
    constructor(user: User) {
        this.userName = user.userName;
        this.displayName = user.displayName;
        this.image = user.image;
    }
}

export class ProfileFormValues implements Profile {
    id: string = "";
    userName: string = "";
    displayName: string = "";
    bio?: string | undefined = "";
    email: string = "";

    constructor(profile?: ProfileFormValues) {
        if (profile) {
            this.id = profile.id;
            this.userName = profile.userName;
            this.displayName = profile.displayName;
            this.bio = profile.displayName;
            this.email = profile.email;
        }
    }
}