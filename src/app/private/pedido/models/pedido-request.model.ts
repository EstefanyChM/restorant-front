import { DetallePedidoRequest } from "./detalle-pedido.model";

export class PedidoRequest {
  id: number = 0;
  estado: boolean = false;
  detallePedidosRequest:DetallePedidoRequest[] = [];
  idServicio: number = 0;
  total: number =0;
  finalizado: boolean = false;
  ventaFinalizada: boolean = false;
}

