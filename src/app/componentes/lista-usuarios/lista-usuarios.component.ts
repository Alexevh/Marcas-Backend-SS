import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../servicios/chat/chat.service';
import { Observable, Subscription } from 'rxjs';
import { UsuarioChat } from 'src/app/modelos/usuarioChat';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  public listaConectados: UsuarioChat[] = [];
  //public usuariosActivosObs: Observable<any>;
  public usuariosSuscripcion: Subscription;

  constructor(public chat: ChatService) { }

  ngOnInit() {

     /* me suscribo al observable que va a tener los usuarios nuevos */
     this.usuariosSuscripcion = this.chat.escucharUsuarios().subscribe((lista:any) => {
    
    /* la respuesta es un listaconectados que tiene a su vez el obketo de la lista, por eso aparece doble
    Tambien voy a controlar si   el nombre aparecen en blanco significa que se desconecto, lo saco de la lista
    */
    this.listaConectados = lista.listaConectados.filter( usuario => usuario.nombre !==''  );

    //console.log(this.listaConectados)
      
    });
    
  }

}
