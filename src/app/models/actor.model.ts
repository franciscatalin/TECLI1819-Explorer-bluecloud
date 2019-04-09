import { Entity } from './Entity.model';

export class Actor extends Entity {
    name: string;
    surname: string;
    email: string;
    password: string;
    countrycode: string;
    phone: string;
    address: string;
    role: string;
    customToken: string;
    preferredLanguage: string;
    created: string;
}
