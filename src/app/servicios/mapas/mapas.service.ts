import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UsuarioService } from '../servicios.index';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class MapasService {

  token: string;
  reqHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-token': this.token,
  });


  constructor(public http: HttpClient) {

    this.token = localStorage.getItem('token');
   }

   cargarMarcadoresIniciales(){
    let url = URL_SERVICIOS + '/mapas';
    
    var reqHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-token': this.token,
    });
    return this.http.get(url, { headers: reqHeaders });
   }


}
