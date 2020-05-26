import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

/* El breadcrumbs se carga siempre, en todas las paginas */
@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

titulo: string;

  constructor(private router: Router, private title: Title, private meta: Meta) { 

    this.obtenerDatosRuta().subscribe(datos => {
    this.titulo = datos.titulo;
    /* Esta es una clase Angular que modifica el title de la web */
    this.title.setTitle(this.titulo);

    /* Voy a agegragr los metadatos, son opcionales, lo dejo como ejemplo por si lo
    necesito en otro momento */
    const metadatos: MetaDefinition = {
      name: 'description',
      content: this.titulo
    };

    this.meta.updateTag(metadatos);

    });

  }

  ngOnInit() { 
  }

  /* Regreso el observable pasados por los filtros y mapeo de datos */
  obtenerDatosRuta(){
    /* el router tiene un observavle events  al que nos podemos susrcirbir */
     return this.router.events.pipe(
      /* lo paso por un filtro, si el evento es un activationend me interesa para saber que pagina estoy */
      filter( evento => evento instanceof ActivationEnd),
      /* ahora que se que es un activationend voy a ver si de los dos que hay es el que me interesa */
      filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null),
      /* AHora que tengo el objeto con el dato lo paso por el operador map para obtener el titulo */
      map( (evento: ActivationEnd) => evento.snapshot.data)
    )
  }

}
