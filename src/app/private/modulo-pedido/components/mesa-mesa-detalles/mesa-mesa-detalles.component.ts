import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DetallePedidoRequest } from 'src/app/private/pedido/models/detalle-pedido.model';
import { PedidoRequest } from 'src/app/private/pedido/models/pedido-request.model';
import { PedidoResponse } from 'src/app/private/pedido/models/pedido-response.model';
import { PedidoService } from 'src/app/private/pedido/service/pedido.service';
import { ProductsDetailsComponent } from 'src/app/shared/components/products-details/products-details.component';
import { EnTiendaService } from 'src/app/private/modulo-pedido-venta/service/en-tienda.service';
import { EnTiendaRequest } from 'src/app/private/modulo-pedido-venta/models/en-tienda-request.model';
import { EnTiendaResponse } from 'src/app/private/modulo-pedido-venta/models/en-tienda-response.model';
import { alert_success, alert_warning } from 'src/app/shared/functions/general.functions';
import { PedidoMesaResponse } from '../../models/pedido-mesa-response.model';
import { ProductoSeleccionado } from 'src/app/shared/models/producto-seleccionado';

@Component({
  selector: 'app-mesa-mesa-detalles',
  templateUrl: './mesa-mesa-detalles.component.html',
  styleUrls: ['./mesa-mesa-detalles.component.scss'] // Corregido a 'styleUrls'
})
export class MesaMesaDetallesComponent implements OnInit {
  //@Input() mesa!: MesasPedidos
  @ViewChild('productosDetails') productosDetails!: ProductsDetailsComponent; // Referencia al hijo
  //@Input() mesaSeleccionada!: MesaRequest; // Use ! to indicate it will be initialized
  @Input() pedidoMesaSeleccionada!: PedidoMesaResponse; // Use ! to indicate it will be initialized

  @Output() enviarTotalAPagar = new EventEmitter<number>(); // Para enviar totalAPagar al padre
  @Output() enviarPedidoBack = new EventEmitter<PedidoResponse>(); // Para enviar pedidoBack al padre

  @Output() cerrarModalPedidos = new EventEmitter<void>();  // Evento para cerrar el modal de login
  @Output() volverAListarPedidoMeda = new EventEmitter<void>();  // Evento para cerrar el modal de login

  @ViewChild(ProductsDetailsComponent) productosDetailss!: ProductsDetailsComponent;
// Método que será llamado cuando el p-dialog se cierre
vaciarListaAlCerrar() {
  if (this.productosDetailss) {
    this.productosDetailss.vaciarLista();
  }
}


  enviarPedido: PedidoRequest = new PedidoRequest;
  pedidoBack: PedidoResponse = new PedidoResponse;
  enTiendaBack: EnTiendaResponse = new EnTiendaResponse;
  pedidoYaHecho: PedidoResponse = new PedidoResponse;
  totalAPagar: number = 0;
    listaRecibida: ProductoSeleccionado[] = [];
  tablaEnTienda: EnTiendaResponse = new EnTiendaResponse;
  enviarEnTienda: EnTiendaRequest = new EnTiendaRequest;

  constructor(
    private _pedidoService: PedidoService,
    private _entiendaService: EnTiendaService) { }


  ngOnInit(): void {
    console.log('hola ehn mesa mesa detalles'); //no sé por qué si entro a
  }

  ngOnChanges() {
    this.pedidoYaHecho=new PedidoResponse();
  }


  emitirDatosAMesaMesaListComponent() {
    this.enviarTotalAPagar.emit(this.totalAPagar);
    this.enviarPedidoBack.emit(this.pedidoBack);
  }

  recibirLista(lista: ProductoSeleccionado[]) {
    this.listaRecibida = lista; // Actualizar la lista recibida
    console.log('Lista recibida del hijo:', this.listaRecibida);
  }

  crearOEditar() {
    this.enviarEnTienda.pedidoRequest.idServicio = 1;

    this.pedidoMesaSeleccionada.idPedido == null ? this.nuevoPedidoEnTienda()
      : this.mandarMasPedidos(this.pedidoMesaSeleccionada.idPedido)
  }

  mandarMasPedidos(idPedidoMesa: number) {
    this.enviarPedido.detallePedidosRequest = this.convertirAPedidoDetalle();
    this.enviarPedido.id = idPedidoMesa;

    console.log('enviando más: ', this.enviarPedido);

    this._pedidoService.update(this.enviarPedido).subscribe({
      next: () => { alert_success('pedido exitoso', 'se han agregado pedidos') },
      error: () => { console.log('tas mal') },
      complete: () => {
        this.cerrarElModal()
      }
    })
  }
  nuevoPedidoEnTienda() {
    this.enviarEnTienda.idMesa = this.pedidoMesaSeleccionada.idMesa
    this.enviarEnTienda.pedidoRequest.detallePedidosRequest = this.convertirAPedidoDetalle();
    console.log(this.enviarEnTienda);



    this._entiendaService.create(this.enviarEnTienda).subscribe({
      next: (data: EnTiendaResponse) => {
        //this.enTiendaBack = data;
        alert_success('pedido exitoso', 'su pedido ha sido enviado')
      },
      error: () => { alert_warning('fallo en el pedido', 'lo sentimos, hubo un error')},
      complete: () => {
        this.cerrarElModal();
      }
    });
  };


  cerrarElModal() {
    this.cerrarModalPedidos.emit();
    this.volverAListarPedidoMeda.emit();
    //this.productosDetails.vaciarLista();
  }


  obtenerLosPedidosYaHechos(idPedidoMesa: number) {
    this._pedidoService.getById(idPedidoMesa).subscribe({
      next: (data: PedidoResponse) => {
        this.pedidoYaHecho = data;
        //console.log(this.pedidoYaHecho);

      },
      error: () => {
        alert("Ocurrió un error");
      },
      complete: () => {
        console.log('Total a Pagar:', this.pedidoYaHecho.total);
      }
    });
  }

  convertirAPedidoDetalle(): DetallePedidoRequest[] {
    const listaDetallePedido = this.listaRecibida.map((pedido) => {
      return new DetallePedidoRequest(
        0,
        pedido.cantidad,
        pedido.idProducto,
        0,
        0,
        pedido.precioUnitario,
      );
    });
    return listaDetallePedido
  }
}


