import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

/* Paginas */
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
import { IncrementadorComponent } from '../componentes/incrementador/incrementador.component';
import { AjustesPersonalesComponent } from './ajustes-personales/ajustes-personales.component';


/* Graficas */
import { ChartsModule } from 'ng2-charts';
import { GraficoDonaComponent } from '../componentes/grafico-dona/grafico-dona.component';
import { PipesModule } from '../pipes/pipes.module';
import { PerfilComponent } from './perfil/perfil.component';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModaluploadComponent } from '../componentes/modalupload/modalupload.component';
import { PersonasComponent } from './personas/personas.component';
import { AltapersonasComponent } from './altapersonas/altapersonas.component';
4
/* acrive forms, necesario para trabajar con formularios NG */
import {  ReactiveFormsModule } from '@angular/forms';
import { TramitesComponent } from './tramites/tramites.component';
import { TramiteComponent } from './tramites/tramite.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { TokenService } from '../interceptores/token.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';



/* Este modulo controla todas las paginas alojadas en pages */
@NgModule({

    declarations: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent,
        IncrementadorComponent,
        GraficoDonaComponent,
        AjustesPersonalesComponent,
        PerfilComponent,
        UsuariosComponent,
        ModaluploadComponent,
        PersonasComponent,
        AltapersonasComponent,
        TramitesComponent,
        TramiteComponent,
        BusquedaComponent,
        
       
       
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent,
        
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        PipesModule,
        CommonModule,
        ReactiveFormsModule
      ],
      providers: [
        /*
        
        {
            // esta es la config basica de un interceptor, podriamos tener mas de uno, este lo que hace es a cada peticion http le agrega
            el token de usuario , lo comento por que me da un error en el login que tengo que ver como correjir
            provide: HTTP_INTERCEPTORS,
            useClass: TokenService,
            multi: true
          }
        */
      ]

})

export class PagesModule {}