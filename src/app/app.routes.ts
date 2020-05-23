// Mi archivo de rutas manual

import { Routes, RouterModule } from '@angular/router';



import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Graficas1Component } from './pages/graficas1/graficas1.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { RegistroComponent } from './registro/registro.component';


const appRoutes: Routes = [
{path: '',
 component: PagesComponent,
  children: [
    {path: 'progress', component: ProgressComponent},
    {path: 'graficas1', component: Graficas1Component},
    {path: 'dashboard', component: DashboardComponent},
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  ]
},

{path: 'login', component: LoginComponent},
{path: 'registro', component: RegistroComponent},
{path: '**', component: NopagefoundComponent},
];

// Exporto las rutas, es forRoot por que son neustras rutas principales
export const APP_ROUTES = RouterModule.forRoot( appRoutes, {useHash: true});

