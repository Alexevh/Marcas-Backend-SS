import { Injectable } from '@angular/core';
import { Marca } from 'src/app/modelos/marcas.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class MarcasService {

  marcas: Marca[] =[];
  marcaActual: Marca;
  token: string;

  constructor(public http: HttpClient) { 

    this.token = localStorage.getItem('token');
    console.log('obtengo el token', this.token)
  }

  cargarMarcas(desde: number){
  
    let url = URL_SERVICIOS + '/marcas/admin?desde=' + desde;

    var reqHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "x-token": this.token,
    });
   
    console.log('me llega la url', url)
    
    return this.http.get(url, {headers: reqHeaders});

  }


  buscarMarcas(termino: string){
    let url = URL_SERVICIOS + "/busqueda/coleccion/marcas/" + termino;
   
    var reqHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "x-token": this.token,
    });
   
    
    return this.http.get(url, { headers: reqHeaders });
  }


}
