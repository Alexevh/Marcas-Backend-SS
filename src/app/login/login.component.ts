import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(public router: Router) { }

  ngOnInit() {

    init_plugins();
  }

  ingresar(){
    console.log('Inmgresando');
    this.router.navigate(['/dashboard']);
  }

}
