import { Component, OnInit } from '@angular/core';
import { Form, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Persona } from 'src/app/modelos/persona.model';
import { PersonaService } from 'src/app/servicios/persona/persona.service';
import { ModaluploadService } from 'src/app/componentes/modalupload/modalupload.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-altapersonas',
  templateUrl: './altapersonas.component.html',
  styleUrls: ['./altapersonas.component.css']
})
export class AltapersonasComponent implements OnInit {

  cargando = false;
  nombre:  string;
  nacionalidad: string;
  tipodDoc: string;
  numerodoc: string;


  
  constructor(public personasrv: PersonaService,
    public modalservice: ModaluploadService, public router: Router,) { }

  ngOnInit() {
      // Me quiero suscribir a cualquier emision del modal
      this.modalservice.notificacion.subscribe((resp) => {
       
      });

  }


  onSubmit(f: NgForm){

    let  personaDB = new Persona(f.value.nombre, f.value.nacionalidad, f.value.tipoDocumento , f.value.documentoNumero );
    this.personasrv.altaPersona(personaDB).subscribe( (resp:any)=>{
     // console.log('dar de alta la persona me dio', resp);
      this.router.navigate(['/personas']);
    });
  }

}
