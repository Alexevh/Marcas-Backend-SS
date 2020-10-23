import { Injectable } from "@angular/core";
import { URL_SERVICIOS } from "../../config/config";
import { UsuarioService } from "../usuario/usuario.service";
import { Usuario } from "src/app/modelos/usuario.model";

@Injectable({
  providedIn: "root",
})
export class SubirArchivoService {
  constructor() {}

  /* ANGULAR todavia no tiene una funcion para subir ficheros asi que suamos javascript puro, la fincion subir archuvo en este caso
  tiene como parametros el fichero a subir, el tipo (usuarios, tramites, personas) que esta definido en el backend que en si apunta a
  una subcarpeta donde estan los ficheros en si mismos, el id que es el objeto a que pertenece el documento que es una persona,
   un tramite o un usuario  y un campo que es donde se guarda el dato, por ejemplo, el objeto persona  tiene dos campos donde hay
   ficheros, el campo huellas y el campo foto, el objeto usuario solo tiene el campo foto*/
  subirArchivo(
    archivo: File,
    tipo: string,
    id: string,
    campo: string,
    token: string
  ) {
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      //esto es el nombre que especifique en el servicio REST, si el campo se llama img deberia ser img, etc
      formData.append("documento", archivo, archivo.name);

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log("documento subido");
            resolve(JSON.parse(xhr.response));
          } else {
            console.log("error la subida");
            reject(xhr.response);
          }
        }
      };

      let url =
        URL_SERVICIOS +
        "/uploads/" +
        tipo +
        "/" +
        id +
        "/" +
        campo +
        "?token=" +
        token;
      //ajax
      /* a mi me gusta mas pasarlo por headers pero lo habia reuelto asi antes, si lo quiero paar por headers
      lo tengo que mandar asi 
       xhr.setRequestHeader('token', this._usuarioService.token);
     
      */
     //console.log('La url para el post es ',url)
      xhr.open("PUT", url, true);
      xhr.send(formData);
    });
  }
}
