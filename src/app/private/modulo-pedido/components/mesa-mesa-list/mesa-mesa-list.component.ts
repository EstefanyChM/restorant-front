import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PedidoResponse } from '../../../pedido/models/pedido-response.model';

import { MesaMesaDetallesComponent } from '../../components/mesa-mesa-detalles/mesa-mesa-detalles.component';
import { EnTiendaService } from '../../../modulo-pedido-venta/service/en-tienda.service';
import { PedidoMesaResponse } from '../../models/pedido-mesa-response.model';
import { ProductsDetailsComponent } from 'src/app/shared/components/products-details/products-details.component';
import { WebsocketService } from 'src/app/shared/services/websocket.service';
import { EnTiendaResponse } from '../../../modulo-pedido-venta/models/en-tienda-response.model';

@Component({
  selector: 'app-mesa-mesa-list',
  templateUrl: './mesa-mesa-list.component.html',
  styleUrls: ['./mesa-mesa-list.component.scss']
})

export class MesaMesaListComponent implements OnInit {
  @ViewChild(ProductsDetailsComponent) productosDetails!: ProductsDetailsComponent; // Referencia al hijo
  @ViewChild(MesaMesaDetallesComponent) mesaMesaDetalles!: MesaMesaDetallesComponent;

  @ViewChild(MesaMesaDetallesComponent) mesaMesaDetallesComponent!: MesaMesaDetallesComponent;

  recibirEventoCerrarDialogo() {
    // Llama al método de MesaMesaDetallesComponent que vacía la lista
    if (this.mesaMesaDetallesComponent) {
      this.mesaMesaDetallesComponent.vaciarListaAlCerrar();
    }
  }


  visible: boolean = false;
  pedidoMesaSeleccionada: PedidoMesaResponse = new PedidoMesaResponse;

  pedidoBack: PedidoResponse = new PedidoResponse;
  pedidosMesasBack: PedidoMesaResponse[] = [];


  constructor(
    private _enTiendaService: EnTiendaService,
    private websocketService: WebsocketService
  ) { }

  ngOnInit(): void {
    this.obtenerListaDeMesasPedidosFinalizadas()
  }

  cerrarElModal() {
    this.pedidoYaHecho = new PedidoResponse(); // Reinicializa pedidoYaHecho
    this.productosDetails.vaciarLista(); // Limpia la lista de productos
    this.visible = false; // Oculta el diálogo
  }
  pedidoYaHecho: PedidoResponse = new PedidoResponse();
  onDialogHide() {
    this.cerrarElModal(); // Llama a la lógica para reinicializar
  }




  iniciarOAgregar(pedidoMesa: PedidoMesaResponse) {
    this.pedidoMesaSeleccionada = pedidoMesa
    console.log(this.pedidoMesaSeleccionada);
    if (this.pedidoMesaSeleccionada.idPedido != null) {
      if (this.mesaMesaDetalles) {
        console.log('idPedido ', this.pedidoMesaSeleccionada.idPedido);
        this.mesaMesaDetalles.obtenerLosPedidosYaHechos(this.pedidoMesaSeleccionada.idPedido); // Llamar a la función del hijo
      }
    }

    this.visible = true;
  }


  obtenerListaDeMesasPedidosFinalizadas() {
    this._enTiendaService.ListaMesaPedido(null).subscribe({
      next: (data: PedidoMesaResponse[]) => {
        this.pedidosMesasBack = data
        console.log('lista de p-m: ', this.pedidosMesasBack);

      },
      error: () => { },
      complete: () => { }

    })
  }



  finalizarPedido(pedidoMesa: PedidoMesaResponse) {
    console.log(pedidoMesa);

    if (pedidoMesa.idEnTienda!= null) {

      this._enTiendaService.finalizarPedido(pedidoMesa.idEnTienda).subscribe({
        next: (data: EnTiendaResponse)=>{
          this.websocketService.emit("pedido-finalizado", data)
        },
        complete: ()=>{this.obtenerListaDeMesasPedidosFinalizadas()}
      })
    }
  }
}
