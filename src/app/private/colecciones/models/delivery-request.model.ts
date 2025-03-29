import { PedidoRequest } from "../../pedido/models/pedido-request.model";

export class DeliveryRequest{
  id: number = 0;
  address: string = '';
  reference: string = '';
  idPedido: number = 0;
  idPedidoNavigation: PedidoRequest = new PedidoRequest();
}


/*{
  "id": 0,
  "address": "string",
  "reference": "string",
  "idPedido": 6040,
  "idPedidoNavigation": {}
}*/

