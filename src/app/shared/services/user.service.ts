import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usuarioActualizado = new Subject<string>();

  actualizarUsuario(usuRecibido: string):void {
    console.log('toca actualizar');

    this.nuevoUsuario = usuRecibido
    this.usuarioActualizado.next(this.nuevoUsuario)
    console.log('SSS', this.nuevoUsuario);
  }

  private nuevoUsuario:string = ""

   obtenerNomDeUsu(): string {
      return this.nuevoUsuario;
    }
  constructor() { }
}
