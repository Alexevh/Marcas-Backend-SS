import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class DirectorGuard implements CanActivate {

 constructor(public uservice: UsuarioService, public router: Router){

 }

  canActivate() {

    if (this.uservice.usuario.rol === 'r-director'){

    return true;

    } else {
      console.log('Bloquedo por seguridad');
      this.router.navigate(['/login']);
      return false;
    }

  }
  
}
