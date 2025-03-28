import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false; //

  constructor(
   private socket:Socket
  ) {
    this.checkStatus(); //
  }

  checkStatus() {
    //
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus = false;
    });
  }

  emit( evento: string, payload?: any, callback?: Function ) {
    console.log('Emitiendo', evento);
    this.socket.emit( evento, payload, callback );
  }

  listen( evento: string ) {//recibe un evento
    return this.socket.fromEvent( evento ); //regresa un observable, acá no se le escucha, sólo
    //se est´s definiendo
  }
}


