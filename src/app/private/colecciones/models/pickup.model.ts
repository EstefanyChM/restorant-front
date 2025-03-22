import { PedidoRequest } from "../../pedido/models/pedido-request.model";

export class Pickup {
  id: number = 0;
  pickupTime: Date = new Date();
  idPedido: number = 0;
  idPedidoNavigation?: PedidoRequest;
}
