export class VentaRequest {
  id: number = 0;
  idCliente: number = 0;
  fechaVenta: Date = new Date();
  estado: boolean = false;
  idPedido: number = 0;
  idComprobante: number = 0;
  idEstadoVenta: number = 0;
  idMetodoPago: number = 0;
}
