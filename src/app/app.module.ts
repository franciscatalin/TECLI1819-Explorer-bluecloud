import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ActorListComponent } from './components/actor/actor-list/actor-list.component';
import { TripListComponent } from './components/trip/trip-list/trip-list.component';

import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './components/security/register/register.component';
import { LoginComponent } from './components/security/login/login.component';
import { HeaderComponent } from './components/master/header/header.component';
import { MessageComponent } from './components/master/message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    ActorListComponent,
    TripListComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
