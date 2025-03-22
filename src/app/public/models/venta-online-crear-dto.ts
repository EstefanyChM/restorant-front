
import { PedidoRequest } from "../../private/pedido/models/pedido-request.model";


export class VentaOnlineCrearDTO {
  idComprobante:number = 0;
  idCliente: number = 0;
  miPedidoRequest: PedidoRequest = {} as PedidoRequest;
}
