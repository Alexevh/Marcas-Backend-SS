import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../servicios/persona/persona.service';
import { ModaluploadService } from 'src/app/componentes/modalupload/modalupload.service';
import { Persona } from 'src/app/modelos/persona.model';
import Swal from "sweetalert2";
import { Usuario } from '../../modelos/usuario.model';
import { UsuarioService } from '../../servicios/usuario/usuario.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})


/* En la plantilla original Persona es un concepto diferente a Usuarios, pero en este sistema son la misma cosa */

export class PersonasComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando = false;

  constructor(
    public usrSrv: UsuarioService,
    public modalservice: ModaluploadService
  ) { }

  ngOnInit() {
    this.cargarPersonas();
    // Me quiero suscribir a cualquier emision del modal
    this.modalservice.notificacion.subscribe((resp) => {
      this.cargarPersonas();
    });
  }

  cambiarDesde(valor: number) {
    console.log("me llega el valor del boton", valor);
    let desde = this.desde + valor;
    console.log("ahora desde local vale", desde);

    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;

    this.cargarPersonas();
  }

  cargarPersonas() {
    this.cargando = true;
    this.usrSrv.cargarUsuarios(this.desde).subscribe((resp: any) => {
      
      this.totalRegistros = resp.cantidad;
      this.usuarios = resp.usuarios;
      
      this.cargando = false;
    });
  }


  mostrarModal(id: string, campo: string) {
    this.modalservice.mostrarModal("personas", id, campo);
    console.log('el campo es ',campo);
  }


  guardarPersona(usuario: Usuario){

    this.usrSrv.actualizarUsuario(usuario).subscribe(
      (usuario) => {
        Swal.fire({
          title: "Exito!",
          text: "Persona actualizada",
          icon: "success",
          confirmButtonText: "OK",
        });
      },
      (error) => {
        console.log(error);
        Swal.fire({
          title: "ERROR!",
          text: error.error.mensaje,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    );

  }

  borrarPersona(usuario: Usuario) {
  

    //voy apreguntar si esta seguro
    Swal.fire({
      title: "estas seguro de eliminar a " + usuario.nombre + "?",
      text: "No se puede deshacer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar!",
    }).then((result) => {
      if (result.value) {
        this.usrSrv.borrarUsuario(usuario).subscribe((resp: any) => {
          Swal.fire(
            "Se elimino! ",
            "El usuario" + resp.usuario.nombre + " ha sido borrado.",
            "success"
          );
        });

        this.cargarPersonas();
      } else {
        console.log("no se borro");
      }
    });
  }

  buscarPersona(termino: string){

    if (termino.length > 1) {
      this.cargando = true;
      this.usrSrv.buscarUsuarios(termino).subscribe((resp: any) => {
        this.usuarios = resp.datos;
        this.cargando = false;
      });
      return;
    }

    this.cargarPersonas();

    this.cargando = false;

  }

}
