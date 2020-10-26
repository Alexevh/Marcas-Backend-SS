import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Usuario } from "../../modelos/usuario.model";
import { URL_SERVICIOS } from "../../config/config";
import { filter, map, catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { HttpHeaders } from "@angular/common/http";
import { SubirArchivoService } from "../archivos/subir-archivo.service";
import { WebsocketService } from '../websocket/websocket.service';

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  usuario: Usuario;
  token: string;
  menu: any =[];

  constructor(
    public http: HttpClient,
    public router: Router,
    public subir: SubirArchivoService,
    public wsService: WebsocketService
  ) {
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
        console.log('me trajo de usuario', resp);
        this.guardarStorage(resp.token, resp.usuario, resp.menu);

        /* voy a suscribirme a los cambios de conexion */
        this.wsService.reconexion.subscribe((data)=> {
          
          console.log('El server se reconecto, me vouelvo a registrar');
          /* voy a escoger registrarme aca en el websocketservice pero podria hacerlo en otra parte */
          this.wsService.loginWS(this.usuario.nombre, this.usuario.foto, this.usuario.rol);

        });

        return true;
      })
    );
  }

  guardarStorage(token: string, usuario: Usuario, menu: any) {
    //localStorage.setItem('id', id);
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    localStorage.setItem("menu", JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;

    /* voy a escoger registrarme aca en el websocketservice pero podria hacerlo en otra parte */
    this.cargarStorage();
    //this.wsService.loginWS(this.usuario.nombre, this.usuario.foto, this.usuario.mision);

  }

  cargarStorage() {
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
      this.menu = JSON.parse(localStorage.getItem("menu"));

    } else {
      this.token = null;
      this.usuario = null;
      this.menu  = [];
    }
  }

  estaLogeado() {
    if (this.token) {
      return true;
    } else {
      return false;
    }
  }

  renovarToken(){
    let url = URL_SERVICIOS + "/login/renovartoken/";

    var reqHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "x-token": this.token,
    });

    return this.http.get(url, { headers: reqHeaders }).subscribe( (resp:any) =>{
      this.token = resp.token;
      localStorage.setItem('token', this.token);
    }, (err)=> {
      /* si no pude renovar el otken lo mando al login rompiendo todo */
      Swal.fire("Error!", "No fue posible renovar las credenciales, sera redirijido al login", "error");
      this.logout();
    });

  }

  logout() {
    this.wsService.emit('mensaje', `el usuario ${this.usuario.nombre} ha abandonado el sistema`);
    this.wsService.emit('dissconect', `el usuario ${this.usuario.nombre} ha abandonado el sistema`);
    this.usuario = null;
    this.token = null;
    this.menu=[];
   
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    localStorage.removeItem("menu");
    this.wsService.logoutWS();

    this.router.navigate(["/login"]);
 
  }

  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + "/user/" + usuario._id;

    var reqHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "x-token": this.token,
    });

    /* Ahora le mando el token 
     el baclend acepta tanto que le manden el token por URL como por headers, a mi me gusta enviarlopor headers 
     pero si lo fuera a enviar por url seria  //url += "?token=" + this.token; y en el put le quito los headers
    */
   
    return this.http.put(url, usuario, { headers: reqHeaders }).pipe(
      map((resp: any) => {
        //si el usuario s esta actualziando a si mismo lo guardo en el storage
        if (usuario._id === this.usuario._id) {
          this.usuario = resp.usuario;
          this.guardarStorage(this.token, usuario, resp.menu);
          return true;
        }
      }),
      
    )
  }

  cambiarImagen(archivo: File, id: string) {
    this.subir
      .subirArchivo(archivo, "usuarios", id, "foto", this.token)
      .then((resp: any) => {
        console.log(resp);
        this.usuario.foto = resp.foto;
        this.actualizarUsuario(this.usuario);
        Swal.fire("Exito!", "Se cambio la imagen correctamente", "success");
        this.guardarStorage(this.token, this.usuario, resp.menu);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  cargarUsuarios(desde) {
    let url = URL_SERVICIOS + "/user/todos?desde=" + desde;
    var reqHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "x-token": this.token,
    });
    console.log("me llega desde ", desde);
    return this.http.get(url, { headers: reqHeaders });
  }


  buscarUsuarios(termino: string){
    let url = URL_SERVICIOS + "/busqueda/coleccion/usuarios/" + termino;
   
    var reqHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "x-token": this.token,
    });
    
    return this.http.get(url, { headers: reqHeaders });
  }


  borrarUsuario(usuario: Usuario){
    var reqHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "x-token": this.token,
    });
    

    let url = URL_SERVICIOS+"/usuario/"+usuario._id;
    return this.http.delete(url, { headers: reqHeaders });
  
   }
}
