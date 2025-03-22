import { Component, OnInit } from '@angular/core';
import { SharedPedidoService } from 'src/app/shared/services/shared-pedido.service';
import { PedidoService } from '../../../pedido/service/pedido.service';
import { PedidoResponse } from 'src/app/private/pedido/models/pedido-response.model';
import { VentaService } from '../../service/venta.service';
import { VentaRequest } from '../../models/venta-request';
import { VentaResponse } from '../../models/venta-response';

@Component({
  selector: 'app-pedido-register-checkout',
  templateUrl: './pedido-register-checkout.component.html',
  styleUrls: ['./pedido-register-checkout.component.scss']
})
export class PedidoRegisterCheckoutComponent implements OnInit {
  pedidoRecibido: PedidoResponse | null = null;
  pedido: number | null = null;
  currentForm: string = 'credit';
  ventaEnviar: VentaRequest = new VentaRequest
  ventaRecibido : VentaResponse = new VentaResponse

  totalImporte: number = 0;
  igv: number = 0;
  totalConIgv: number = 0;

  constructor(
    private _pedidoService: PedidoService,
    private sharedPedidoService: SharedPedidoService,
    private _ventaService : VentaService
  ) {}

  ngOnInit(): void {
    this.toggleForm('credit');

    this.sharedPedidoService.pedido$.subscribe((pedido) => {
      this.pedido = pedido;
    });

    if (this.pedido) {
      this._pedidoService.getById(this.pedido).subscribe({
        next: (data: PedidoResponse) => {
          console.log('pedido para la venta: ', data);

          this.pedidoRecibido = data;
          this.calcularTotales();
        },
        error: () => {
          alert('No se cargó el pedido');
        }
      });
    }
    console.log(this.pedidoRecibido?.detallePedidoResp);
  }

  toggleForm(formType: string): void {
    this.currentForm = formType;
  }

  calcularImporte(cantidad: number, precioProducto: number): number {
    return cantidad * precioProducto;
  }

  calcularTotales(): void {
    if (this.pedidoRecibido && this.pedidoRecibido.detallePedidoResp) {
      this.totalImporte = this.pedidoRecibido.detallePedidoResp.reduce(
        (total, detalle) => total + this.calcularImporte(detalle.cantidad, detalle. precioUnitario),
        0
      );
      this.igv = parseFloat((this.totalImporte * 0.18).toFixed(2));
      this.totalConIgv = parseFloat((this.totalImporte * 0.82).toFixed(2));
    }
  }

  hacerVenta(){
    console.log('gtoca venta');

    if (this.pedidoRecibido) {
      this.ventaEnviar.idPedido = this.pedidoRecibido?.id;
      this.ventaEnviar.idComprobante = 1
  } else {
      console.error("pedidoRecibido es null");
  }

  console.log(this.ventaEnviar);



    this._ventaService.create(this.ventaEnviar).subscribe({
      next: (data: VentaResponse) => {
        console.log('listo: ', data);

        this.ventaRecibido = data;
      },
      error: () => {
        alert('No se cargó el pedido');
      }
    });

  }

  nuevoPedido(){
    console.log('asasasasa');


  }

  imprimirComprobante(){
    console.log('imprime, pe', this.ventaRecibido.id);


    this._ventaService.generateComprobante(this.ventaRecibido.id).subscribe({
      next: () => {
        console.log('listo: ');
      },
      error: () => {
        alert('No se cargó el pedido');
      }
    });


  }
}
