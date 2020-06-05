import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})




export class SidebarService {


 /* el menu me lo enrega el backend segun el rol */
 menu: any[];

  constructor(public usuarioservice: UsuarioService) { 


      //this.cargarMenu();
  }


    /* La carga del menu la voy a llamar desde el componente y no desde el servicio debido a que si lo hago en el servicio y un usuario se
    deslogea , el servicio ya esta inicializado y no va a refrescar el menu, de esta manera obligo siempre a recargar el menu */
  cargarMenu(){
    this.menu = this.usuarioservice.menu;
  }
}
