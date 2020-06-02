import { Component, OnInit } from "@angular/core";
import { Usuario } from "src/app/modelos/usuario.model";
import { UsuarioService } from "../../servicios/usuario/usuario.service";
import Swal from "sweetalert2";
import { ModaluploadService } from "../../componentes/modalupload/modalupload.service";

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styleUrls: ["./usuarios.component.css"],
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando = false;

  constructor(
    public uservice: UsuarioService,
    public modalservice: ModaluploadService
  ) {}

  ngOnInit() {
    this.cargarUsuarios();
    // Me quiero suscribir a cualquier emision del modal
    this.modalservice.notificacion.subscribe((resp) => {
      this.cargarUsuarios();
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

    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargando = true;
    this.uservice.cargarUsuarios(this.desde).subscribe((resp: any) => {
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
      // console.log(resp);
      this.cargando = false;
    });
  }

  buscarUsuario(termino: string) {
    if (termino.length > 1) {
      this.cargando = true;
      this.uservice.buscarUsuarios(termino).subscribe((resp: any) => {
        this.usuarios = resp.datos;
        this.cargando = false;
      });
      return;
    }

    this.cargarUsuarios();

    this.cargando = false;
  }

  borrarUsuario(usuario: Usuario) {
    //No permito borrase a si mismo
    if (usuario._id === this.uservice.usuario._id) {
      Swal.fire({
        title: "Error!",
        text: "No se puede eliminar a si mismo",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

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
        this.uservice.borrarUsuario(usuario).subscribe((resp: any) => {
          Swal.fire(
            "Se elimino! ",
            "El usuario" + resp.usuario.nombre + " ha sido borrado.",
            "success"
          );
        });

        this.cargarUsuarios();
      } else {
        console.log("no se borro");
      }
    });
  }

  guardarUsuario(usuario) {
    this.uservice.actualizarUsuario(usuario).subscribe(
      (usuario) => {
        Swal.fire({
          title: "Exito!",
          text: "Usuario actualizado",
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

  mostrarModal(id: string) {
    this.modalservice.mostrarModal("usuarios", id, "foto");
  }
}
