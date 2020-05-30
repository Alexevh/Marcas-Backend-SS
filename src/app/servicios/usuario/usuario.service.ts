import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Usuario } from "../../modelos/usuario.model";
import { URL_SERVICIOS } from "../../config/config";
import { filter, map } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  usuario: Usuario;
  token: string;

  constructor(public http: HttpClient, public router: Router) {
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


  estaLogeado(){
    if (this.token){
      return true;
    } else {
      return false;
    }
  }

  logout(){
    
    this.usuario=  null;
    this.token=  null;
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
   
    this.router.navigate(['/login']);
      
  }
 


}
