import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AjustesService {

ajustes: Ajustes = {
  temaUrl: 'assets/css/colors/default-dark.css',
  tema: 'default-dark',
};


  constructor( @Inject(DOCUMENT) private _document ) { 
    this.cargarAjustes();
  }

/* Funcion que guarda en el localstorage los ajustes */
guardarAjustes(){
  localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  console.log('guardando ajsutes')
};

/* cargo los ajustes */
cargarAjustes(){

  /* me fijo si ya hay ajustes guardados */
  if (localStorage.getItem('ajustes')){
  this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
  this.aplicarTema( this.ajustes.tema );
  } else {
    this.aplicarTema( this.ajustes.tema );
  }
}

/* cuando obtengo los ajustes del storage tengo que aplicarlos en el HTML */
aplicarTema( tema: string ) {


  let url = `assets/css/colors/${ tema }.css`;
  this._document.getElementById('tema').setAttribute('href', url );

  this.ajustes.tema = tema;
  this.ajustes.temaUrl = url;

  this.guardarAjustes();

}



}




/* Esto lo hago para restringirje a mi mismo y declarar de antemano que tipo de informaicon
va a permitirse en los ajustes, si fuera un objeto ams complejo lo pondria en un archivo separado */
interface Ajustes {

  temaUrl: string;
  tema:    string;
}