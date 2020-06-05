import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario/usuario.service';
import { Usuario } from '../../modelos/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;

  constructor(public usuariosrv: UsuarioService, public router: Router) {

    
   }



  ngOnInit() {

    this.usuario = this.usuariosrv.usuario;
  }


  buscar(termino: string){

    this.router.navigate(['/busqueda/'+termino]);

  }


}
