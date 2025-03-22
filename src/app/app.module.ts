import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { PruebaComponent } from './pages/prueba/prueba.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { AuthInterceptor } from './core/services/auth.interceptor';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { registerLocaleData } from '@angular/common';
import localePE from '@angular/common/locales/es-PE'; // Importar la localidad de Perú

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

const config: SocketIoConfig = {
  //url: "https://rigorous-chill-jingle.glitch.me/" , options: {}
  //url: "https://positive-hissing-tapir.glitch.me/" , options: {}


  //url: "https://f5ab-2800-200-f8a0-467-d818-9b2b-5aa0-bb6d.ngrok-free.app" , options: {}

 //url: "http://localhost:5000" , options: {}
 //url: "https://elastic-jumpy-passbook.glitch.me/" , options: {}
 url: "https://socket-1-8xy5.onrender.com" , options: {}


};

@NgModule({
  declarations:
    [
        AppComponent,
        PruebaComponent,
        NotFoundComponent,
        WelcomeComponent,
    ],
    bootstrap:
    [AppComponent],
    imports:
    [
      BrowserModule,
      AppRoutingModule,
      /**
       * TODO: PARA USAR DOBLE BINDIG / USO DE FORMULARIOS
       */
      FormsModule,
      //* socket
      SocketIoModule.forRoot(config)], providers: [
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
      provideHttpClient(withInterceptorsFromDi()),
      provideAnimationsAsync(),
      //{ provide: LOCALE_ID, useValue: 'es-PE' }

    ],


    schemas: [CUSTOM_ELEMENTS_SCHEMA]
    //Web Components como <df-messenger> son elementos HTML personalizados, que Angular no reconoce de manera predeterminada. Al agregar CUSTOM_ELEMENTS_SCHEMA, le dices a Angular que permita estos elementos personalizados sin que se marque un error.

  })
export class AppModule { }
