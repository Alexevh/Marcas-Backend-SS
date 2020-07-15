import { Component, OnInit } from '@angular/core';
import { MAPAS_TOKEN } from '../../config/config';
import * as mapboxgl from 'mapbox-gl';
import { Lugar } from 'src/app/interfaces/interfaces';


/* la funcion init_plugins se encuentra en el custom.js y lo que hace es inicializar los plugins del template que estoy usando
Estoy ejecutando esta funcion dos veces, una en login.componet y otra en pages.component de manera de asegurarme que siempre va a cargar
los plugins del template
 */
declare function init_plugins();

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  mapa: mapboxgl.Map;

  /* esto va a ser traido del servicio rest */
  lugares: Lugar[] = [{
    id: '1',
    nombre: 'CDBUENOSAIRES',
    lng: -58.37723,
    lat: -34.61315,
    color: '#dd8fee'
  },
  {
    id: '2',
    nombre: 'CGCARACAS',
    lng: -66.87919,
    lat: 10.48801,
    color: '#790af0'
  },
  {
    id: '3',
    nombre: 'CDCHUI',
    lng: -53.45667,
    lat: -33.69111,
    color: '#19884b'
  },
  {
    id: '3',
    nombre: 'MRREE',
    lng: -56.18816,
    lat: -34.90328,
    color: '#19884b'
  }
];



  constructor() { }

  ngOnInit() {
    init_plugins();
    this.crearMapa();
  }


  crearMapa() {

    /* el error de typescript me da al pedo por que igual anda, si quisiera quitarlo podria hacer una chanchada como
    por ejemplo (mapboxgl as any).accessToken = 'MAPAS_TOKEN  y eso anda*/
    (mapboxgl as any).accessToken = MAPAS_TOKEN;


    this.mapa = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      /* longitud es el primer paramtero */
      center: [-56.18816, -34.90328],
      zoom: 5.8
    });

    /** Agrego marcadores */
    for (const marcador of this.lugares) {
      this.agregarMarcador(marcador);
    }

  }


  agregarMarcador(marcador: Lugar) {

    const html = `${marcador.nombre} <br><button>Cerrar</button>`;

     /* hago el popup */
    const customPopUp = new mapboxgl.Popup({
      offset: 25,
      closeOnClick: false
    }).setHTML(html);

    const posicion = new mapboxgl.Marker({
      draggable: true,
      color: marcador.color,
      

    })
    .setLngLat([marcador.lng, marcador.lat])
    .setPopup(customPopUp)
    .addTo(this.mapa);

  }


}
