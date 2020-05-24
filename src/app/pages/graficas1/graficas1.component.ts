import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styles: []
})
export class Graficas1Component implements OnInit {


  /* Esta variable seria llenada con los datos que trajeramos de algun servicio de Residencias */

  graficos: any = {
    'Residencias': {
      'labels': ['Residencias', 'Renovacion'],
      'data':  [24, 30],
      'type': 'doughnut',
      'leyenda': 'Tipos de tramites 2020'
    },
    'Sexo': {
      'labels': ['Hombres', 'Mujeres'],
      'data':  [4500, 6000],
      'type': 'doughnut',
      'leyenda': 'Tramites por sexo'
    },
    'Paises': {
      'labels': ['Venezuela', 'Argentina', 'Cuba', 'Chile', 'Bolivia'],
      'data':  [95, 50, 23, 12, 23 ],
      'type': 'doughnut',
      'leyenda': 'Top 5 paises emigrantes'
    },
    'Edades': {
      'labels': ['Mayores', 'Menores'],
      'data':  [85, 15],
      'type': 'pie',
      'leyenda': 'Mayores y menores'
    },
  };
  

  constructor() { }

  ngOnInit() {
  }





}
