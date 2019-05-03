import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TripListComponent } from './trip-list.component';

// Injectable
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// Translate
import { TranslateService, TranslateLoader } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
// Http
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';
import { ActorListComponent } from '../../actor/actor-list/actor-list.component';
import { RegisterComponent } from '../../security/register/register.component';
import { LoginComponent } from '../../security/login/login.component';
import { HeaderComponent } from '../../master/header/header.component';
import { MessageComponent } from '../../master/message/message.component';
import { FooterComponent } from '../../master/footer/footer.component';
import { HomeComponent } from '../../shared/home/home.component';
import { TripDisplayComponent } from '../trip-display/trip-display.component';
import { TripEditComponent } from '../trip-edit/trip-edit.component';
import { LocalizedDataPipe } from '../../shared/localized-data.pipe';
import { DashboardComponent } from '../../dashboard/dashboard/dashboard.component';
import { ApplicationListComponent } from '../../application/application-list/application-list/application-list.component';
import { ApplicationDisplayComponent } from '../../application/application-display/application-display/application-display.component';
import { TermAndConditionsComponent } from '../../master/terms-and-conditions/term-and-conditions/term-and-conditions.component';
import { NotFoundComponent } from '../../shared/not-found/not-found.component';
import { DeniedAccessPageComponent } from '../../shared/denied-access-page/denied-access-page.component';
import { routes } from 'src/app/app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig, HttpLoaderFactory } from 'src/app/app.module';
import { AngularFireAuth } from 'angularfire2/auth';
import { MessageService } from 'src/app/services/message.service';
import { APP_BASE_HREF } from '@angular/common';
import { TripService } from 'src/app/services/trip.service';
import { doesNotThrow } from 'assert';


@Injectable()
// Necesito esta clase para simular que tengo un usuario haciendo click en un objeto con un id concreto
export class ActivatedRouteStub {
  private subject = new BehaviorSubject(this.testParams);
  params = this.subject.asObservable();

  private _testParams: {};
  get testParams() { return this._testParams; }
  set testParams (params: {}) {
    this._testParams = params;
    this.subject.next(params);
  }
  // ActivatedRoute.snapshot.param
  // Este método snapshot devuelve un conjunto de parámetros simulados
  get snapshot () {
    return { params: this.testParams };
  }
}

describe('TripListComponent', () => {
  //var originalTimeout;

  // Componente que vamos a probar
  let component: TripListComponent;
  // Envuelve el componente anterior que voy a probar (TripListComponent) con una serie de objetos alrededor para que el componente funcione
  let fixture: ComponentFixture<TripListComponent>;
  // Creamos una instancia de la clase ActivatedRouteStub
  let mockActivatedRoute;
  // Referencia al servicio que quiero espiar
  let itemService: TripService;

  // "Antes de" asíncrono
  beforeEach(async(() => {
    mockActivatedRoute = new ActivatedRouteStub();

    TestBed.configureTestingModule({
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
        DeniedAccessPageComponent
      ],
      imports: [
        routes,
        HttpModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(firebaseConfig),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
      providers: [{provide: APP_BASE_HREF, useValue : '/' }, AngularFireAuth, MessageService, AngularFireAuth]
    })
    .compileComponents();
  }));

  // "Antes de" no asíncrono que se usa cuando no tenemos funciones asíncronas involucradas
  beforeEach(() => {
    // originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    // jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
    fixture = TestBed.createComponent(TripListComponent);
    component = fixture.componentInstance;

    itemService = TestBed.get(TripService);
    component.ngOnInit();
    // "detectChanges" sirve para que Jasmine detecte si algo cambia en la página, si no lo ponemos, siempre veremos los valores iniciales
    // Sin este método, cuando pregunte por un elemento del componente, nada más crearse y antes de llamar al servicio siempre estará vacío
    // Al hacer la llamada a esta función "detectChanges" ya podré obtener los valores después de cargarse
    fixture.detectChanges();
  });

  // 1º spect: Comprueba si se crea correctamente el componente, es decir, que no sea false
  it('should be create', () => {
    expect(component).toBeTruthy();
  });

  // 2º spect: Comprueba que la lista de trips se ha inicializado correctamente
  // Es decir, que se haya hecho bien el ngOnInit del componente, de manera que la lista de trips tiene algún valor asignado
  // Si lo ha hecho bien, la lista no debe ser Undefined
  it('Should have initialized list of Trips (negative)', () => {
    expect(component.trips).not.toBeUndefined();
  });

  it('Should have initialized list of Trips (positive)', () => {
    expect(component.trips).toBeDefined();
  });

  it('Check the size of the travel list', () => {
    expect(component.trips.length).toBeGreaterThan(10);

    // Lo hago de nuevo de otra manera
    // Inicialmente el tamaño de la lista debería ser NO definido
    // expect(component.trips.length).toBeUndefined();
    // component.ngOnInit();
    // Si no pongo el detectChanges siempre sería vacío
    // fixture.detectChanges();
    // expect(component.trips.length).toBeGreaterThan(10);
  });

  it('Check the size of the travel list', () => {
    expect(component.trips.length).toBeLessThan(50);
  });

  it('Should have fourteen trips in the list', async (done) => {
    component.ngOnInit();
    fixture.detectChanges();
    spyOn(itemService, 'getTrips').and.returnValue(Promise.resolve(true));

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.trips.length).toEqual(14);
      done();
    }).catch (error => console.log('error en el test:' + error));
  });
});
