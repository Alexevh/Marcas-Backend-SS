import { Component, OnInit } from '@angular/core';
import { MAPAS_TOKEN } from '../../config/config';
import * as mapboxgl from 'mapbox-gl';
import { Lugar } from 'src/app/interfaces/interfaces';
import { MapasService } from '../../servicios/mapas/mapas.service';
import { UsuarioService } from '../../servicios/usuario/usuario.service';
import { WebsocketService } from '../../servicios/websocket/websocket.service';



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
  lugares: Lugar[] = [];

  /* marcadores en el mapa, los guardo como objetos aca para poder referenciarlos luego para borarlos ya que mapbox
  no tiene una forma facil de rerefenciarlos en el canvas */
  marcadores: { [id: string]: mapboxgl.Marker } = {};


  constructor(private mapaservice: MapasService, private usrservicio: UsuarioService, private wsservice: WebsocketService) { }

  ngOnInit() {
    init_plugins();
    this.mapaservice.cargarMarcadoresIniciales().subscribe((data: any) => {

      this.lugares = data.marcadores;
      this.crearMapa();
    });

    this.escucharSokets();


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

    /* si no voy a permitir borrar el marcador con un boton podria hacer asi el popup y en donde dice setDomContent seria setHTML
       const html = `${marcador.nombre} <br><button><i class='fa fa-trash'></i></button>`;
    */



    /* voy a hacer asi en vanilla JS el popup ya que de esa manera puedo poner un listener, MAPBOX por ahora no tiene una forma
    mas simple de borrar un marcador */
    const h4 = document.createElement('h4');
    h4.innerText = marcador.nombre;
    const icono = document.createElement('i');
    icono.classList.add('fa');
    icono.classList.add('fa-trash');
    const boton = document.createElement('button');
    boton.append(icono);
    const div = document.createElement('div');
    div.append(h4, boton);

    /* hago el popup */
    const customPopUp = new mapboxgl.Popup({
      offset: 25,
      closeOnClick: false
    }).setDOMContent(div);

    const posicion = new mapboxgl.Marker({
      draggable: true,
      color: marcador.color,


    })
      .setLngLat([marcador.lng, marcador.lat])
      .setPopup(customPopUp)
      .addTo(this.mapa);

    /* cuando el usuario haga drag del marcador voy a ejecutar este metodo */
    posicion.on('drag', () => {

      /* obtengo las nuevas coordenadas */
      const lnglat = posicion.getLngLat();
      console.log('emito el evento mover');
      
      const nuevoLugar = {
        id: marcador.id,
        // desestructuro lat y long
        ...lnglat
      }

      this.wsservice.emit('mover-marcador', nuevoLugar);




    });

    /* al boton que le puse al marcador le agrego un listener y ejecuto una funcion */
    boton.addEventListener('click', () => {
      posicion.remove();
      // emitir el marcador
      this.wsservice.emit('eliminar-marcador', marcador.id);
    });

    /* esto lo jhago para poder borrarlos del mapa, cualquier cosa ver descripcopn en la lista */
    this.marcadores[marcador.id] = posicion;

  }


  obtenerColorAleatorio() {
    // Función para generar un color HEX random
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }


  /* CRear marcador, es una funcion que seria llamada cuando el usuario se conecte por ejemplo en un consulado movil
  obtendria sus coordenadas y emitiria el evento
  */

  crearMarcador() {

    const usuario = this.usrservicio.usuario;

    const miposicion: Lugar = {

      id: usuario.uid,
      nombre: this.usrservicio.usuario.nombre,
      lat: -34.90328,
      lng: -56.18816,
      color: '#f0d0d0'
    };

    this.agregarMarcador(miposicion);

    // emitir el marcador
    this.wsservice.emit('nuevo-marcador', miposicion);

  }



  /* escuchar Sockets */
  escucharSokets() {
    // marcador nuevo

    this.wsservice.listen('nuevo-marcador').subscribe((marcador: Lugar) => {
      this.agregarMarcador(marcador);
    });

    // marcador se mueve
    this.wsservice.listen('mover-marcador').subscribe((marcador: Lugar) => {
      // console.log('me llega el evento mover')
      this.marcadores[marcador.id].setLngLat([marcador.lng, marcador.lat]);
    });

    // marcador borrar
    this.wsservice.listen('eliminar-marcador').subscribe((marcador: string) => {

      // console.log('me llega un mensaje de borrar el marcador ', marcador);
      this.marcadores[marcador].remove();
      delete this.marcadores[marcador];

    });

  }

  borrarMarcador(id: string) {

  }


}
