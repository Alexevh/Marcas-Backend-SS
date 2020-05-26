import { Component } from '@angular/core';
import { AjustesService } from './servicios/servicios.index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SistemaR';

 /* el APP component es lo que se carga al principio de la aplicacion  por eso voy a cargar los ajustes aca */
  constructor( private ajustes: AjustesService){

   
  }
}
