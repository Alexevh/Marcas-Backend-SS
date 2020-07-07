import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { UsuarioService } from '../usuario/usuario.service';
import { Usuario } from 'src/app/modelos/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public soscketStatus = false;
  

  constructor(private socket: Socket) {

    //this.usuario = this.uservice.usuario;
    this.checkStatus();

   }


   /* verifica si el servidor esta arriba */
   public checkStatus(){

    /* cuando jaho un sockeo on se genera un pbservavble, estos siempren van a estar pendientes escuchando el conect y el disconect */
    this.socket.on('connect', ()=> {

      console.log('Conectado al servidor');
      this.soscketStatus = true;

    });

    this.socket.on('disconnect', ()=> {

      console.log('Desconectado  del servidor');
      this.soscketStatus = false;

    });

   }

  /* Metodo para enviar por socket als erver */
   public emit(evento: string, payload?: any, callback?: Function){

    this.socket.emit(evento, payload, callback);

   }

   /* metodo para escuchar cualquier evento, esta funcion regresa un observavle a dond eme puedo suscribir desde
   cualquier parte de la aplicaicon para escuchar lo que necesito */
   public listen(evento: string){

    return this.socket.fromEvent(evento);

   }


   /* voy a registrar al usuario en el websocket */
public loginWS(nombre: string, foto: string, mision: string){

  

  console.log('Configurando a...', nombre);
  this.socket.emit('configurar-usuario', {nombre, foto, mision}, (resp)=> {
  console.log(resp);

  });
}

}
