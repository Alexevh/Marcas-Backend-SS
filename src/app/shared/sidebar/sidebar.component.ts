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
  }

}
