import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private pedidoFinalizadoSubject = new Subject<any>();

  pedidoFinalizado$ = this.pedidoFinalizadoSubject.asObservable();

  emitirPedidoFinalizado(payload: any) {
    this.pedidoFinalizadoSubject.next(payload);
  }
}
