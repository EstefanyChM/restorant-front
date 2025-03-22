import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DetallePedidoRequest } from 'src/app/private/pedido/models/detalle-pedido.model';
import { PedidoResponse } from 'src/app/private/pedido/models/pedido-response.model';
import { PedidoService } from 'src/app/private/pedido/service/pedido.service';
import { WebsocketService } from 'src/app/shared/services/websocket.service';

@Component({
  selector: 'app-list-pedidos-hechos',
  templateUrl: './list-pedidos-hechos.component.html',
  styleUrl: './list-pedidos-hechos.component.scss'
})
export class ListPedidosHechosComponent {
  PedidosRecibidos: PedidoResponse[] = [];
  detallePedidoSeleccionado!: DetallePedidoRequest;

  indiceCard: number = 0;
  indiceRow: number = 0;

  componente: string = 'Finalizados';


  constructor(
    private _pedidoService: PedidoService,
    private websocketService: WebsocketService,

    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.listarPedidos();
    this.websocketService.listen('detalles-pedidos-recibidos').subscribe((payload: any) => {
      console.log('escuxaaa');

      this.listarPedidos();

    });
  }

  listarPedidos(): void {
    console.log('listando');

    this._pedidoService.getAllCocina(true).subscribe({
      next: (data) => {
        this.PedidosRecibidos = data;
        //console.table(this.PedidosRecibidos);
        // Notificar a Angular que debe verificar el componente
        //*****this.cdr.markForCheck();

      },
      error: () => { },
      complete: () => { },
    });
  }

  detallePedidoFinalizado(pedidoIndex: number, rowIndex: number) {

    console.log(`${pedidoIndex}, ${rowIndex}`);
    console.log(this.PedidosRecibidos[pedidoIndex - 1]?.detallePedidoResp[rowIndex - 1]);

    const idDetallePedido = this.PedidosRecibidos[pedidoIndex - 1]?.detallePedidoResp[rowIndex - 1].id

    this._pedidoService.detallePedidoFinalizado(idDetallePedido).subscribe({
      next: () => {
        console.log('ENTRÉ AL MÉTODO PARA HACER LA SOLICITUD HTTP AL MI WEB API');
          this.messageService.add({ severity: "success", summary: "Éxito", detail: "Detalle pedido hecho", life: 3000 });
        this.indiceCard = 0;
        this.indiceRow = 0;
        this.listarPedidos()
        //this.cdr.detectChanges();


      },
      error: () => { },
      complete: () => { },
    })
  }
}
