import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../servicios/chat/chat.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  mensajes: any [] = [];
  texto = "";
  mensajesSuscripcion: Subscription;
  elemento: HTMLElement;

  constructor(public chat: ChatService) { }

  ngOnInit() {

    /* obtengo la ereferencia a la caja de chat ya que voy a hacer un scroll automatico */
    this.elemento = document.getElementById('chat-mensajes');

    /* me suscribo al observable que va a tener los mensajes nuevos */
    this.mensajesSuscripcion =this.chat.escucharMensajes().subscribe(msg => {

      this.mensajes.push(msg);

      /* le pongo un timeout minimo al scroll por que necesito que espere a que este el mensaje rendrizado */
      setTimeout( ()=> {


        this.elemento.scrollTop = this.elemento.scrollHeight;
        
      }, 50);

    });


    
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
