import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modelos/usuario.model';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';
import Swal from 'sweetalert2';
import { ModaluploadService } from './modalupload.service';
import { SubirArchivoService } from '../../servicios/archivos/subir-archivo.service';

@Component({
  selector: 'app-modalupload',
  templateUrl: './modalupload.component.html',
  styleUrls: ['./modalupload.component.css']
})
export class ModaluploadComponent implements OnInit {

   //oculto: string = '';
   usuario: Usuario;
   imagenSubir: File;
   imagenTemp: string  | ArrayBuffer;
  constructor(public uservice: UsuarioService, public cargaarchivo: SubirArchivoService, public modalservice: ModaluploadService) { }

  ngOnInit() {
    this.usuario = this.uservice.usuario;
  }

  seleccionImagen(archivo: File){

    if (!archivo){
      this.imagenSubir = null;
      return;
    }

    //verifico si es una imagen
    if (archivo.type.indexOf('image')<0){
      Swal.fire({
        title: 'Error!',
        text:  'El archivo seleccionado no es una imagen',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    //esto es javascript puro, voy a subir a memoria la imagen del navegador que me viene en base 64
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = ()=> this.imagenTemp = reader.result;

  }

 
  cerrarModal(){
    this.imagenSubir = null;
    this.imagenTemp = null 
    this.modalservice.ocultarModal();
  }

  actualizarImagen(){

    //console.log('me llega el token', this.uservice.token)

    this.cargaarchivo.subirArchivo(this.imagenSubir, this.modalservice.tipo, this.modalservice.id,
       this.modalservice.campo, this.uservice.token).then( resp => {

     
      //notifico que se subio la imagen, en la respuesta viene el medico o el hospiotal etc
      this.modalservice.notificacion.emit(resp);
      this.cerrarModal();
      

    }).catch(err => {
      console.log('error en la subida');
    });
  }


}
