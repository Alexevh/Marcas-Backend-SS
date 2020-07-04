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

  mensajes: any [] = [];
  texto = "";
  mensajesSuscripcion: Subscription;
  elemento: HTMLElement;
  mensajes_sinleer = false;

  constructor(public usuariosrv: UsuarioService, public router: Router, public wsocket: WebsocketService, public chat: ChatService) {

    
   }



  ngOnInit() {

    this.usuario = this.usuariosrv.usuario;


    /* obtengo la ereferencia a la caja de chat ya que voy a hacer un scroll automatico */
    this.elemento = document.getElementById('chat-mensajes');

    /* me suscribo al observable que va a tener los mensajes nuevos */
    this.mensajesSuscripcion =this.chat.escucharMensajes().subscribe((msg:any) => {

      this.mensajes.push(msg);

      /* si no aoy yo entonces hay mensajes sin leer */
      if (msg.de != this.usuario.nombre){
        this.mensajes_sinleer = true;

      }
    

      /* le pongo un timeout minimo al scroll por que necesito que espere a que este el mensaje rendrizado */
      setTimeout( ()=> {


        this.elemento.scrollTop = this.elemento.scrollHeight;
        
      }, 50);

    });
  }


  buscar(termino: string){

   /* como si el termino es una agenda va a ser 1/2020 necesito reemplazar la barra por un - ya que el servicio rest no va a recibir la barra */ 
   let t2 = termino.replace('/', '-');

    console.log('el termino es', t2);

    this.router.navigate(['/busqueda/'+t2]);

  }

   /* cuando salga del chat destruyo la suscripcion */
   ngOnDestroy(){
    this.mensajesSuscripcion.unsubscribe();
  }

  enviar(){

    this.chat.enviarMensaje(this.texto);
 

    this.texto = '';
  }


}
