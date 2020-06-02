import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Los servicios */
import { AjustesService, SharedService, SidebarService, UsuarioService, LoginGuardGuard, SubirArchivoService, ModaluploadService} from './servicios.index';
import { HttpClient, HttpClientModule } from '@angular/common/http';

/* El objetivo de este modulo es compactar todos los servicios asi poder proveerlos con una sola linea, los servicios van en el
providers[] del app.module.ts pero si tengo 10 servicios tendria 10 lineas, para poner solo una uso este modulo */

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AjustesService,
    SharedService,
    SidebarService,
    UsuarioService,
    LoginGuardGuard,
    SubirArchivoService,
    ModaluploadService
  ]
})
export class ServicioModule { }
