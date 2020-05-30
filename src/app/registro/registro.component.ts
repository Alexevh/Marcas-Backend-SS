import { Component, OnInit } from '@angular/core';
import { Form, FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

/* la funcion init_plugins se encuentra en el custom.js y lo que hace es inicializar los plugins del template que estoy usando
Estoy ejecutando esta funcion dos veces, una en login.componet y otra en pages.component de manera de asegurarme que siempre va a cargar
los plugins del template
 */
declare function init_plugins();


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: [ './registro.component.css']
})
export class RegistroComponent implements OnInit {

  forma : FormGroup;

  constructor() { }

  ngOnInit() {
    init_plugins();

     /*  Inicializo el formulario */
     this.forma = new FormGroup({
  
       nombre: new FormControl(null, Validators.required),
       uid: new FormControl(null, [Validators.required, Validators.email]),
       password: new FormControl(null, Validators.required),
       password2: new FormControl(null, Validators.required),
       acepto: new FormControl( false),

     }, {validators: this.sonIguales('password', 'password2')});

  }

  registrarUsuario(){

/* no voy a dejar hacer usuarios */

Swal.fire({
  title: 'Importante',
  text: 'El registro de usuarios no esta disponible',
  icon: 'error'
});
 return;

 /* dejo esto comentado por si en elgun momento quiero registrar usuarios
 
 
 
    if (this.forma.invalid){
      Swal.fire({
        title: 'Importante',
        text: 'Verifique los datos',
        icon: 'error'
      });
      return;
    }

   if (!this.forma.value.acepto){

    Swal.fire({
      title: 'Importante',
      text: 'Debe aceptar las condiciones',
      icon: 'error'
    });
     return;
   }
 
 */


  }


 sonIguales(campo1, campo2){

  return( group: FormGroup) => {
  
    let pass1 = group.controls[campo1].value;
    let pass2 = group.controls[campo2].value;
    if (pass1===pass2){
      return null
    } else {

      
      return {sonIguales: true};

    }
  }

  

 }

}
