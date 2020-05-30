import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor( public usrservice: UsuarioService, public router: Router){

  }


  canActivate()
  {

    if (this.usrservice.estaLogeado()){
      console.log('navegacion acepptada');
      return true;

    } else {
      console.log('paso por el guard y fue rechazado');
      this.router.navigate(['/login']);
      return false;
    }
    
  }
  
}
