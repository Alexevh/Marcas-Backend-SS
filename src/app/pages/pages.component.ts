import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../servicios/websocket/websocket.service';
/* la funcion init_plugins se encuentra en el custom.js y lo que hace es inicializar los plugins del template que estoy usando
  pongo en esta pagina el init plugins para que se ejecute al inicio y no de el error de carga
  
  */
declare function init_plugins();



/* Como en lugar de hacer un SPA estamos usando un template diferente para la APP que para el login, las paginas en si mismas vas
a ser controladas por su propio componente */
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

 
  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
