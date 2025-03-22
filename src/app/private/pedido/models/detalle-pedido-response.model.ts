export class DetallePedidoResponse {
  id: number = 0;
  cantidad: number = 0;
  idProducto: number = 0;
  idPedido: number = 0;
  idCategoria: number = 0;
  nombreCategoria: string = '';
  nombreProducto: string = ''
  subTotal :number = 0;
  precioUnitario :number = 0;
  EstadoPreparacion: boolean = false;

}
