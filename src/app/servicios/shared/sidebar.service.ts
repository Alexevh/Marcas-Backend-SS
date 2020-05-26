import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})




export class SidebarService {



  /* el backend me va a dar el menu que voy a mostrar */
  menu: any = [
    {
      titulo: 'Menu General',
      icono:   'mdi mdi-gauge',
      submenu: [
        { titulo: 'Inicio', url: '/dashboard'},
        { titulo: 'Alta Residencias', url: '/alta-resi'},
        { titulo: 'Alta Renovacion', url: '/alta-ren'},
        { titulo: 'Listado Residencias', url: '/lista-resi'},
        { titulo: 'Listado Renovaciones', url: '/lista-ren'},
      ]
    }, 
    {
      titulo: 'Menu Director',
      icono:   'mdi mdi-gauge',
      submenu: [
     
        { titulo: 'Firmar Resoluciones', url: '/alta-/firma-resoluciones'},
        { titulo: 'Firmar Vouchers', url: '/firma-vouchers'},
        { titulo: 'Estadisticas', url: '/graficas1'},
       
      ]
    }
  ];



  constructor() { }
}
