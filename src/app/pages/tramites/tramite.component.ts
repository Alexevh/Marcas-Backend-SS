import { Component, OnInit } from '@angular/core';
import { Tramite } from '../../modelos/tramite.model';
import { ModaluploadComponent } from '../../componentes/modalupload/modalupload.component';
import { ModaluploadService } from '../../componentes/modalupload/modalupload.service';
import { NgForm } from '@angular/forms';
import { TramiteService } from '../../servicios/tramite/tramite.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from 'src/app/modelos/persona.model';
import Swal from 'sweetalert2';
import { Documento } from '../../modelos/documento.model';
import { URL_SERVICIOS } from '../../config/config';
import { PersonaService } from '../../servicios/persona/persona.service';

@Component({
  selector: 'app-tramite',
  templateUrl: './tramite.component.html',
  styleUrls: ['./tramite.component.css']
})
export class TramiteComponent implements OnInit {


 tramite: Tramite = new Tramite('', '', new Date(), '', '', new Persona('','','',''),'','',[]);
 id: string = '';
 nombreDocumento = '';

  constructor(public modalservice: ModaluploadService,
     public traSrv: TramiteService, public activated: ActivatedRoute, public router: Router, public personasrv: PersonaService) { 

        /* Voy a escuchar lo que pasen por parametros para cargar el ID del tramite*/
        activated.params.subscribe( parametros => {
          
          /* se que es id por que en pages.routes le puse /:id si tuviera otro nombre el parametro seria ese */
          let id = parametros['id'];
          if ( id!=='nuevo'){

            this.cargarTramite(id);
            this.id = id;

          }

        });

  }

  ngOnInit() {
     // Me quiero suscribir a cualquier emision del modal
     this.modalservice.notificacion.subscribe((resp) => {
       this.cargarTramite(this.id);
      
    });
  }


  cargarTramite(id: string){
    console.log('me llega el id', id);

    this.traSrv.buscarTramiteID(id).subscribe( (resp:any)=> {
      

      this.tramite = resp.tramite;

    });

  }

  borrarDocumento(documento: Documento){

        //voy apreguntar si esta seguro
        Swal.fire({
          title: "estas seguro de eliminar el documento " + documento.nombre + "?",
          text: "No se puede deshacer!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, borrar!",
        }).then((result) => {
          if (result.value) {
            this.traSrv.borrarDocumento(documento).subscribe((resp: any) => {
              Swal.fire(
                "Se elimino! ",
                "El documento ha sido borrado",
                "success"
              );
            });
    
            this.cargarTramite(this.id);
          } else {
            console.log("no se borro");
          }
        });

       

  }

  /*  este metodo esta mal, tengo que fozrar uan descarga desde el servicio**/
  descargarDocumento(doc: Documento){

    let url = URL_SERVICIOS+'/documentos/tramites/'+doc.fichero;
    console.log('voy a navegar a la url', url)
    window.open(url, '_blank');

  }


  guardarTramite(f: NgForm){

    this.traSrv.actualizarTramite(this.tramite).subscribe((resp)=>{
      this.personasrv.actualizarPersona(this.tramite.persona).subscribe((resp)=> {
        
          Swal.fire({
            title: "Exito!",
            text: "El tramite fue guardado correctamente",
            icon: "success",
            confirmButtonText: "OK",
          });
          
      })
    });
  
  }

  mostrarModal(id: string, campo: string) {
    this.modalservice.mostrarModal("personas", id, campo);
   // console.log('el campo es ',campo);
  }

  mostrarModalDocumentos(id: string, campo: string) {

    Swal.fire({
      title: 'Nuevo documento',
      text: 'Ingrese el nombre del documento',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Guardar',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading()
    }).then((valor:any) => {

      if ( !valor.value) {
        return;
      }

      this.nombreDocumento = valor.value;
      this.modalservice.mostrarModal("tramites", id, this.nombreDocumento);
      console.log('el campo es ',this.nombreDocumento);
      this.nombreDocumento = '';
      this.cargarTramite(this.id);

 
     
    });

   
  }

}



