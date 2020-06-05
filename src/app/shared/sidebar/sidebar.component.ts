import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../servicios/servicios.index';
import { UsuarioService } from '../../servicios/usuario/usuario.service';
import { Usuario } from '../../modelos/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  usuario: Usuario;

  constructor(public _sidebar: SidebarService, public usrservice: UsuarioService) { }

  ngOnInit() {

    this.usuario = this.usrservice.usuario;

    /* Hago aca la caega del menu ya que si lo pongo en el sidebar service me puede pasar que un admin se logee
    luego salga y como el componente ya esta inicializado no refresque el menu */
    this._sidebar.cargarMenu();
  }

}
