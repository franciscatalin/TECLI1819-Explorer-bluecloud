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

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    redirectTo: '/register',
    pathMatch: 'full'
  },
  { path: 'TripList', component: TripListComponent },
  {
    path: '',
    redirectTo: '/TripList',
    pathMatch: 'full'
  },
  { path: 'TripDisplay', component: TripDisplayComponent },
  {
    path: '',
    redirectTo: '/TripList',
    pathMatch: 'full'
  },
  { path: 'ApplicationList', component: ApplicationListComponent },
  {
    path: '',
    redirectTo: '/ApplicationList',
    pathMatch: 'full'
  },
  { path: 'ApplicationDisplay', component: ApplicationDisplayComponent },
  {
    path: '',
    redirectTo: '/ApplicationDisplay',
    pathMatch: 'full'
  },
  { path: 'Dashboard', component: DashboardComponent },
  {
    path: '',
    redirectTo: '/Dashboard',
    pathMatch: 'full'
  },
  { path: 'TermAndConditions', component: TermAndConditionsComponent },
  {
    path: '',
    redirectTo: '/TermAndConditions',
    pathMatch: 'full'
  },
  { path: 'not-found', component: NotFoundComponent },
  {
    path: '',
    redirectTo: '/not-found',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '/not-found' }
];



export const routes: ModuleWithProviders = RouterModule.forRoot(appRoutes);
