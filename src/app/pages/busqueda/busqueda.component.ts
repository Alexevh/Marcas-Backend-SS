import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { URL_SERVICIOS } from "src/app/config/config";
import { Tramite } from 'src/app/modelos/tramite.model';
import { Persona } from 'src/app/modelos/persona.model';

@Component({
  selector: "app-busqueda",
  templateUrl: "./busqueda.component.html",
  styleUrls: ["./busqueda.component.css"],
})
export class BusquedaComponent implements OnInit {
  token = "";
  tramites: Tramite[]=[];
  personas: Persona[] =[];

  constructor(public activated: ActivatedRoute, public http: HttpClient) {
    this.token = localStorage.getItem("token");

    this.activated.params.subscribe((parametros) => {
      let termino = parametros["termino"];
      this.buscar(termino);
    });
  }

  ngOnInit() {}

  /* normalmente esto lo haria en un servicio pero como se que se va a usar solo aca no hace falta la redundancia */
  buscar(termino: string) {
    let url = URL_SERVICIOS + "/busqueda/todo/" + termino;

    var reqHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "x-token": this.token,
    });

    /* esta llamada es diferente a las demas en el sistema ya que es aqui donde quiero trabajar
    con la informacion, por eso me suscribo a los resultados */
    this.http.get(url, { headers: reqHeaders }).subscribe((resp:any) => {
      this.tramites = resp.tramites;
      this.personas = resp.personas;
    });
  }
}
