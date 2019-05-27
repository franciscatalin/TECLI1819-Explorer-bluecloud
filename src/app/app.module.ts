import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import locales from '@angular/common/locales/es';
import { AppComponent } from './app.component';
import { ActorListComponent } from './components/actor/actor-list/actor-list.component';
import { TripListComponent } from './components/trip/trip-list/trip-list.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './components/security/register/register.component';
import { LoginComponent } from './components/security/login/login.component';
import { HeaderComponent } from './components/master/header/header.component';
import { MessageComponent } from './components/master/message/message.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { routes } from './app.routes';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslatableComponent } from './components/shared/translatable/translatable.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/master/footer/footer.component';
import { HomeComponent } from './components/shared/home/home.component';
import { MessageService } from './services/message.service';
import * as firebase from 'firebase';
import { TripDisplayComponent } from './components/trip/trip-display/trip-display.component';
import { TripEditComponent } from './components/trip/trip-edit/trip-edit.component';
import { LocalizedDataPipe } from './components/shared/localized-data.pipe';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { ApplicationListComponent } from './components/application/application-list/application-list/application-list.component';
import { ApplicationDisplayComponent } from './components/application/application-display/application-display/application-display.component';
import { TermAndConditionsComponent } from './components/master/terms-and-conditions/term-and-conditions/term-and-conditions.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { HttpModule } from '@angular/http';
import { DeniedAccessPageComponent } from './components/shared/denied-access-page/denied-access-page.component';
import { ProfileComponent } from './components/actor/profile/profile.component';
import { ActorService } from './services/actor.service';
import { TripCreateComponent } from './components/trip/trip-create/trip-create.component';
import { ApplicationCreateComponent } from './components/application/application-create/application-create.component';
import { AgmCoreModule} from '@agm/core';
import { CookieService } from 'ngx-cookie-service';
import { SearchTripComponent } from './components/search-trip/search-trip.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { RegisterManagerComponent } from './components/security/register-manager/register-manager.component';

// Initialize Firebase
export const firebaseConfig = {
  apiKey: 'AIzaSyAAaFX9STVzcDkmbr9_GE920p6H-aeqnR4',
  authDomain: 'bluecloud-client-2018.firebaseapp.com',
  databaseURL: 'https://bluecloud-client-2018.firebaseio.com',
  projectId: 'bluecloud-client-2018',

  storageBucket: 'bluecloud-client-2018.appspot.com',
  messagingSenderId: '525014120497'
};
firebase.initializeApp(firebaseConfig);

registerLocaleData(locales, 'es');
// Esta función nos permite crear un nuevo loader que usaremos para hacer las traducciones
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    ActorListComponent,
    TripListComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    MessageComponent,
    TranslatableComponent,
    FooterComponent,
    HomeComponent,
    TripDisplayComponent,
    TripEditComponent,
    LocalizedDataPipe,
    DashboardComponent,
    ApplicationListComponent,
    ApplicationDisplayComponent,
    TermAndConditionsComponent,
    NotFoundComponent,
    DeniedAccessPageComponent,
    ProfileComponent,
    TripCreateComponent,
    ApplicationCreateComponent,
    SearchTripComponent,
    CheckoutComponent,
    RegisterManagerComponent

  ],
  imports: [
    routes,
    HttpModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPayPalModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC4ay9WI4sdQEmDnjdnjAKx56_l_vVEqsw',
      libraries: ['places']
      }),
    AngularFireModule.initializeApp(firebaseConfig),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [AngularFireAuth, MessageService, AngularFireAuth, ActorService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
