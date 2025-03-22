export class DetallePedidoRequest {
  id: number;
  cantidad: number;
  idProducto: number;
  idPedido: number;
  precioUnitario: number ;
  subTotal: number ;


  constructor(id: number, cantidad: number,
    idproducto: number, idPedido: number, subTotal:number, precioUnitario: number) {
    this.id = id;
    this.cantidad = cantidad;
    this.idProducto = idproducto;
    this.idPedido = idPedido;
    this.subTotal = subTotal;
    this.precioUnitario = precioUnitario
  }
}
