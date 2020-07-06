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
import { BusquedaComponent } from './busqueda/busqueda.component';
import { DirectorGuard } from '../servicios/guards/director.guard';
import { VerificatokenGuard } from '../servicios/guards/verificatoken.guard';
import { ChatSistemaComponent } from './chat-sistema/chat-sistema.component';




/* Pages component tiene el esqueleto de la app, con los elementos generales colocados como el sidebar, navbar etc
  le definimos las rutas hijas que por ser hijas, cuando se llamen van a ser vistas en el router outlet del template
  en lugar del router-outlet del app.component.html que es el template general verdadero de la app por defecto
*/ 

const pagesRoutes: Routes = [
    {    path: '',
         component: PagesComponent,
         /* verifico que este logeado y de paso la validez del token, quizas podriamso ver alguna pagina que se vea casi siempre 
         le habia puesto tambien que verifique el token (verificatokengard) pero luego lo saque por que me parecia exagerado que
         cada vez que cambia de pagina le valide el token, pero podriamos ponerlo ahi, es cuestion de ver el rendimiento
         */
         canActivate: [LoginGuardGuard],
          children: [
                    {path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'}},
                    {path: 'graficas1', component: Graficas1Component, data: {titulo: 'Estadisticas'}},
                    {path: 'dashboard', component: DashboardComponent, data: {titulo: 'Inicio'}},
                    {path: 'ajustes', component: AjustesPersonalesComponent, data: {titulo: 'Ajustes'}},
                    {path: 'perfil', component: PerfilComponent, data: {titulo: 'Perfil'}},
                    {path: 'personas', component: PersonasComponent, data: {titulo: 'Personas'}},
                    {path: 'tramites', component: TramitesComponent, data: {titulo: 'Tramites'}, canActivate: [VerificatokenGuard]},
                    {path: 'tramite/:id', component: TramiteComponent, data: {titulo: 'Actualizar Tramite'}},
                    {path: 'busqueda/:termino', component: BusquedaComponent, data: {titulo: 'Busqueda general'}},
                    {path: 'chat', component: ChatSistemaComponent, data: {titulo: 'Chat'}},
                    
                    /* Menu Director, aca cada pagina restringida al director deberia tener la propiedad canactivate 
                    no lo hago por razones practicas en este momento
                    */
                    {path: 'usuarios', component: UsuariosComponent, canActivate: [DirectorGuard], data: {titulo: 'Mantenimiento usuarios'}},
                    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
                    {path: 'alta-personas', component: AltapersonasComponent, data: {titulo: 'Nueva persona'}},
  ]
},

];

/*  Como son rutas secundarias suamos forchild */
export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);