import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public soscketStatus = false;

  constructor(private socket: Socket) {

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
}
