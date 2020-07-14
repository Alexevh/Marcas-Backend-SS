import { Injectable, Output, EventEmitter } from '@angular/core';
import { WebsocketService } from '../websocket/websocket.service';
import { UsuarioService } from '../usuario/usuario.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  /* cuando haya un nuevo mensaje se lo paso a los usuarios que escuchan */
  @Output() nuevoMensaje: EventEmitter<boolean> = new EventEmitter();

  public mensajesSuscripcion: Subscription;
  public mensajes: any[] = [];

  constructor(public wsservice: WebsocketService, public usrservice: UsuarioService) {

      /* me suscribo al observable que va a tener los mensajes nuevos */
      this.mensajesSuscripcion = this.escucharMensajes().subscribe((msg) => {
        this.mensajes.push(msg);
        this.nuevoMensaje.emit(true);
  
        /* le pongo un timeout minimo al scroll por que necesito que espere a que este el mensaje rendrizado */
        setTimeout(() => {
          //*this.elemento.scrollTop = this.elemento.scrollHeight;
        }, 50);
      });


   }

 enviarMensaje(mensaje: string){

 /* genero el payload a enviar al server */
  const payload = {
    de: this.usrservice.usuario.nombre,
    foto: this.usrservice.usuario.foto,
    fecha: new Date().getTime(),
    msg: mensaje
  };

   /* emito el mensaje, el swevridor va a esperar un mensaje */
  this.wsservice.emit('mensaje', payload);
  



 }

 /* Estoy pensiente de los mensajes que lleguen */
 escucharMensajes(){

  /* me suscribo a los mensajes nuevos, un obserbavle no va a escuchar nada hasta susvribirse, pero yo no me quiero suscribir aqui
  lo voy a hacer en el chat component, por eso hago un return */
  return this.wsservice.listen('mensaje-nuevo');
    
}

/* escucho los mensajes privados */
escucharPrivados(){
  return this.wsservice.listen('mensaje-privado');
}

 /* Estoy pensiente de los mensajes que lleguen de inresos de*/
 escucharUsuarios(){

  /* me suscribo a los mensajes nuevos, un obserbavle no va a escuchar nada hasta susvribirse, pero yo no me quiero suscribir aqui
  lo voy a hacer en el chat component, por eso hago un return */
  return this.wsservice.listen('ingreso-usuario');
    
}

/* escucho los mensajes del sistema */
escucharMensajesSistema(){
  return this.wsservice.listen('ingreso-mensajes-sistema');
}

}
