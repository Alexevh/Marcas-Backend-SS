import { Injectable } from '@angular/core';
import { WebsocketService } from '../websocket/websocket.service';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(public wsservice: WebsocketService, public usrservice: UsuarioService) { }

 enviarMensaje(mensaje: string){

 /* genero el payload a enviar al server */
  const payload = {
    de: this.usrservice.usuario.nombre,
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

}
