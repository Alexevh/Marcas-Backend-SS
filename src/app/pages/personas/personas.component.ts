import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../servicios/persona/persona.service';
import { ModaluploadService } from 'src/app/componentes/modalupload/modalupload.service';
import { Persona } from 'src/app/modelos/persona.model';
import Swal from "sweetalert2";

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {
  personas: Persona[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando = false;

  constructor(
    public personasrv: PersonaService,
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
    this.personasrv.cargarPersonas(this.desde).subscribe((resp: any) => {
      
      this.totalRegistros = resp.cantidad;
      this.personas = resp.personas;
      
      this.cargando = false;
    });
  }


  mostrarModal(id: string, campo: string) {
    this.modalservice.mostrarModal("personas", id, campo);
    console.log('el campo es ',campo);
  }


  guardarPersona(persona: Persona){

    this.personasrv.actualizarPersona(persona).subscribe(
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

  borrarPersona(persona: Persona) {
  

    //voy apreguntar si esta seguro
    Swal.fire({
      title: "estas seguro de eliminar a " + persona.nombre + "?",
      text: "No se puede deshacer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar!",
    }).then((result) => {
      if (result.value) {
        this.personasrv.borrarPersona(persona).subscribe((resp: any) => {
          Swal.fire(
            "Se elimino! ",
            "El usuario" + resp.persona.nombre + " ha sido borrado.",
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
      this.personasrv.buscarPersonas(termino).subscribe((resp: any) => {
        this.personas = resp.datos;
        this.cargando = false;
      });
      return;
    }

    this.cargarPersonas();

    this.cargando = false;

  }

}
