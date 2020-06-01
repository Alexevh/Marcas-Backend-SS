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
        CommonModule
      ],

})

export class PagesModule {}