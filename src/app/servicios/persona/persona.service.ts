import { Injectable } from '@angular/core';
import { Persona } from 'src/app/modelos/persona.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Usuario } from '../../modelos/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {


  personas: Persona[] = [];
  personaActual: Persona;
  token: string;
  reqHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-token': this.token,
  });

  constructor(public http: HttpClient, public usrsrv: UsuarioService) {

    this.token = localStorage.getItem('token');
   }


  cargarPersonas(desde: number){
    
    let url = URL_SERVICIOS + '/persona?desde=' + desde;
    

    var reqHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-token': this.token,
    });
    return this.http.get(url, { headers: reqHeaders });

  }

  buscarPersonaporID(id: string){
    let url = URL_SERVICIOS + '/persona/'+id;
    
    return this.http.get(url, { headers: this.reqHeaders });

   
  }

  borrarPersona(usuario: Usuario){
    var reqHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "x-token": this.token,
    });
    

    let url = URL_SERVICIOS+"/persona/"+usuario._id;
    return this.http.delete(url, { headers: reqHeaders });
  
   }

   buscarPersonas(termino: string){
    let url = URL_SERVICIOS + "/busqueda/coleccion/personas/" + termino;
   
    var reqHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "x-token": this.token,
    });
    
    return this.http.get(url, { headers: reqHeaders });
  }


  actualizarPersona(persona: Persona) {
    let url = URL_SERVICIOS + "/persona/" + persona._id;

    var reqHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "x-token": this.token,
    });

    return this.http.put(url, persona, { headers: reqHeaders });
      
    
  }


  altaPersona(persona: Persona) {
    let url = URL_SERVICIOS + "/persona/";

    var reqHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "x-token": this.token,
    });
    console.log('la ulr es ', url);
    console.log('la persona  es ', persona)
    return this.http.post(url, persona, { headers: reqHeaders });
      
   
  }





}
