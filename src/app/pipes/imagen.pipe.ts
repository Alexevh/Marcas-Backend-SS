import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(imagen: string, tipo:string='usuario'): any {
    
    let url = URL_SERVICIOS+'/documentos'
    let token = localStorage.getItem('token');

    //console.log('me lleg de  imagen ', imagen);
    //console.log('me lleg de  tipo ', tipo);

    //si no viene una imagen tiro cualquier sarasa y el backend devuelve una foto por defecto
    if (!imagen){
      url+='/usuarios/xxx'+'?token='+token;
      return url;
    }

    //Si la imagen es de google es una url https
    if (imagen.indexOf('https')>=0){
      return imagen;
    }

    switch(tipo){

      case 'usuario':
         url+='/usuarios/'+imagen+'?token='+token;
      break;

      case 'persona':
           url+='/personas/'+imagen+'?token='+token;
      break;
      case 'documentos':
           url+='/tramites/'+imagen+'?token='+token;
      break;
      default:

           url+='/usuarios/xxx'+'?token='+token

      break;
    }

  
    return url;

 
  }

}
