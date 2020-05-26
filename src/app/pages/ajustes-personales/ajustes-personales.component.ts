import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AjustesService } from '../../servicios/servicios.index';






@Component({
  selector: 'app-ajustes-personales',
  templateUrl: './ajustes-personales.component.html',
  styleUrls: ['./ajustes-personales.component.css']
})
export class AjustesPersonalesComponent implements OnInit {

  /* El tema que el usuario puede ejejir esta en el index.html, ese fichero esta fuera del scope de nuestra aplicacion y por eso
  no podemos usar angular para controlarlo, voy a tomar una referencia completa al DOM injectando este document */
  constructor( @Inject(DOCUMENT) private _document, private servicioAjustes: AjustesService) { }

  ngOnInit() {
  
    /* cuando la pagina es cargada dibujo el check en la opcion */
  this.colocarCheck();
   
  }


  cambiarColor(tema: string, link: any){

  this.aplicarCheck(link);

  let url = `assets/css/colors/${tema}.css`;
  this._document.getElementById('tema').setAttribute('href', url);
  /* guardo los cambios */
  this.servicioAjustes.ajustes.tema = tema;
  this.servicioAjustes.ajustes.temaUrl = url;
  this.servicioAjustes.guardarAjustes();

  }

  /* Es la funcion que le pine el tik de seleccion a la opcion del usuario */
  aplicarCheck(link: any){

    /* voy a barrer todos los selectores */
  let selectores: any = document.getElementsByClassName('selector');

  for (let ref of selectores){
  /* primero borro la clase working de todas */
    ref.classList.remove('working');
  }

      /* AHora le pongo la clase working als eleccionado */
     link.classList.add('working')

  }

 /* Es parecda a la anterio pero es para ponerlo en el cargar storage */
 colocarCheck() {

  let selectores: any = document.getElementsByClassName('selector');

  let tema = this.servicioAjustes.ajustes.tema;

  for (let ref of selectores){
    /* primero borro la clase working de todas */
      ref.classList.remove('working');
    }

  for ( let ref of selectores ) {
    if ( ref.getAttribute('data-theme') === tema ) {
      ref.classList.add('working');
      break;
    }
  }

}
}
