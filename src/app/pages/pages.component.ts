import { Component, OnInit } from '@angular/core';

/* Como en lugar de hacer un SPA estamos usando un template diferente para la APP que para el login, las paginas en si mismas vas
a ser controladas por su propio componente */


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
