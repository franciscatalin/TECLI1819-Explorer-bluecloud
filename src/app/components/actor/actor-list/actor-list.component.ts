import { Component, OnInit } from '@angular/core';
import { Actor } from '../../../models/actor.model';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.css']
})
export class ActorListComponent implements OnInit {

  actors: Array<Actor>;

  constructor() { }

  ngOnInit() {
    this.actors = new Array<Actor>();
    const actor = new Actor();
    actor.name = 'Miguel';
    actor.surname = 'Sanchez';
    actor.password = '123';
    actor.email = 'yerllichanell@gmail.com';
    actor.phone = '633755886';
    actor.address = 'C/Alvarado';
    actor.role = 'Explorer';
    actor.preferredLanguage = 'es';
    this.actors.push(actor);
  }

}
