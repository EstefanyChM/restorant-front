import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PedidoResponse } from 'src/app/private/pedido/models/pedido-response.model';

import { MesaMesaDetallesComponent } from 'src/app/private/modulo-pedido/components/mesa-mesa-detalles/mesa-mesa-detalles.component';
import { EnTiendaService } from 'src/app/private/modulo-pedido-venta/service/en-tienda.service';
import { PedidoMesaResponse } from 'src/app/private/modulo-pedido/models/pedido-mesa-response.model';
import { ProductsDetailsComponent } from 'src/app/shared/components/products-details/products-details.component';
import { EnTiendaResponse } from 'src/app/private/modulo-pedido-venta/models/en-tienda-response.model';
import { VentaRequest } from 'src/app/private/modulo-pedido-venta/models/venta-request';
import { VentaService } from 'src/app/private/modulo-pedido-venta/service/venta.service';
import { VentaResponse } from 'src/app/private/modulo-pedido-venta/models/venta-response';
import { WebsocketService } from 'src/app/shared/services/websocket.service';
import { alert_success } from 'src/app/shared/functions/general.functions';
import { ServicioDePedidosFinalizadosService } from 'src/app/private/shared/services/servicio-de-pedidos-finalizados.service';

@Component({
  selector: 'app-venta-venta-list',
  templateUrl: './venta-venta-list.component.html',
  styleUrl: './venta-venta-list.component.scss'
})
export class VentaVentaListComponent implements OnInit {
  @ViewChild(ProductsDetailsComponent) productosDetails!: ProductsDetailsComponent; // Referencia al hijo
  @ViewChild(MesaMesaDetallesComponent) mesaMesaDetalles!: MesaMesaDetallesComponent;
  @ViewChild(MesaMesaDetallesComponent) mesaMesaDetallesComponent!: MesaMesaDetallesComponent;

  origen: string = "Modulo Venta";

  pedidoMesaSeleccionada: PedidoMesaResponse = new PedidoMesaResponse();

  pedidoBack: PedidoResponse = new PedidoResponse;
  pedidosMesasBack: PedidoMesaResponse[] = [];
  enTiendaBack: EnTiendaResponse[] = [];
  enviarVenta: VentaRequest = new VentaRequest();
  displayDialog: boolean = false;
  enTiendaSeleccionada: EnTiendaResponse = new EnTiendaResponse();
  pedidoYaHecho: PedidoResponse = new PedidoResponse();



  constructor(
    private _enTiendaService: EnTiendaService,
    private _ventaService: VentaService,
    private websocketService : WebsocketService,
    private _servicioDePedidosFinalizadosService:ServicioDePedidosFinalizadosService)
     { }

  ngOnInit(): void {
    this.obtenerEnTiendaFinalizada();

    this.websocketService.listen('recibir-pedido').subscribe((payload: any) => {
      //console.log('Notificación recibida:', payload);
      //alert('recibo: ' + JSON.stringify(payload, null, 2)); // Mostrar el objeto completo como JSON
      this.obtenerEnTiendaFinalizada();
    });

  }

  obtenerEnTiendaFinalizada() {
    this._enTiendaService.getAllFinalizado().subscribe({
      next: (data: EnTiendaResponse[]) => {
        this.enTiendaBack = data;
        this._servicioDePedidosFinalizadosService.updateEnTiendaBackLength(this.enTiendaBack.length);
        console.log('en tienda hay: ', this.enTiendaBack.length);
      },
      error: () => {},
      complete: () => {}
    });
  }





  hacerVenta(enTienda: EnTiendaResponse) {
    this.enTiendaSeleccionada = enTienda;

    this.displayDialog = true;
  }
  confirmarVenta() {
    // Lógica para confirmar la venta
    console.log('Venta confirmada');
    this.displayDialog = false; // Cierra el diálogo
  }

  cancelar() {
    // Lógica para cancelar
    this.displayDialog = false; // Cierra el diálogo
  }

  recibirEventoCerrarDialogo() {
    // Llama al método de MesaMesaDetallesComponent que vacía la lista
    if (this.mesaMesaDetallesComponent) {
      this.mesaMesaDetallesComponent.vaciarListaAlCerrar();
    }
  }



  finalizarVenta() {
    this.enviarVenta.idCliente = this.idCliente;
    this.enviarVenta.idPedido = this.enTiendaSeleccionada.idPedido
    this.enviarVenta.idComprobante = this.tipoComprobante;
    this.enviarVenta.idEstadoVenta = 1;
    this.enviarVenta.idMetodoPago = this.metodoPago;

    console.log('enviar: ', this.enviarVenta);

    this._ventaService.create(this.enviarVenta).subscribe({
      next: (data: VentaResponse) => {
        this.ventaBack = data
        alert_success('Venta finalizada','El registro de la venta se hizo de manera correcta')
        this.displayDialog = false;
        this.obtenerEnTiendaFinalizada();
      },
      error: () => { },
      complete: () => {
        console.log('completeee');

        this.imprimirComprobante(this.ventaBack.id);


      }
    })
  }

  ventaBack: VentaResponse = new VentaResponse();


  nuevoPedido() {
    console.log('asasasasa');


  }

  imprimirComprobante(ventaId: number) {
    console.log('ahora te woa imprimir');

    this._ventaService.generateComprobante(ventaId).subscribe({
      next: (response: Blob) => {  // Captura la respuesta como un Blob
        const url = window.URL.createObjectURL(response); // Crea una URL para el Blob
        const link = document.createElement('a'); // Crea un enlace para la descarga
        link.href = url;
        link.download = `Comprobante-${ventaId}.pdf`; // Define el nombre del archivo
        link.click(); // Inicia la descarga
        window.URL.revokeObjectURL(url); // Libera la URL creada
      },
      error: () => {
        alert('No se cargó el pedido');
      }
    });
  }



  recibirIdCliente(id: number) {
    this.idCliente = id;
    console.log("ID del cliente recibido desde el hijo: ", id);
  }
  idCliente: number = 0;

  recibirTipoComprobante(tipoComprobante: number) {
    this.tipoComprobante = tipoComprobante
  }
  tipoComprobante: number = 0;

  recibirMetodoPago(metodoPago: number) {
    this.metodoPago = metodoPago
  }
  metodoPago: number = 0;

  habilitarNext() {
    this.clienteRegistrado = true;
    this.triggerNextStep(); // Llamar automáticamente al siguiente paso
  }
  clienteRegistrado = false;

  triggerNextStep() {
    const nextButton = document.getElementById('b1') as HTMLElement;
    if (nextButton) {
      nextButton.click(); // Llamar al siguiente paso automáticamente
    }
  }

  ventaPagada: boolean = false;

  habilitarFinalizarVenta(pagoExitoso: boolean) {
    if (pagoExitoso) {
      this.ventaPagada = true; // Enable the Finalizar button
    }
  }


}
