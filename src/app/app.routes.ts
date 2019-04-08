import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/security/register/register.component';
import { ModuleWithProviders } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/security/login/login.component';
import { HomeComponent } from './components/shared/home/home.component';
import { TripListComponent } from './components/trip/trip-list/trip-list.component';


  const appRoutes: Routes = [
    {path: 'home', component: HomeComponent},
    { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
    {path: 'login', component: LoginComponent},
    { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
    {path: 'register', component: RegisterComponent},
    { path: '',
    redirectTo: '/register',
    pathMatch: 'full'
  },
  {path: 'TripList', component: TripListComponent},
  { path: '',
  redirectTo: '/TripList',
  pathMatch: 'full'
}
  ];



  export const routes: ModuleWithProviders = RouterModule.forRoot(appRoutes);
