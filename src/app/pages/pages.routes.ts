import { Routes, RouterModule } from '@angular/router';


/* Rutas para las paginas de la APP */
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AjustesPersonalesComponent } from './ajustes-personales/ajustes-personales.component';

/* Paginas comunes  o compartidas como el navbar, sidebar, 404, etc*/
import { PagesComponent } from './pages.component';
import { LoginGuardGuard } from '../servicios/guards/login-guard.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PersonasComponent } from './personas/personas.component';
import { AltapersonasComponent } from './altapersonas/altapersonas.component';
import { TramitesComponent } from './tramites/tramites.component';
import { TramiteComponent } from './tramites/tramite.component';




/* Pages component tiene el esqueleto de la app, con los elementos generales colocados como el sidebar, navbar etc
  le definimos las rutas hijas que por ser hijas, cuando se llamen van a ser vistas en el router outlet del template
  en lugar del router-outlet del app.component.html que es el template general verdadero de la app por defecto
*/ 

const pagesRoutes: Routes = [
    {    path: '',
         component: PagesComponent,
         /* verifico que este logeado */
         canActivate: [LoginGuardGuard],
          children: [
                    {path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'}},
                    {path: 'graficas1', component: Graficas1Component, data: {titulo: 'Estadisticas'}},
                    {path: 'dashboard', component: DashboardComponent, data: {titulo: 'Inicio'}},
                    {path: 'ajustes', component: AjustesPersonalesComponent, data: {titulo: 'Ajustes'}},
                    {path: 'perfil', component: PerfilComponent, data: {titulo: 'Perfil'}},
                    {path: 'personas', component: PersonasComponent, data: {titulo: 'Personas'}},
                    {path: 'tramites', component: TramitesComponent, data: {titulo: 'Tramites'}},
                    {path: 'tramite/:id', component: TramiteComponent, data: {titulo: 'Actualizar Tramite'}},
                    
                    // Menu Director
                    {path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Mantenimiento usuarios'}},
                    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
                    {path: 'alta-personas', component: AltapersonasComponent, data: {titulo: 'Nueva persona'}},
  ]
},

];

/*  Como son rutas secundarias suamos forchild */
export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);