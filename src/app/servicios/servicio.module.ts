import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Los servicios */
import { AjustesService, SharedService, SidebarService} from './servicios.index';

/* El objetivo de este modulo es compactar todos los servicios asi poder proveerlos con una sola linea, los servicios van en el
providers[] del app.module.ts pero si tengo 10 servicios tendria 10 lineas, para poner solo una uso este modulo */

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AjustesService,
    SharedService,
    SidebarService
  ]
})
export class ServicioModule { }
