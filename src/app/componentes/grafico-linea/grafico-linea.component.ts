import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-grafico-linea',
  templateUrl: './grafico-linea.component.html',
  styleUrls: ['./grafico-linea.component.css']
})
export class GraficoLineaComponent implements OnInit {


  @Input() public EtiquetasLinea: Label[] =
    ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  @Input() public DatosLinea: ChartDataSets[] = [{ data: [65, 59, 80, 81, 56, 55, 40], label: 'Residencias' },
  { data: [54, 51, 90, 81, 56, 35, 40], label: 'Renovaciones' }];
  @Input() public tipoGraficaLinea: ChartType = 'line';


  public lineChartLegend = true;
  public lineChartType = 'line';

  constructor() { }

  ngOnInit() {

    /** voy a simular datos dinamicos */
    setInterval(() => {

      const datos = [{ data: 
        [Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100)],
        label: 'Residencias'
      },
      { data: 
        [Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100)],
        label: 'Renovaciones'
      },
      ];

     this.DatosLinea = datos;
    

    }, 10000);

  }

}
