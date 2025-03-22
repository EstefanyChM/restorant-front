import { DetallePedidoResponse } from "./detalle-pedido-response.model";

export class PedidoResponse {
  id: number = 0;
  idServicio: number = 0;
  estado: boolean = false;
  finalizado: boolean = false;
  ventaFinalizada: boolean = false;
  horaEntrada: string = ''; // "12:30:00.0000000"
  total :number = 0;
  detallePedidoResp: DetallePedidoResponse[] = [];
}
