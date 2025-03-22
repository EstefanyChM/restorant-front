import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  //private apiUrl = 'http://127.0.0.1:5001/chatbot';
  private apiUrl = 'https://ia-x07k.onrender.com/chatbot';




  constructor(
    public wsService: WebsocketService , private http: HttpClient
  ) { }

  enviarMensaje(mensaje: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { message: mensaje });
  }

    sendMessage( mensaje: string ) {
      const payload = {
        de: 'Usuario',
        cuerpo: mensaje
      };
      //
      this.wsService.emit('mensaje', payload );//

    }

    getMessages() {
      return this.wsService.listen('mensaje-nuevo'); //
    }

    sendMessageToFlask(mensaje: string) {
      //const payload = { message: mensaje };
      const payload = {
        de: 'Usuario',
        message: mensaje
      };
      // Aquí usamos el método emit de WebsocketService
      this.wsService.emit('mensaje-para-flask', payload);
    }

    // Escuchar mensajes desde Flask a través de WebSocket
    getMessagesFromFlask() {
      return this.wsService.listen('mensaje-desde-flask'); // Escuchamos el evento que Flask enviará
    }



}
