import { Entity } from './Entity.model';

export class Actor extends Entity{
    name: String;
    surname: String;
    email: String;
    password: String;
    phone: String;
    address: String;
    role: String;
    customToken: String;
    preferredLanguage: String;
    created: String;
}
