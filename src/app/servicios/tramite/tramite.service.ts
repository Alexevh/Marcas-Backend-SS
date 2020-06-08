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


  /* En este servicio no aplico el token en las peticiones por que estoy usando un interceptor de app.module que hice y que
  automaticamente le agrega el token a todas las peticiones HTTP*/
  constructor(public http: HttpClient, public usrsrv: UsuarioService) { 

    this.token = localStorage.getItem('token');
    console.log('obtengo el token', this.token)
  }


  cargarTramites(desde: number){
  
    let url = URL_SERVICIOS + '/tramite?desde=' + desde;

    var reqHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "x-token": this.token,
    });
   
    console.log('me llega la url', url)
    
    return this.http.get(url, {headers: reqHeaders});

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
    
    return this.http.get(url, {headers: reqHeaders});

  }

  borrarDocumento(documento: Documento){

    let url = URL_SERVICIOS + "/documentos/tramites/"+documento._id;

    var reqHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "x-token": this.token,
    });
  
    return this.http.delete(url, {headers: reqHeaders});

  }

  obtenerDocumento(id: string){



  }


  actualizarTramite(tramite: Tramite){

    let url = URL_SERVICIOS + "/tramite/"+tramite._id;
  
    var reqHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "x-token": this.token,
    });

    return this.http.put(url, tramite , {headers: reqHeaders} );

  }

  




}
