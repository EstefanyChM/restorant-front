// src/app/shared/services/shared-pedido.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PedidoResponse } from 'src/app/private/pedido/models/pedido-response.model';

@Injectable({
  providedIn: 'root'
})
export class SharedPedidoService {
  private pedidoSubject = new BehaviorSubject<number | null>(null);
  pedido$ = this.pedidoSubject.asObservable();

  setPedido(idPedido: number): void {
    this.pedidoSubject.next(idPedido);
  }
}
