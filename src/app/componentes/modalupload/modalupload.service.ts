import { Injectable, EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ModaluploadService {

  public tipo: string;
  public campo: string;
  public id: string;
  
  public oculto: string = 'oculto';
  
  public notificacion = new EventEmitter<any>();
  
    constructor() {
      console.log('se llamo al modal srvice')
     }
  
  
     ocultarModal(){
      this.oculto = 'oculto';
      this.id = null;
      this.tipo = null;
      this.campo = null;
     }
  
      /* Este mmodal es para subir archivos genericamente, en mi backend tengo un solo metofo para subir ficheros
      y recibe el  tipo (usuarios, tramites, documentos, personas, el id del tramite, persona, etc y el campo , campo es
        por ejemplo foto, huellas, certificado de nacimiento, etc)
      */
     mostrarModal(tipo: string, id: string, campo: string){
      this.id = id;
      this.tipo = tipo;
      this.oculto = '';
      this.campo = campo;
  
  
  
     }
}
