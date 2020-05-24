// Mi archivo de rutas manual, va a tener unicamente la 404 y aquellas que no requieran tener el template general de la app

import { Routes, RouterModule } from '@angular/router';



import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';


const appRoutes: Routes = [
{path: 'login', component: LoginComponent},
{path: 'registro', component: RegistroComponent},
{path: '**', component: NopagefoundComponent},
];

// Exporto las rutas, es forRoot por que son neustras rutas principales
export const APP_ROUTES = RouterModule.forRoot( appRoutes, {useHash: true});

