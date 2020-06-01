import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Usuario } from "../../modelos/usuario.model";
import { URL_SERVICIOS } from "../../config/config";
import { filter, map } from "rxjs/operators";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { HttpHeaders } from '@angular/common/http';
import { SubirArchivoService } from '../archivos/subir-archivo.service';

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  usuario: Usuario;
  token: string;

  constructor(public http: HttpClient, public router: Router, public subir: SubirArchivoService ){
    this.cargarStorage();
  }

  login(usuario: Usuario, recuerdame: boolean) {
    if (recuerdame) {
      localStorage.setItem("uid", usuario.uid);
    } else {
      localStorage.removeItem("uid");
    }

    let url = URL_SERVICIOS + "/login";
    /* llamo al post, podria mandar los parametros aparte pero como en usuario tengo todo no es requerido */
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.token, resp.usuario);

        return true;
      })
    );
  }

  guardarStorage(token: string, usuario: Usuario) {
    //localStorage.setItem('id', id);
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  cargarStorage() {
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
    } else {
      this.token = null;
      this.usuario = null;
    }
  }

  estaLogeado() {
    if (this.token) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.usuario = null;
    this.token = null;
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");

    this.router.navigate(["/login"]);
  }

  actualizarUsuario(usuario: Usuario, ) {
    let url = URL_SERVICIOS + "/usuario/" + usuario._id;


    var  reqHeaders  = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-token': this.token
    })

    /* Ahora le mando el token 
     el baclend acepta tanto que le manden el token por URL como por headers, a mi me gusta enviarlopor headers 
     pero si lo fuera a enviar por url seria  //url += "?token=" + this.token; y en el put le quito los headers
    */
    return this.http.put(url, usuario, {headers: reqHeaders}).pipe(
      map((resp: any) => {
        //si el usuario s esta actualziando a si mismo lo guardo en el storage
        if (usuario._id === this.usuario._id) {
          this.usuario = resp.usuario;
          this.guardarStorage(this.token, usuario);
        }

        //return true;
      })
    );
  }


  cambiarImagen(archivo: File, id: string) {
    this.subir
      .subirArchivo(archivo, "usuarios", id, 'foto', this.token)
      .then((resp: any) => {
        console.log(resp)
        this.usuario.foto = resp.foto;
        this.actualizarUsuario(this.usuario);
        Swal.fire("Exito!", "Se cambio la imagen correctamente", "success");
        this.guardarStorage(this.token, this.usuario);
      })
      .catch((err) => {
        console.log(err);
      });
  }
   

}
