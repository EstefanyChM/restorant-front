import { PedidoRequest } from "../../pedido/models/pedido-request.model";

export class EnTiendaRequest {
  id:number = 0
  idPedido:number = 0
  idMesa:number = 0
  pedidoRequest : PedidoRequest = new PedidoRequest;
}


/*class PedidoModel {
  int id;
  bool estado;
  bool finalizado;
  bool ventaFinalizada;
  double total;
  List<DetallePedidoModel> detallePedidoResp;
  }*/
