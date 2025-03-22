import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-venta-tipo-pago',
  templateUrl: './venta-tipo-pago.component.html',
  styleUrls: ['./venta-tipo-pago.component.scss']
})
export class VentaTipoPagoComponent {
  @Input() montoAPagar: number = 0;
  @Output() metodoPago = new EventEmitter<number>();
  @Output() pagoExitoso = new EventEmitter<boolean>(); // New Output event

  montoRecibido: number = 0;
  vuelto: number = 0;

  calcularVuelto() {
    if (this.montoRecibido >= this.montoAPagar) {
      this.vuelto = this.montoRecibido - this.montoAPagar;
      this.pagoExitoso.emit(true); // Emit event to notify parent of successful payment
    } else {
      alert('El monto recibido es insuficiente para el pago');
    }
  }

  seleccionarPagoCash() {
    this.metodoPago.emit(1);
  }

  botonPagarHabilitado(): boolean {
    return this.montoRecibido >= this.montoAPagar;
  }
}
