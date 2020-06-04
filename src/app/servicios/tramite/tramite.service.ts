import { Injectable } from '@angular/core';
import { Tramite } from 'src/app/modelos/tramite.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Documento } from '../../modelos/documento.model';

@Injectable({
  providedIn: 'root'
})
export class TramiteService {


  tramites: Tramite[] = [];
  tramiteActual: Tramite;
  token: string;
  reqHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-token': this.token,
  });

  constructor(public http: HttpClient, public usrsrv: UsuarioService) { 

    this.token = localStorage.getItem('token');
  }


  cargarTramites(desde: number){
  
    let url = URL_SERVICIOS + '/tramite?desde=' + desde;
    //console.log('le paso la url ', url);
    //console.log('el token es ', this.token)

    var reqHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-token': this.token,
    });
    return this.http.get(url, { headers: reqHeaders });

  }


  buscarTramites(termino: string){
    let url = URL_SERVICIOS + "/busqueda/coleccion/tramites/" + termino;
   
    var reqHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "x-token": this.token,
    });
   
    
    return this.http.get(url, { headers: reqHeaders });
  }

  buscarTramiteID(id: string){
    let url = URL_SERVICIOS + "/tramite/"+id;
    var reqHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "x-token": this.token,
    });
    return this.http.get(url, { headers: reqHeaders });

  }

  borrarDocumento(documento: Documento){

    let url = URL_SERVICIOS + "/documentos/tramites/"+documento._id;
    var reqHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "x-token": this.token,
    });
    return this.http.delete(url, { headers: reqHeaders });

  }

  obtenerDocumento(id: string){



  }


  actualizarTramite(tramite: Tramite){

    let url = URL_SERVICIOS + "/tramite/"+tramite._id;
    var reqHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "x-token": this.token,
    });
    return this.http.put(url, tramite ,{ headers: reqHeaders });

  }

  




}
