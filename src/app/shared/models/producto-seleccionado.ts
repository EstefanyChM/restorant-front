import { productoResponse } from "src/app/private/menu/models/producto-response.model";

export class
ProductoSeleccionado {
  //producto: productoResponse = new productoResponse;
  idProducto: number = 0;
  nombreProducto : string = "";
  cantidad: number = 1;
  precioXCant: number = 0;
  precioUnitario: number = 0;
  porcentajeDescuentoPorUnidad: number = 0;
  descuento:number = 0;

}
