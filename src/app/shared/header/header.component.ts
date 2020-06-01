import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario/usuario.service';
import { Usuario } from '../../modelos/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;

  constructor(public usuariosrv: UsuarioService) {

    
   }



  ngOnInit() {

    this.usuario = this.usuariosrv.usuario;
  }


}
