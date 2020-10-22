import { Component, OnInit } from '@angular/core';
import { MarcasService, ModaluploadService } from 'src/app/servicios/servicios.index';
import { Marca } from '../../modelos/marcas.model';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css']
})
export class MarcasComponent implements OnInit {


  cargando = true;
  totalRegistros = 0;
  marcas: Marca[] = [];
  desde: number = 0;

  constructor(public marcasrv: MarcasService, public modalservice: ModaluploadService) { }

  ngOnInit() {
    this.cargarMarcas();
    // Me quiero suscribir a cualquier emision del modal
    this.modalservice.notificacion.subscribe((resp) => {
      this.cargarMarcas();
    });
  }

  cargarMarcas(){

    this.cargando = true;
    this.marcasrv.cargarMarcas(this.desde).subscribe((resp: any) => {
      
     
      this.totalRegistros = resp.total || 0;
      this.marcas = resp.marcas;
      
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
    this.cargarMarcas();
  }

  
  buscarMarca(termino: string){


    if (termino.length > 1) {
      this.cargando = true;
      this.marcasrv.buscarMarcas(termino).subscribe((resp: any) => {
        this.marcas = resp.datos;
        this.cargando = false;
      });
      return;
    }

    this.cargarMarcas();

    this.cargando = false;
  }
  



}
