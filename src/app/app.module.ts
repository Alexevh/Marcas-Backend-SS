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
    ServicioModule
    
   

  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
