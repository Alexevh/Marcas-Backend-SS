import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class VerificatokenGuard implements CanActivate {


  constructor( public usrsrv: UsuarioService){

  }

  canActivate(): Promise<boolean> | boolean {

    let token = this.usrsrv.token;
    /* obtengo el payload del token */
    let payload = JSON.parse(atob(token.split('.') [1]));

    let vencido = this.expirado(payload.exp);

    if (vencido){
      this.usrsrv.logout();
      return false;
    }


  
    return this.verificaRenueva(payload.exp);
  }





   /* La fecha grabada de expiracion del token esta en segundos, por eso es de tipo number */
  expirado(fechaExpiracion: number){

    let ahora = new Date().getTime() / 1000;

    if (fechaExpiracion < ahora){
      /* el token expiro */
      return true;

    } else {
      return false;
    }

  }

  /*  funcion que evrifica si el token esta por vencer y lo renueva */
  verificaRenueva(fechaeExp: number) : Promise<boolean>{

    return new Promise( (resolve, reject )=>{

      /* la fecha en milisegundos la transofrmo a fecha normal */
      let tokenExp = new Date(fechaeExp * 1000); 

      let ahora = new Date();

      /*  Me voy a fijar si faltan 1 hora1 o menos para que el token expire , para eso voy a comparar la fecha de caducidad
      del token con la hora actual + 1 horas, si esta a 1 horas o menos de caducar lo renuevo */
      ahora.setTime(ahora.getTime()+( 1 * 60 * 60* 1000));

      /* si es mayor a 4 horas no necesito renovar, devuelvo true */
      if ( tokenExp.getTime() >  ahora.getTime()){

        console.log(tokenExp);
        console.log(ahora);
        console.log('token sin necesidad de renovar')
        resolve(true)
      } else {
        /* renuevo el token */
          this.usrsrv.renovarToken();
          console.log('token renovado')
          resolve(true);
      }

      

    });

  }
  
}
