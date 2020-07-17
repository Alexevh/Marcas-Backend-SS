import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { google } from 'google-maps';
import { Lugar } from '../../interfaces/interfaces';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Marker } from 'mapbox-gl';
import { MapasService, UsuarioService, WebsocketService } from 'src/app/servicios/servicios.index';
import { title } from 'process';

@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.css']
})
export class GmapComponent implements OnInit {

  /* tomo la referencia al hijo, es el div que tiene el elemento gmapa */
  @ViewChild('gmapa', null) elementoMapa: ElementRef;
  mapa: google.maps.Map;

  /* necisto una referencia a cada marcador para poder borrarlo luego */
  marcadores: google.maps.Marker[] = [];

  /* infowindows, como quiero poder cerrar de a uno los infowindows los tengo que manejar en un arreglo */
  infoWindows: google.maps.InfoWindow[] = [];

  lugares: Lugar[] = [];

  constructor(private mapaservice: MapasService, private usrservicio: UsuarioService, private wsservice: WebsocketService) { }

  ngOnInit() {


    this.mapaservice.cargarMarcadoresIniciales().subscribe((data: any) => {

      console.log(data);
      this.lugares = data.marcadores;
      this.cargarMapa();
      this.escucharSockets();
    });

  }


  /** voy a iniciar el mapa en montevideo siempre */
  cargarMapa() {

    const lng = -56.18816;
    const lat = -34.90328;

    /* Google me pide asi las coordenadas */
    const latlng = new google.maps.LatLng(lat, lng);

    /* Opciones del mapa */
    const mapaOpciones: google.maps.MapOptions = {

      center: latlng,
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP

    };

    /* genero el mapa en blanco centrado */
    this.mapa = new google.maps.Map(this.elementoMapa.nativeElement, mapaOpciones);

    /* le agrego el listener de nuevos marcadores a golpe de click (cosa que no voy a dejar en prod) */
    this.mapa.addListener('click', (datos:any) => {

      const nuevoMarcador: Lugar = {
        nombre: 'Nuevo',
        lat: datos.latLng.lat(),
        lng: datos.latLng.lng(),
        id:  new Date().toISOString(),
        color: "srara"
      };
      this.agregarMarcador(nuevoMarcador);

      // emitir socket
      this.wsservice.emit('nuevo-marcador', nuevoMarcador);

    });

    /* le agrego los marcadores iniciales */
    for (const lugar of this.lugares) {
      console.log('agrego ', lugar);
      this.agregarMarcador(lugar);
    }


  }

  obtenerColorAleatorio() {
    // Función para generar un color HEX random
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  agregarMarcador(marcador: Lugar) {


    console.log('me llega lat ', marcador.lat)
    /* Google me pide asi las coordenadas */
    const latlng = new google.maps.LatLng(marcador.lat, marcador.lng);
    /* creo el marcador */
    const nuevoMarcador = new google.maps.Marker({
      map: this.mapa,
      animation: google.maps.Animation.DROP,
      position: latlng,
      draggable: true,
      // le encajo el ID al title para poder luego borrarlo o moverlo
      title: marcador.id
    });

    this.marcadores[marcador.id]= nuevoMarcador;

    /* le agrego el infowindow */
    const html = `<b>${marcador.nombre}</b>`;
    const info = new google.maps.InfoWindow({
      content: html
    });
    /* esta es mi coleccion de infos */
    this.infoWindows.push(info);


    google.maps.event.addDomListener(nuevoMarcador, 'click', (datos) => {

      /* cierro todos los infowindows antes de abrir el nuevo */
      for (const inf of this.infoWindows) {
        inf.close();
      }
     

      info.open(this.mapa, nuevoMarcador);

    });


    /* le agrego los listeners al marcador , si hace doble lcik lo borro*/
    google.maps.event.addDomListener(nuevoMarcador, 'dblclick', (datos) => {

      nuevoMarcador.setMap(null);
      // emito el evento
      this.wsservice.emit('eliminar-marcador', marcador.id);

    });

    // Evento drag
    google.maps.event.addDomListener(nuevoMarcador, 'drag', (datos: any) => {

      const nMarcador = {
        lat: datos.latLng.lat(),
        lng: datos.latLng.lng(),
        nombre: marcador.nombre,
        id: marcador.id
      };

      console.log(nuevoMarcador);
      // emito el evento
      this.wsservice.emit('mover-marcador', nMarcador);

    });

  }


  escucharSockets(){


      // marcador nuevo

      this.wsservice.listen('nuevo-marcador').subscribe((marcador: Lugar) => {
        this.agregarMarcador(marcador);
      });
  
      // marcador se mueve
      this.wsservice.listen('mover-marcador').subscribe((marcador: Lugar) => {
        console.log('me llega el evento mover');
        const latlng = new google.maps.LatLng(marcador.lat, marcador.lng);
        this.marcadores[marcador.id].setPosition(latlng);
      });
  
      // marcador borrar
      this.wsservice.listen('eliminar-marcador').subscribe((marcador: string) => {
  
        // console.log('me llega un mensaje de borrar el marcador ', marcador);
        this.marcadores[marcador].setMap(null);
       
  
      });
  }


}
