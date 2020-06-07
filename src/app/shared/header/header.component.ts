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

   /* como si el termino es una agenda va a ser 1/2020 necesito reemplazar la barra por un - ya que el servicio rest no va a recibir la barra */ 
   let t2 = termino.replace('/', '-');

    console.log('el termino es', t2);

    this.router.navigate(['/busqueda/'+t2]);

  }


}
