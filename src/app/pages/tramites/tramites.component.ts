import { Component, OnInit } from '@angular/core';
import { TramiteService } from '../../servicios/tramite/tramite.service';
import { Tramite } from 'src/app/modelos/tramite.model';
import { ModaluploadService } from 'src/app/servicios/servicios.index';

@Component({
  selector: 'app-tramites',
  templateUrl: './tramites.component.html',
  styleUrls: ['./tramites.component.css']
})
export class TramitesComponent implements OnInit {

  cargando = true;
  totalRegistros = 0;
  tramites: Tramite[] = [];
  desde: number = 0;

  constructor(public traSrv: TramiteService, public modalservice: ModaluploadService) { }

  ngOnInit() {
    this.cargarTramites();
    // Me quiero suscribir a cualquier emision del modal
    this.modalservice.notificacion.subscribe((resp) => {
      this.cargarTramites();
    });
  }



  buscarTramite(termino: string){


    if (termino.length > 1) {
      this.cargando = true;
      this.traSrv.buscarTramites(termino).subscribe((resp: any) => {
        this.tramites = resp.datos;
        this.cargando = false;
      });
      return;
    }

    this.cargarTramites();

    this.cargando = false;
  }

  altaTramite(){

  }

  cargarTramites(){

    this.cargando = true;
    this.traSrv.cargarTramites(this.desde).subscribe((resp: any) => {
      
     
      this.totalRegistros = resp.total;
      this.tramites = resp.tramites;
      
      this.cargando = false;
    });

  }

  cambiarDesde(valor: number) {
    //console.log("me llega el valor del boton", valor);
    let desde = this.desde + valor;
    //console.log("ahora desde local vale", desde);

    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;

    this.cargarTramites();
  }


  editarTramite(tramite: Tramite){
    
  }

  

}
