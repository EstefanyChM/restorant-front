import { effect, Injectable, signal } from '@angular/core';
import { EnTiendaService } from '../../modulo-pedido-venta/service/en-tienda.service';
import { EnTiendaResponse } from '../../modulo-pedido-venta/models/en-tienda-response.model';

@Injectable({
  providedIn: 'root'
})
export class ServicioDePedidosFinalizadosService {
  private enTiendaBackLengthSignal = signal(0); // Estado global reactivo
  private deliveryLengthSignal = signal(0); // Estado global reactivo
  private pickupLengthSignal = signal(0); // Estado global reactivo


  constructor(private _enTiendaService: EnTiendaService) {
    // actualizar el Signal al iniciar el servicio
   // this.initEnTiendaBackLength();
  }

  // Método para obtener el Signal
  getEnTiendaBackLength() {
    return this.enTiendaBackLengthSignal; // Devuelve el Signal directamente
  }
  getPickupBackLength() {
    return this.pickupLengthSignal;
  }
  getDeliveryBackLength() {
    return this.deliveryLengthSignal;
  }

/****************************** */
  // Método para actualizar el Signal
  updateEnTiendaBackLength(length: number) {
    this.enTiendaBackLengthSignal.set(length); // Actualiza el Signal
  }
  updatePickupBackBackLength(length: number) {
    this.pickupLengthSignal.set(length);
  }
  updateDeliveryBackLength(length: number) {
    this.deliveryLengthSignal.set(length);
  }
  /****************************** */
   // Inicializar o actualizar el Signal desde cualquier otra lógica de negocio
   /*private initEnTiendaBackLength() {
    // Por ejemplo, llamar al servicio que obtiene los datos
    this._enTiendaService.getAllFinalizado().subscribe({
      next: (data: EnTiendaResponse[]) => {
        this.updateEnTiendaBackLength(data.length);
      }
    });
  }*/
}
