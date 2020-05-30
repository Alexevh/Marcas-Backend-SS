import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../servicios/servicios.index';
import { UsuarioService } from '../../servicios/usuario/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(public _sidebar: SidebarService, public usrservice: UsuarioService) { }

  ngOnInit() {
  }

}
