import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';


@Injectable({
  providedIn: 'root'
})


/* Este servicio va a interceptar las peticiones get, post , put y delete para agregarles el token del usuario 
ya que todo va a ir con token en el servicio */
export class TokenService  implements HttpInterceptor{

  token = '';

  constructor() { 

    this.token = localStorage.getItem('token') ;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const headers = new HttpHeaders({
      'x-token': this.token,
    });

    const reqClone = req.clone({
      headers
    });



    return next.handle( reqClone ).pipe(
      catchError( this.manejarError )
    );


  }


  manejarError( error: HttpErrorResponse ) {
    console.log('Sucedió un error');
    console.log('Registrado en el log file');
    console.warn(error);
    return throwError('Error personalizado');
  }
}
