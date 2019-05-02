import { Entity } from './Entity.model';
import { Actor } from './actor.model';

export class Trip extends Entity{
   // Administrator: Actor;
  
    ticker: String;
    detalles: String;
   // cancelled_reason: String;
    title: String;
   // cancelationMoment: String;
    description: String;
    price: Number;
    picture: String;
    //list_requirements: String [];
    //status: String;
    //date_start: Date;
    //date_end: Date;
   // published: Boolean;
   // picture: String [];
   // created: Date;
}
