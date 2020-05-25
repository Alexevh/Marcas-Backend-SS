import { Routes, RouterModule } from '@angular/router';


/* Rutas para las paginas de la APP */
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { AjustesPersonalesComponent } from './ajustes-personales/ajustes-personales.component';



/* Pages component tiene el esqueleto de la app, con los elementos generales colocados como el sidebar, navbar etc
  le definimos las rutas hijas que por ser hijas, cuando se llamen van a ser vistas en el router outlet del template
  en lugar del router-outlet del app.component.html que es el template general verdadero de la app por defecto
*/

const pagesRoutes: Routes = [
    {    path: '',
         component: PagesComponent,
          children: [
                    {path: 'progress', component: ProgressComponent},
                    {path: 'graficas1', component: Graficas1Component},
                    {path: 'dashboard', component: DashboardComponent},
                    {path: 'ajustes', component: AjustesPersonalesComponent},
                    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  ]
},

];

/*  Como son rutas secundarias suamos forchild */
export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);