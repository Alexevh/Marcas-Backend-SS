import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
/* acrive forms, necesario para trabajar con formularios NG */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { RegistroComponent } from './registro/registro.component';

// Modulos
import { PagesModule } from './pages/pages.module';

// Rutas
import { APP_ROUTES } from './app.routes';
// import { IncrementadorComponent } from './componentes/incrementador/incrementador.component';

/* Servicios  */

import { ServicioModule } from './servicios/servicio.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

//sockets
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { URL_SERVICIOS } from './config/config';





const config: SocketIoConfig = { url: URL_SERVICIOS, options: {} };


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    

    
    
   
   
    //IncrementadorComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    FormsModule,
    ReactiveFormsModule,
    ServicioModule,
    SocketIoModule.forRoot(config)
    
   

  ],
  providers: [ 
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
