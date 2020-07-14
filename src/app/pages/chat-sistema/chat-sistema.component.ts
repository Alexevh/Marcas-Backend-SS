import { Component, OnInit } from "@angular/core";
import { WebsocketService } from "../../servicios/websocket/websocket.service";
import { Usuario } from "../../modelos/usuario.model";
import { UsuarioService } from "../../servicios/usuario/usuario.service";
import { UsuarioChat } from "../../modelos/usuarioChat";
import { Subscription } from "rxjs";
import { ChatService } from '../../servicios/chat/chat.service';
/* la funcion init_plugins se encuentra en el custom.js y lo que hace es inicializar los plugins del template que estoy usando
Estoy ejecutando esta funcion dos veces, una en login.componet y otra en pages.component de manera de asegurarme que siempre va a cargar
los plugins del template
 */
declare function init_plugins();

@Component({
  selector: "app-chat-sistema",
  templateUrl: "./chat-sistema.component.html",
  styleUrls: ["./chat-sistema.component.css"],
})
export class ChatSistemaComponent implements OnInit {
  public usuario: Usuario;

  public listaConectados: UsuarioChat[] = [];
  usuariosSuscripcion: Subscription;
  mensajesSuscripcion: Subscription;
  mensajes: any[] = [];
  texto = "";
  elemento: HTMLElement;

  constructor(public wss: WebsocketService, public uss: UsuarioService, public chat: ChatService) {}

  ngOnInit() {
    this.usuario = this.uss.usuario;
    this.wss.loginWS(
      this.usuario.nombre,
      this.usuario.foto,
      this.usuario.mision
    );
    this.mensajes = this.chat.mensajes;
    /* obtengo la ereferencia a la caja de chat ya que voy a hacer un scroll automatico */
    this.elemento = document.getElementById('chat-mensajes');

    /* me suscribo al observable que va a tener los mensajes nuevos */
    this.mensajesSuscripcion = this.chat.nuevoMensaje.subscribe((msg) => {

      this.mensajes = this.chat.mensajes;

      /* le pongo un timeout minimo al scroll por que necesito que espere a que este el mensaje rendrizado */
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);
    });

    /* me suscribo al observable que va a tener los mensajes nuevos */
    this.usuariosSuscripcion = this.chat.escucharUsuarios().subscribe((usr:any) => {
      /* yo mismo no me logeo */
    
        this.listaConectados.push(usr);
      
    });
    init_plugins();
  }


    /* cuando salga del chat destruyo la suscripcion */
    ngOnDestroy(){
     // this.mensajesSuscripcion.unsubscribe();
    }
  
    enviar(){
  
      this.chat.enviarMensaje(this.texto);
  
      this.texto = '';
    }
}
