import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/security/register/register.component';
import { ModuleWithProviders } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/security/login/login.component';
import { HomeComponent } from './components/shared/home/home.component';
import { TripListComponent } from './components/trip/trip-list/trip-list.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { ApplicationListComponent } from './components/application/application-list/application-list/application-list.component';
import { ApplicationDisplayComponent } from './components/application/application-display/application-display/application-display.component';
import { TripDisplayComponent } from './components/trip/trip-display/trip-display.component';
import { TermAndConditionsComponent } from './components/master/terms-and-conditions/term-and-conditions/term-and-conditions.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { ActorRoleGuard } from './guards/actor-role.guard';
import { DeniedAccessPageComponent } from './components/shared/denied-access-page/denied-access-page.component';
import { ProfileComponent } from './components/actor/profile/profile.component';
import { TripCreateComponent } from './components/trip/trip-create/trip-create.component';
import { ApplicationCreateComponent } from './components/application/application-create/application-create.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent, canActivate: [ActorRoleGuard], data: { expectedRole: 'anonymous'}},
  { path: 'register', component: RegisterComponent, canActivate: [ActorRoleGuard], data: { expectedRole: 'anonymous|Administrator'}},
  { path: 'Dashboard', component: DashboardComponent, canActivate: [ActorRoleGuard], data: { expectedRole: 'Administrator'}},
  { path: 'TripCreateComponent', component: TripCreateComponent },
  { path: 'ApplicationCreateComponent', component: ApplicationCreateComponent }, 
  {
    path: 'trips', children: [
      { path: 'TripDisplay/:id', component: TripDisplayComponent },
      
      { path: '', component: TripListComponent }
    ]
  },

  {
    path: 'applications', children: [
      { path: 'ApplicationDisplay/:id', component: ApplicationDisplayComponent },
      { path: '', component: ApplicationListComponent,canActivate: [ActorRoleGuard], data: { expectedRole: 'Explorer|Manager'} }
    ]
  },
  { path: 'ApplicationList', component: ApplicationListComponent },
  { path: 'ApplicationDisplay', component: ApplicationDisplayComponent },
  { path: 'denied-access', component: DeniedAccessPageComponent },
  { path: 'terms-and-conditions', component: TermAndConditionsComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(appRoutes);
