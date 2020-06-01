import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/servicios.index';
import { Usuario } from '../../modelos/usuario.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string  | ArrayBuffer;;
  constructor(public usrservice: UsuarioService) { }

  ngOnInit() {

    this.usuario = this.usrservice.usuario;
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

  cambiarImagen(){

    this.usrservice.cambiarImagen(this.imagenSubir, this.usuario._id);

  }

    /**
   * 
   * Aca podria usar varias aproximaciones, puedo recibir por ejemplo el form: ngForm , validarlo y generar un usuario y luego actualiza
   * o hacer como estoy haciendo ahora, como el formualrio me va a mandar datos con los mismos nombres de atributos que el modelo usuario tiene
   * puedo decir que el formulario me envie en lugar del form el form.value y ahi  lo recibo como un objeto suaurio al que obviamente le faltan algunos datos
   * 
   */
  enviar(usuario: Usuario){

    console.log(usuario);


    this.usuario.nombre = usuario.nombre;
    this.usuario.email = usuario.email;

    this.usrservice.actualizarUsuario(this.usuario).subscribe((resp:any)=> {
      console.log(resp);
      Swal.fire({
        title: 'Exito!',
        text:  "Se actualizo "+this.usuario.nombre+' con exito',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      return;
    
    });
  }


 
}
