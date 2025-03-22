import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/shared/services/websocket.service';

@Component({
  selector: 'app-pedido-pedido-list',
  templateUrl: './pedido-pedido-list.component.html',
  styleUrls: ['./pedido-pedido-list.component.scss']
})
export class PedidoPedidoListComponent implements OnInit {

  constructor(private wsService: WebsocketService) {}

  ngOnInit() {
    this.wsService.listen('mensaje-nuevo').subscribe((message: any) => {
      console.log('Nuevo mensaje recibido:', message);
      alert(`Nuevo mensaje de ${message.de}: ${message.cuerpo}`);
    });
  }
}
