
import { ServicioDePedidosFinalizadosService } from 'src/app/private/shared/services/servicio-de-pedidos-finalizados.service';

import { Component, effect } from '@angular/core';
import { EnTiendaService } from 'src/app/private/modulo-pedido-venta/service/en-tienda.service';


@Component({
  selector: 'app-template-header',
  templateUrl: './template-header.component.html',
  styleUrls: ['./template-header.component.scss'],
})
export class TemplateHeaderComponent {

deliveryBackLength = this._servicioDePedidosFinalizadosService.getDeliveryBackLength();
  pickUpBackLength = this._servicioDePedidosFinalizadosService.getPickupBackLength();
  enTiendaBackLength = this._servicioDePedidosFinalizadosService.getEnTiendaBackLength();


  constructor(
    private _servicioDePedidosFinalizadosService: ServicioDePedidosFinalizadosService,
    private _entiendaService: EnTiendaService
  ) {
    // Suscripción al servicio para obtener los datos
    this._entiendaService.getAllFinalizado().subscribe({
      next: (data) => {
        // Actualizamos el Signal con el nuevo valor
        this.enTiendaBackLength.set(data.length);
      },
      error: (err) => {
        console.error('Error al obtener datos de enTiendaFinalizada', err);
      }
    });
  }
}
