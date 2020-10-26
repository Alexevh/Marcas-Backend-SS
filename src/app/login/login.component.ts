import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../servicios/servicios.index';
import { Usuario } from '../modelos/usuario.model';
import Swal from "sweetalert2";
import { WebsocketService } from '../servicios/websocket/websocket.service';

/* la funcion init_plugins se encuentra en el custom.js y lo que hace es inicializar los plugins del template que estoy usando
Estoy ejecutando esta funcion dos veces, una en login.componet y otra en pages.component de manera de asegurarme que siempre va a cargar
los plugins del template
 */
declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  recuerdame = false;
  uid = '';

  constructor(public router: Router, public usrService: UsuarioService, public wss: WebsocketService) { 

    init_plugins();
  }

  ngOnInit() {

    init_plugins();

    this.uid = localStorage.getItem('uid') || "";
    if (this.uid.length >0){
      this.recuerdame = true;
    }
  }

  ingresar(formulario: NgForm){
    console.log('Inmgresando');
    if (formulario.invalid){
    return;
    }

    /*  En este caso el ultimo valor que es el UID no hace referencia al veredaero UID sino que es el mail que en este sistema
     es el UID tambien, dejo ambos por plantilla
    */
    let usuario = new Usuario(null, null, formulario.value.password, null, null, null, null, formulario.value.uid  );

    this.usrService.login(usuario, formulario.value.recuerdame).subscribe( (resp:any) => {

      console.log(resp);
      this.wss.loginWS(
        this.usrService.usuario.nombre,
        this.usrService.usuario.foto,
        formulario.value.uid || null
      );
      
      this.router.navigate(['/dashboard']);

    },  (err:any)=>{
      Swal.fire("Error!", "Credenciales incorrectas", "error");
    
    });

   
  }

}
