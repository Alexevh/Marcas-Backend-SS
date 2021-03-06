import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario/usuario.service';
import { Usuario } from '../../modelos/usuario.model';
import { Router } from '@angular/router';
import { WebsocketService } from 'src/app/servicios/websocket/websocket.service';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/servicios/chat/chat.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit, OnDestroy {

  usuario: Usuario;

  mensajes: any[] = [];
  erroresSistema: any[] =[];

  texto = "";
  mensajesSuscripcion: Subscription;
  mensajesPrivadosSuscripcion: Subscription;
  mensajesErroresSuscripcion: Subscription;
  elemento: HTMLElement;
  mensajes_sinleer = false;
  mensajesError_sinleer = false;



  constructor(public usuariosrv: UsuarioService, public router: Router, public wsocket: WebsocketService, public chat: ChatService) {


  }



  ngOnInit() {

    this.usuario = this.usuariosrv.usuario;
    /* obtengo la ereferencia a la caja de chat ya que voy a hacer un scroll automatico */
    this.elemento = document.getElementById('chat-mensajesH');

    /* me voy a suscribir a los mensajes privados */
    this.mensajesPrivadosSuscripcion = this.chat.escucharPrivados().subscribe((msg: any) => {

      /* si no aoy yo entonces hay mensajes sin leer */
      if (msg.de != this.usuario.nombre) {
        this.mensajes_sinleer = true;

      }

      this.mensajes.push(msg);
      /* le pongo un timeout minimo al scroll por que necesito que espere a que este el mensaje rendrizado */
      setTimeout(() => {


        this.elemento.scrollTop = this.elemento.scrollHeight;

      }, 50);

    });

    /* escucho los mensajes de error del backend */
    this.mensajesErroresSuscripcion = this.chat.escucharMensajesSistema().subscribe((msg:any)=>{
      this.mensajesError_sinleer = true;
      //console.log('la lista de errores es', msg[0].titulo);
      this.erroresSistema.push(msg);
      this.mensajesError_sinleer = true;
    });


  }


  buscar(termino: string) {

    /* como si el termino es una agenda va a ser 1/2020 necesito reemplazar la barra por un - ya que el servicio rest no va a recibir la barra */
    let t2 = termino.replace('/', '-');

    console.log('el termino es', t2);

    this.router.navigate(['/busqueda/' + t2]);

  }

  /* cuando salga del chat destruyo la suscripcion */
  ngOnDestroy() {
    this.mensajesPrivadosSuscripcion.unsubscribe();
  }

  enviar() {

    this.chat.enviarMensaje(this.texto);


    this.texto = '';
  }

  borarMensajesSistema(){
    this.erroresSistema = [];
  }


}
